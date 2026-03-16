import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { withTransaction } from "@/lib/db";
import {
  corsOptionsResponse,
  normalizeEmail,
  normalizeLicenseKey,
  withCors,
} from "@/lib/license-api";

export const runtime = "nodejs";

type JsonObject = Record<string, unknown>;

type LemonWebhookBody = {
  meta?: {
    event_name?: string;
    custom_data?: JsonObject;
    webhook_event_id?: string;
    event_id?: string;
  };
  data?: {
    id?: string;
    type?: string;
    attributes?: JsonObject;
  };
};

function toText(value: unknown) {
  return String(value || "").trim();
}

function toLowerText(value: unknown) {
  return toText(value).toLowerCase();
}

function extractIds(body: LemonWebhookBody) {
  const attributes = (body.data?.attributes || {}) as JsonObject;
  const customData = (body.meta?.custom_data || {}) as JsonObject;
  const eventName = toText(body.meta?.event_name || "unknown_event");

  const dataType = toLowerText(body.data?.type);
  const dataId = toText(body.data?.id);

  const subscriptionId =
    toText(customData.license_subscription_id) ||
    toText(customData.subscription_id) ||
    toText(attributes.subscription_id) ||
    (dataType === "subscriptions" ? dataId : "");

  const orderId =
    toText(customData.license_order_id) ||
    toText(customData.order_id) ||
    toText(attributes.order_id) ||
    (dataType === "orders" ? dataId : "");

  const customerId =
    toText(customData.license_customer_id) ||
    toText(customData.customer_id) ||
    toText(attributes.customer_id);

  const licenseKey = normalizeLicenseKey(
    customData.license_key || customData.licenseKey,
  );

  const email = normalizeEmail(
    customData.email ||
      attributes.user_email ||
      attributes.customer_email ||
      attributes.email,
  );

  return {
    eventName,
    attributes,
    customData,
    subscriptionId,
    orderId,
    customerId,
    licenseKey,
    email,
  };
}

function resolveTargetState(eventName: string, attributes: JsonObject) {
  const normalizedEvent = toLowerText(eventName);
  const status = toLowerText(attributes.status);

  if (normalizedEvent === "order_created") {
    return "paid_active";
  }
  if (normalizedEvent === "order_refunded") {
    return "revoked_refund";
  }
  if (
    normalizedEvent === "subscription_created" ||
    normalizedEvent === "subscription_resumed" ||
    normalizedEvent === "subscription_payment_success"
  ) {
    return "paid_active";
  }
  if (normalizedEvent === "subscription_payment_failed") {
    return "past_due";
  }
  if (normalizedEvent === "subscription_expired") {
    return "expired_trial";
  }
  if (normalizedEvent === "subscription_cancelled") {
    return status === "expired" ? "expired_trial" : "paid_active";
  }
  if (normalizedEvent === "subscription_updated") {
    if (["active", "on_trial", "paused"].includes(status)) {
      return "paid_active";
    }
    if (["past_due", "unpaid"].includes(status)) {
      return "past_due";
    }
    if (["cancelled", "expired"].includes(status)) {
      return "expired_trial";
    }
  }

  return null;
}

function buildEventId(body: LemonWebhookBody, rawBody: string, request: Request) {
  const headerId =
    toText(request.headers.get("x-event-id")) ||
    toText(request.headers.get("x-request-id"));
  if (headerId) {
    return headerId;
  }

  const payloadId =
    toText(body.meta?.webhook_event_id) ||
    toText(body.meta?.event_id);
  if (payloadId) {
    return payloadId;
  }

  const digest = createHash("sha256").update(rawBody).digest("hex");
  const eventName = toText(body.meta?.event_name || "unknown_event");
  const dataId = toText(body.data?.id || "none");
  return `${eventName}:${dataId}:${digest}`;
}

function signaturesMatch(secret: string, rawBody: string, headerValue: string) {
  const expected = createHmac("sha256", secret).update(rawBody).digest("hex");
  const expectedBuffer = Buffer.from(expected, "utf8");
  const actualBuffer = Buffer.from(headerValue, "utf8");

  if (expectedBuffer.length !== actualBuffer.length) {
    return false;
  }
  return timingSafeEqual(expectedBuffer, actualBuffer);
}

export function OPTIONS() {
  return corsOptionsResponse();
}

export async function POST(request: Request) {
  const webhookSecret = process.env.LEMON_WEBHOOK_SECRET;
  if (!webhookSecret) {
    return withCors(
      NextResponse.json(
        {
          ok: false,
          error: { code: "INTERNAL_ERROR", message: "Webhook secret is not configured." },
        },
        { status: 500 },
      ),
    );
  }

  const signature = toText(request.headers.get("x-signature"));
  if (!signature) {
    return withCors(
      NextResponse.json(
        {
          ok: false,
          error: { code: "BAD_REQUEST", message: "Missing webhook signature." },
        },
        { status: 401 },
      ),
    );
  }

  const rawBody = await request.text();
  if (!signaturesMatch(webhookSecret, rawBody, signature)) {
    return withCors(
      NextResponse.json(
        {
          ok: false,
          error: { code: "BAD_REQUEST", message: "Invalid webhook signature." },
        },
        { status: 401 },
      ),
    );
  }

  let body: LemonWebhookBody;
  try {
    body = JSON.parse(rawBody) as LemonWebhookBody;
  } catch {
    return withCors(
      NextResponse.json(
        {
          ok: false,
          error: { code: "BAD_REQUEST", message: "Invalid webhook JSON body." },
        },
        { status: 400 },
      ),
    );
  }

  const eventId = buildEventId(body, rawBody, request);
  const {
    eventName,
    attributes,
    subscriptionId,
    orderId,
    customerId,
    licenseKey,
    email,
  } = extractIds(body);
  const targetState = resolveTargetState(eventName, attributes);

  try {
    const result = await withTransaction(async (client) => {
      const eventInsert = await client.query<{ id: number }>(
        `INSERT INTO webhook_events (provider, event_id, event_type, payload, received_at)
         VALUES ('lemon_squeezy', $1, $2, $3::jsonb, NOW())
         ON CONFLICT (provider, event_id) DO NOTHING
         RETURNING id`,
        [eventId, eventName, rawBody],
      );

      if (eventInsert.rows.length === 0) {
        return { duplicate: true };
      }

      const webhookRowId = eventInsert.rows[0].id;

      let licenseRow:
        | { id: number; state: string }
        | undefined;

      if (licenseKey) {
        const byKey = await client.query<{ id: number; state: string }>(
          `SELECT id, state FROM licenses WHERE license_key = $1 LIMIT 1`,
          [licenseKey],
        );
        licenseRow = byKey.rows[0];
      }

      if (!licenseRow && subscriptionId) {
        const bySub = await client.query<{ id: number; state: string }>(
          `SELECT id, state FROM licenses WHERE lemon_subscription_id = $1 LIMIT 1`,
          [subscriptionId],
        );
        licenseRow = bySub.rows[0];
      }

      if (!licenseRow && orderId) {
        const byOrder = await client.query<{ id: number; state: string }>(
          `SELECT id, state FROM licenses WHERE lemon_order_id = $1 LIMIT 1`,
          [orderId],
        );
        licenseRow = byOrder.rows[0];
      }

      if (!licenseRow && email) {
        const byEmail = await client.query<{ id: number; state: string }>(
          `SELECT id, state FROM licenses WHERE email = $1 ORDER BY id DESC LIMIT 2`,
          [email],
        );
        if (byEmail.rows.length === 1) {
          licenseRow = byEmail.rows[0];
        }
      }

      if (!licenseRow) {
        await client.query(
          `UPDATE webhook_events
           SET processed_at = NOW(), processing_error = $2
           WHERE id = $1`,
          [webhookRowId, "license_not_found"],
        );
        return { processed: true, matched: false };
      }

      const nextState = targetState || licenseRow.state;
      await client.query(
        `UPDATE licenses
         SET
           state = $2,
           lemon_customer_id = COALESCE(NULLIF($3, ''), lemon_customer_id),
           lemon_order_id = COALESCE(NULLIF($4, ''), lemon_order_id),
           lemon_subscription_id = COALESCE(NULLIF($5, ''), lemon_subscription_id),
           last_validated_at = CASE WHEN $2 = 'paid_active' THEN NOW() ELSE last_validated_at END,
           past_due_at = CASE WHEN $2 = 'past_due' THEN NOW() ELSE past_due_at END,
           revoked_at = CASE WHEN $2 = 'revoked_refund' THEN NOW() ELSE revoked_at END,
           updated_at = NOW()
         WHERE id = $1`,
        [
          licenseRow.id,
          nextState,
          customerId,
          orderId,
          subscriptionId,
        ],
      );

      await client.query(
        `UPDATE webhook_events
         SET processed_at = NOW(), processing_error = NULL
         WHERE id = $1`,
        [webhookRowId],
      );

      return {
        processed: true,
        matched: true,
        state: nextState,
        licenseId: licenseRow.id,
      };
    });

    if (result.duplicate) {
      return withCors(NextResponse.json({ ok: true, duplicate: true }));
    }

    return withCors(NextResponse.json({ ok: true, ...result }));
  } catch (error) {
    console.error("webhook.lemon failed", error);
    return withCors(
      NextResponse.json(
        {
          ok: false,
          error: { code: "INTERNAL_ERROR", message: "Failed to process webhook." },
        },
        { status: 500 },
      ),
    );
  }
}

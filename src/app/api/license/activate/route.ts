import { NextResponse } from "next/server";
import { withTransaction } from "@/lib/db";
import {
  corsOptionsResponse,
  isDevAutoCreateEnabled,
  jsonError,
  licenseStates,
  maybeResolveTrialState,
  normalizeDeviceId,
  normalizeEmail,
  normalizeLicenseKey,
  parseDeviceLimit,
  trialEndsAt,
  type LicenseRow,
  withCors,
} from "@/lib/license-api";

export const runtime = "nodejs";

export function OPTIONS() {
  return corsOptionsResponse();
}

type ActivateRequest = {
  licenseKey?: string;
  email?: string;
  deviceId?: string;
  deviceName?: string;
  appVersion?: string;
};

export async function POST(request: Request) {
  let body: ActivateRequest;
  try {
    body = (await request.json()) as ActivateRequest;
  } catch {
    return jsonError(400, "BAD_REQUEST", "Invalid JSON body.");
  }

  const licenseKey = normalizeLicenseKey(body.licenseKey);
  const email = normalizeEmail(body.email);
  const deviceId = normalizeDeviceId(body.deviceId);
  const deviceName = String(body.deviceName || "").trim() || "Unknown Device";
  const appVersion = String(body.appVersion || "").trim() || null;

  if (!licenseKey || !email || !deviceId) {
    return jsonError(
      400,
      "BAD_REQUEST",
      "licenseKey, email, and deviceId are required.",
    );
  }

  const deviceLimit = parseDeviceLimit();

  try {
    const payload = await withTransaction(async (client) => {
      let licenseResult = await client.query<LicenseRow>(
        `SELECT id, license_key, email, state, grace_days, last_validated_at, trial_ends_at
         FROM licenses
         WHERE license_key = $1
         FOR UPDATE`,
        [licenseKey],
      );

      if (licenseResult.rows.length === 0 && isDevAutoCreateEnabled()) {
        licenseResult = await client.query<LicenseRow>(
          `INSERT INTO licenses (
            license_key,
            email,
            state,
            grace_days,
            trial_ends_at,
            last_validated_at,
            activated_at
          )
          VALUES ($1, $2, $3, 30, $4, NOW(), NOW())
          RETURNING id, license_key, email, state, grace_days, last_validated_at, trial_ends_at`,
          [licenseKey, email, licenseStates.trialActive, trialEndsAt()],
        );
      }

      if (licenseResult.rows.length === 0) {
        return {
          error: jsonError(404, "INVALID_LICENSE_KEY", "License key not found."),
        };
      }

      const license = licenseResult.rows[0];
      if (normalizeEmail(license.email) !== email) {
        return {
          error: jsonError(403, "EMAIL_MISMATCH", "Email does not match this license."),
        };
      }

      const resolvedState = maybeResolveTrialState(license);
      if (resolvedState !== license.state) {
        const stateUpdate = await client.query<LicenseRow>(
          `UPDATE licenses
           SET state = $2, updated_at = NOW()
           WHERE id = $1
           RETURNING id, license_key, email, state, grace_days, last_validated_at, trial_ends_at`,
          [license.id, resolvedState],
        );
        if (stateUpdate.rows.length > 0) {
          Object.assign(license, stateUpdate.rows[0]);
        }
      }

      if (license.state === licenseStates.revokedRefund) {
        return {
          error: jsonError(
            403,
            "LICENSE_REVOKED",
            "License is revoked due to refund or chargeback.",
          ),
        };
      }

      const activationCheck = await client.query<{ revoked_at: string | null }>(
        `SELECT revoked_at
         FROM license_activations
         WHERE license_id = $1 AND device_id = $2
         LIMIT 1`,
        [license.id, deviceId],
      );

      const existingActive =
        activationCheck.rows.length > 0 && activationCheck.rows[0].revoked_at === null;

      const activeCountResult = await client.query<{ count: string }>(
        `SELECT COUNT(*)::text AS count
         FROM license_activations
         WHERE license_id = $1 AND revoked_at IS NULL`,
        [license.id],
      );
      const activeDevices = Number.parseInt(activeCountResult.rows[0]?.count || "0", 10);

      if (!existingActive && activeDevices >= deviceLimit) {
        return {
          error: jsonError(
            403,
            "DEVICE_LIMIT_REACHED",
            "This license has reached its device limit.",
          ),
        };
      }

      await client.query(
        `INSERT INTO license_activations (
          license_id,
          device_id,
          device_name,
          app_version,
          activated_at,
          last_seen_at,
          revoked_at
         )
         VALUES ($1, $2, $3, $4, NOW(), NOW(), NULL)
         ON CONFLICT (license_id, device_id)
         DO UPDATE SET
           device_name = EXCLUDED.device_name,
           app_version = EXCLUDED.app_version,
           last_seen_at = NOW(),
           revoked_at = NULL,
           updated_at = NOW()`,
        [license.id, deviceId, deviceName, appVersion],
      );

      const updatedLicenseResult = await client.query<LicenseRow>(
        `UPDATE licenses
         SET
           last_validated_at = NOW(),
           activated_at = COALESCE(activated_at, NOW()),
           updated_at = NOW()
         WHERE id = $1
         RETURNING id, license_key, email, state, grace_days, last_validated_at, trial_ends_at`,
        [license.id],
      );

      const updatedLicense = updatedLicenseResult.rows[0];

      const latestActiveCountResult = await client.query<{ count: string }>(
        `SELECT COUNT(*)::text AS count
         FROM license_activations
         WHERE license_id = $1 AND revoked_at IS NULL`,
        [license.id],
      );

      return {
        response: withCors(NextResponse.json({
          ok: true,
          licenseId: updatedLicense.id,
          state: updatedLicense.state,
          graceDays: updatedLicense.grace_days,
          lastValidatedAt: updatedLicense.last_validated_at,
          deviceLimit,
          activeDevices: Number.parseInt(
            latestActiveCountResult.rows[0]?.count || "0",
            10,
          ),
        })),
      };
    });

    if (payload.error) {
      return payload.error;
    }

    return payload.response;
  } catch (error) {
    console.error("license.activate failed", error);
    return jsonError(500, "INTERNAL_ERROR", "Unable to activate license.");
  }
}

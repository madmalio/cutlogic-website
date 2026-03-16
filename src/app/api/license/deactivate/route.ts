import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import {
  corsOptionsResponse,
  jsonError,
  normalizeDeviceId,
  normalizeLicenseKey,
  withCors,
} from "@/lib/license-api";

export const runtime = "nodejs";

export function OPTIONS() {
  return corsOptionsResponse();
}

type DeactivateRequest = {
  licenseKey?: string;
  deviceId?: string;
};

export async function POST(request: Request) {
  let body: DeactivateRequest;
  try {
    body = (await request.json()) as DeactivateRequest;
  } catch {
    return jsonError(400, "BAD_REQUEST", "Invalid JSON body.");
  }

  const licenseKey = normalizeLicenseKey(body.licenseKey);
  const deviceId = normalizeDeviceId(body.deviceId);

  if (!licenseKey || !deviceId) {
    return jsonError(400, "BAD_REQUEST", "licenseKey and deviceId are required.");
  }

  try {
    const result = await query<{ id: number }>(
      `UPDATE license_activations AS la
       SET revoked_at = NOW(), updated_at = NOW()
       FROM licenses AS l
       WHERE
         l.id = la.license_id
         AND l.license_key = $1
         AND la.device_id = $2
         AND la.revoked_at IS NULL
       RETURNING la.id`,
      [licenseKey, deviceId],
    );

    if (result.rows.length === 0) {
      return jsonError(
        404,
        "ACTIVATION_NOT_FOUND",
        "No active device activation found.",
      );
    }

    return withCors(NextResponse.json({ ok: true }));
  } catch (error) {
    console.error("license.deactivate failed", error);
    return jsonError(500, "INTERNAL_ERROR", "Unable to deactivate license.");
  }
}

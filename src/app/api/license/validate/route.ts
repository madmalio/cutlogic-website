import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import {
  jsonError,
  licenseStates,
  maybeResolveTrialState,
  normalizeDeviceId,
  normalizeLicenseKey,
  type LicenseRow,
} from "@/lib/license-api";

export const runtime = "nodejs";

type ValidateRequest = {
  licenseKey?: string;
  deviceId?: string;
  appVersion?: string;
};

export async function POST(request: Request) {
  let body: ValidateRequest;
  try {
    body = (await request.json()) as ValidateRequest;
  } catch {
    return jsonError(400, "BAD_REQUEST", "Invalid JSON body.");
  }

  const licenseKey = normalizeLicenseKey(body.licenseKey);
  const deviceId = normalizeDeviceId(body.deviceId);
  const appVersion = String(body.appVersion || "").trim() || null;

  if (!licenseKey || !deviceId) {
    return jsonError(400, "BAD_REQUEST", "licenseKey and deviceId are required.");
  }

  try {
    const licenseResult = await query<LicenseRow>(
      `SELECT id, license_key, email, state, grace_days, last_validated_at, trial_ends_at
       FROM licenses
       WHERE license_key = $1
       LIMIT 1`,
      [licenseKey],
    );

    if (licenseResult.rows.length === 0) {
      return jsonError(404, "INVALID_LICENSE_KEY", "License key not found.");
    }

    const license = licenseResult.rows[0];
    const resolvedState = maybeResolveTrialState(license);

    let stateToReturn = license.state;
    if (resolvedState !== license.state) {
      const updated = await query<LicenseRow>(
        `UPDATE licenses
         SET state = $2, updated_at = NOW()
         WHERE id = $1
         RETURNING id, license_key, email, state, grace_days, last_validated_at, trial_ends_at`,
        [license.id, resolvedState],
      );
      if (updated.rows.length > 0) {
        stateToReturn = updated.rows[0].state;
      }
    }

    await query(
      `UPDATE license_activations
       SET last_seen_at = NOW(), app_version = COALESCE($3, app_version), updated_at = NOW()
       WHERE license_id = $1 AND device_id = $2 AND revoked_at IS NULL`,
      [license.id, deviceId, appVersion],
    );

    const updatedLicense = await query<LicenseRow>(
      `UPDATE licenses
       SET last_validated_at = NOW(), updated_at = NOW()
       WHERE id = $1
       RETURNING id, license_key, email, state, grace_days, last_validated_at, trial_ends_at`,
      [license.id],
    );

    const current = updatedLicense.rows[0];

    return NextResponse.json({
      ok: true,
      licenseId: current.id,
      state: stateToReturn,
      graceDays: current.grace_days,
      lastValidatedAt: current.last_validated_at,
      serverTime: new Date().toISOString(),
      isRestricted:
        stateToReturn === licenseStates.expiredTrial ||
        stateToReturn === licenseStates.pastDue ||
        stateToReturn === licenseStates.revokedRefund,
    });
  } catch (error) {
    console.error("license.validate failed", error);
    return jsonError(500, "INTERNAL_ERROR", "Unable to validate license.");
  }
}

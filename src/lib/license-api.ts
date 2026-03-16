import { NextResponse } from "next/server";

export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export function withCors(response: NextResponse) {
  Object.entries(corsHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });
  return response;
}

export function corsOptionsResponse() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  });
}

export const licenseStates = {
  trialActive: "trial_active",
  paidActive: "paid_active",
  graceOffline: "grace_offline",
  expiredTrial: "expired_trial",
  pastDue: "past_due",
  revokedRefund: "revoked_refund",
} as const;

export type LicenseState =
  (typeof licenseStates)[keyof typeof licenseStates];

export type ApiErrorCode =
  | "BAD_REQUEST"
  | "INVALID_LICENSE_KEY"
  | "EMAIL_MISMATCH"
  | "DEVICE_LIMIT_REACHED"
  | "LICENSE_REVOKED"
  | "LICENSE_PAST_DUE"
  | "TRIAL_EXPIRED"
  | "ACTIVATION_NOT_FOUND"
  | "INTERNAL_ERROR";

export function jsonError(
  status: number,
  code: ApiErrorCode,
  message: string,
) {
  return withCors(NextResponse.json(
    {
      ok: false,
      error: { code, message },
    },
    { status },
  ));
}

export function normalizeLicenseKey(value: unknown) {
  return String(value || "").trim().toUpperCase();
}

export function normalizeEmail(value: unknown) {
  return String(value || "").trim().toLowerCase();
}

export function normalizeDeviceId(value: unknown) {
  return String(value || "").trim();
}

export function parseDeviceLimit() {
  const raw = Number.parseInt(process.env.LICENSE_DEVICE_LIMIT || "2", 10);
  if (!Number.isFinite(raw) || raw < 1) {
    return 2;
  }
  return raw;
}

export function isDevAutoCreateEnabled() {
  return (
    process.env.NODE_ENV !== "production" &&
    process.env.LICENSE_DEV_AUTO_CREATE === "true"
  );
}

export function trialEndsAt(days = 14) {
  const now = Date.now();
  return new Date(now + days * 24 * 60 * 60 * 1000);
}

export type LicenseRow = {
  id: number;
  license_key: string;
  email: string;
  state: LicenseState;
  grace_days: number;
  last_validated_at: string | null;
  trial_ends_at: string | null;
};

export function maybeResolveTrialState(license: LicenseRow) {
  if (license.state !== licenseStates.trialActive || !license.trial_ends_at) {
    return license.state;
  }

  const endsAtMs = new Date(license.trial_ends_at).getTime();
  if (!Number.isFinite(endsAtMs)) {
    return license.state;
  }

  if (Date.now() > endsAtMs) {
    return licenseStates.expiredTrial;
  }
  return license.state;
}

import { NextResponse } from "next/server";
import { getPublicCheckoutUrl } from "@/lib/config";
import { corsOptionsResponse, withCors } from "@/lib/license-api";

export const runtime = "nodejs";

export function OPTIONS() {
  return corsOptionsResponse();
}

export function GET() {
  return withCors(
    NextResponse.json({
      ok: true,
      checkoutUrl: getPublicCheckoutUrl(),
    }),
  );
}

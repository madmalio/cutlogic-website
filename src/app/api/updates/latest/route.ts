import { NextResponse } from "next/server";
import { corsOptionsResponse, withCors } from "@/lib/license-api";
import { getLatestUpdatePayload } from "@/lib/updates";

export const runtime = "nodejs";

export function OPTIONS() {
  return corsOptionsResponse();
}

export async function GET() {
  try {
    const payload = await getLatestUpdatePayload();
    return withCors(NextResponse.json(payload));
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to resolve latest update";
    return withCors(NextResponse.json(
      {
        ok: false,
        error: message,
      },
      { status: 502 },
    ));
  }
}

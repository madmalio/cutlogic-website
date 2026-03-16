import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { corsOptionsResponse, withCors } from "@/lib/license-api";

export const runtime = "nodejs";

export function OPTIONS() {
  return corsOptionsResponse();
}

export async function GET() {
  try {
    await query("SELECT 1");
    return withCors(NextResponse.json({ ok: true }));
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown database error";
    return withCors(NextResponse.json({ ok: false, error: message }, { status: 500 }));
  }
}

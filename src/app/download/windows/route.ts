import { NextResponse } from "next/server";

const fallbackInstallerUrl = "https://app.cutlogic.app/download";

export const runtime = "nodejs";

export function GET() {
  const target =
    process.env.WINDOWS_INSTALLER_URL?.trim() || fallbackInstallerUrl;
  return NextResponse.redirect(target, 307);
}

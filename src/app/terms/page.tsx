import Link from "next/link";

export default function TermsPage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-3xl px-5 py-16 sm:px-6">
      <Link href="/" className="text-sm font-semibold text-brand hover:text-brand-deep">
        ← Back to CutLogic
      </Link>
      <h1 className="mt-6 font-display text-4xl font-bold tracking-tight">Terms of Service</h1>
      <p className="mt-4 leading-relaxed text-muted">
        By using CutLogic, you agree to use the software in accordance with applicable laws
        and industry standards. You are responsible for verifying final production outputs.
      </p>
      <p className="mt-4 leading-relaxed text-muted">
        CutLogic is provided as-is and may be updated over time. For licensing or support
        questions, contact support@cutlogic.app.
      </p>
    </main>
  );
}

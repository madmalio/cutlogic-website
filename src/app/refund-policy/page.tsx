import Link from "next/link";

export default function RefundPolicyPage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-3xl px-5 py-16 sm:px-6">
      <Link href="/" className="text-sm font-semibold text-brand hover:text-brand-deep">
        ← Back to CutLogic
      </Link>
      <h1 className="mt-6 font-display text-4xl font-bold tracking-tight">Refund Policy</h1>

      <p className="mt-4 leading-relaxed text-muted">
        We offer a 14-day refund window for first-time purchases of CutLogic. If
        CutLogic is not a fit for your workflow, contact support@cutlogic.app
        within 14 days of purchase.
      </p>

      <p className="mt-4 leading-relaxed text-muted">
        Refunds are processed through Lemon Squeezy. Once a refund is completed,
        the associated license is revoked the next time the app successfully
        validates with the license server.
      </p>

      <p className="mt-4 leading-relaxed text-muted">
        If you have activation issues, contact support before requesting a refund
        and we will help resolve them quickly.
      </p>
    </main>
  );
}

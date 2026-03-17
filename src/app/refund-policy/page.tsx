import Link from "next/link";

export default function RefundPolicyPage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-3xl px-5 py-16 sm:px-6">
      <Link href="/" className="text-sm font-semibold text-brand hover:text-brand-deep">
        ← Back to CutLogic
      </Link>
      <h1 className="mt-6 font-display text-4xl font-bold tracking-tight">Refund Policy</h1>
      <p className="mt-3 text-sm text-muted">Effective Date: March 17, 2026</p>

      <section className="mt-5 rounded-xl border border-brand/20 bg-card p-4">
        <h2 className="font-display text-lg font-semibold">Plain-English Summary</h2>
        <ul className="mt-2 space-y-1 text-sm text-muted">
          <li>- First-time purchases are eligible for refunds within 14 days.</li>
          <li>- Email support@cutlogic.app with your purchase details to request a refund.</li>
          <li>- Refunds are processed through Lemon Squeezy.</li>
          <li>- Refunded licenses are revoked on the next successful license validation.</li>
        </ul>
      </section>

      <section className="mt-6 space-y-4 text-muted">
        <p>
          We offer a 14-day refund window for first-time purchases of CutLogic.
        </p>

        <p>
          To request a refund, contact <a href="mailto:support@cutlogic.app" className="underline underline-offset-4">support@cutlogic.app</a> within
          14 days of purchase and include your purchase email and order reference.
        </p>

        <p>
          Refunds are processed through Lemon Squeezy. Processing times may vary
          based on payment method and bank timelines.
        </p>

        <p>
          Once a refund is completed, the associated license is revoked the next
          time the app successfully validates with the license server.
        </p>

        <p>
          If you have activation issues, contact support first and we will help
          resolve them quickly.
        </p>
      </section>
    </main>
  );
}

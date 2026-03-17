import Link from "next/link";

export default function PrivacyPage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-3xl px-5 py-16 sm:px-6">
      <Link href="/" className="text-sm font-semibold text-brand hover:text-brand-deep">
        ← Back to CutLogic
      </Link>
      <h1 className="mt-6 font-display text-4xl font-bold tracking-tight">Privacy Policy</h1>
      <p className="mt-3 text-sm text-muted">Effective Date: March 17, 2026</p>

      <section className="mt-5 rounded-xl border border-brand/20 bg-card p-4">
        <h2 className="font-display text-lg font-semibold">Plain-English Summary</h2>
        <ul className="mt-2 space-y-1 text-sm text-muted">
          <li>- We collect only what is needed for licensing, billing, and support.</li>
          <li>- We do not sell your personal information.</li>
          <li>- Payment processing is handled by Lemon Squeezy.</li>
          <li>- You can contact us at <a href="mailto:support@cutlogic.app" className="underline underline-offset-4">support@cutlogic.app</a> for privacy requests.</li>
        </ul>
      </section>

      <section className="mt-6 space-y-4 text-muted">
        <p>
          CutLogic respects your privacy. This Privacy Policy describes what information we
          collect, how we use it, and your choices.
        </p>
        <p>
          We may collect account and transaction data, licensing and activation data, support
          communications, and limited operational diagnostics needed to provide and secure the
          service.
        </p>
        <p>
          We use this information to provide licensing, process activation, prevent fraud,
          improve reliability, and provide support.
        </p>
        <p>
          Payments are processed by Lemon Squeezy (or another designated payment provider). We do
          not store full payment card details on our own servers.
        </p>
        <p>
          We do not sell personal information. We may share data with service providers needed to
          operate CutLogic, or where legally required.
        </p>
        <p>
          We retain data as needed to provide services, comply with legal obligations, resolve
          disputes, and enforce agreements.
        </p>
        <p>
          We apply reasonable safeguards to protect personal data, but no method of transmission
          or storage is completely secure.
        </p>
        <p>
          Depending on your location, you may have rights to access, correct, or delete personal
          information. Contact us for requests.
        </p>
        <p>
          Privacy questions: <a href="mailto:support@cutlogic.app" className="underline underline-offset-4">support@cutlogic.app</a>
        </p>
      </section>
    </main>
  );
}

import Link from "next/link";

export default function PrivacyPage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-3xl px-5 py-16 sm:px-6">
      <Link href="/" className="text-sm font-semibold text-brand hover:text-brand-deep">
        ← Back to CutLogic
      </Link>
      <h1 className="mt-6 font-display text-4xl font-bold tracking-tight">Privacy Policy</h1>
      <p className="mt-4 leading-relaxed text-muted">
        CutLogic respects your privacy. We only collect the minimum account and billing
        information required to provide the service. We do not sell your personal data.
      </p>
      <p className="mt-4 leading-relaxed text-muted">
        Operational and product usage analytics may be collected to improve reliability and
        performance. You can contact support@cutlogic.app for privacy questions.
      </p>
    </main>
  );
}

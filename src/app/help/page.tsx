import Link from "next/link";

const downloadUrl = "/download";

export default function HelpPage() {
  return (
    <main className="min-h-screen bg-background px-5 py-16 text-foreground sm:px-6">
      <div className="mx-auto w-full max-w-4xl space-y-8">
        <header className="rounded-2xl border border-brand/20 bg-card p-6 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wider text-brand">Help</p>
          <h1 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            CutLogic Quick Start
          </h1>
          <p className="mt-3 text-muted">
            Windows is available now. macOS is coming soon.
          </p>
        </header>

        <section className="rounded-2xl border border-brand/20 bg-card p-6">
          <h2 className="font-display text-2xl font-semibold">Get Started</h2>
          <ol className="mt-4 space-y-2 text-sm text-foreground/90">
            <li>1. Download and install CutLogic for Windows.</li>
            <li>2. Open the app and start your free trial or activate a license.</li>
            <li>3. Create your first job and add door entries.</li>
            <li>4. Generate and print your first cut list.</li>
          </ol>
          <a
            href={downloadUrl}
            className="mt-5 inline-block rounded-xl bg-brand px-5 py-3 font-semibold text-white transition hover:bg-brand-deep"
          >
            Download Free Trial (Windows)
          </a>
        </section>

        <section className="rounded-2xl border border-brand/20 bg-card p-6">
          <h2 className="font-display text-2xl font-semibold">License & Billing</h2>
          <ul className="mt-4 space-y-2 text-sm text-foreground/90">
            <li>- Activate in app: Settings &gt; License.</li>
            <li>- Enter the purchase email and license key from Lemon Squeezy.</li>
            <li>- If refunded, the license is revoked the next time CutLogic successfully validates with the license server.</li>
            <li>- If activation fails, check key/email spelling and try Validate Now.</li>
          </ul>
        </section>

        <section className="rounded-2xl border border-brand/20 bg-card p-6">
          <h2 className="font-display text-2xl font-semibold">Need Help?</h2>
          <p className="mt-3 text-sm text-foreground/90">
            Email support: <a href="mailto:support@cutlogic.app" className="underline underline-offset-4">support@cutlogic.app</a>
          </p>
          <p className="mt-3 text-sm text-muted">
            Include your app version, operating system, and a short description of what happened.
          </p>
          <div className="mt-5">
            <Link href="/" className="text-sm font-medium text-brand underline-offset-4 hover:underline">
              Back to Home
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

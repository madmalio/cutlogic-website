import Link from "next/link";
import Image from "next/image";

const windowsDownloadPath = "/download/windows";

export default function DownloadPage() {
  return (
    <main className="min-h-screen bg-background px-5 py-16 text-foreground sm:px-6">
      <div className="mx-auto w-full max-w-4xl space-y-8">
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/" className="font-medium text-brand underline-offset-4 hover:underline">
            Home
          </Link>
          <Link href="/help" className="font-medium text-brand underline-offset-4 hover:underline">
            Help
          </Link>
        </nav>

        <header className="rounded-2xl border border-brand/20 bg-card p-6 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wider text-brand">Downloads</p>
          <h1 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Download CutLogic
          </h1>
          <p className="mt-3 text-muted">
            Choose your platform. Windows is available now, and macOS is coming soon.
          </p>
        </header>

        <section className="grid gap-4 md:grid-cols-2">
          <article className="rounded-2xl border border-brand/20 bg-card p-6 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wider text-brand">Available Now</p>
            <h2 className="mt-2 font-display text-2xl font-semibold">Windows</h2>
            <p className="mt-2 text-sm text-muted">
              Download the latest Windows installer and start your free trial.
            </p>
            <a
              href={windowsDownloadPath}
              className="mt-5 inline-block rounded-xl bg-brand px-5 py-3 font-semibold text-white transition hover:bg-brand-deep"
            >
              Download for Windows
            </a>
          </article>

          <article className="rounded-2xl border border-brand/20 bg-card p-6 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">Coming Soon</p>
            <h2 className="mt-2 font-display text-2xl font-semibold">macOS</h2>
            <p className="mt-2 text-sm text-muted">
              macOS support is in progress. We will announce availability on the website.
            </p>
            <span className="mt-5 inline-block rounded-xl border border-zinc-300 px-5 py-3 font-semibold text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
              macOS Coming Soon
            </span>
          </article>
        </section>

        <section className="rounded-2xl border border-amber-300/50 bg-amber-50 p-6 shadow-sm dark:border-amber-700/40 dark:bg-amber-900/15">
          <h3 className="font-display text-xl font-semibold">Before You Install (Windows)</h3>
          <p className="mt-3 text-sm text-foreground/90">
            Windows may show a <strong>&quot;Windows protected your PC&quot;</strong> message on first install.
            If that appears, click <strong>More info</strong> and then <strong>Run anyway</strong>.
          </p>
          <p className="mt-2 text-sm text-foreground/90">
            This is common for new installers while Windows reputation builds.
          </p>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <article className="rounded-lg border border-zinc-300 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-900/60">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">Step 1</p>
              <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Windows protected your PC</h4>
              <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-300">Initial SmartScreen prompt shown during first install.</p>
              <div className="mt-3 overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-700">
                <Image
                  src="/windows-smartscreen-step-1.webp"
                  alt="Windows SmartScreen initial warning prompt"
                  width={1200}
                  height={800}
                  className="h-auto w-full"
                />
              </div>
            </article>

            <article className="rounded-lg border border-zinc-300 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-900/60">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">Step 2</p>
              <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">More info, then Run anyway</h4>
              <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-300">After selecting More info, choose Run anyway to continue.</p>
              <div className="mt-3 overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-700">
                <Image
                  src="/windows-smartscreen-step-2-more-info.webp"
                  alt="Windows SmartScreen with More info expanded and Run anyway option"
                  width={1200}
                  height={800}
                  className="h-auto w-full"
                />
              </div>
            </article>
          </div>
          <p className="mt-3 text-sm text-foreground/90">
            Need install help? Email <a href="mailto:support@cutlogic.app" className="underline underline-offset-4">support@cutlogic.app</a>
          </p>
        </section>

        <section className="rounded-2xl border border-brand/20 bg-card p-6 shadow-sm">
          <h3 className="font-display text-xl font-semibold">After Download</h3>
          <ol className="mt-3 space-y-2 text-sm text-foreground/90">
            <li>1. Install CutLogic.</li>
            <li>2. Open the app and start your free trial or activate a license.</li>
            <li>3. If purchased, activate in Settings &gt; License using your email and key.</li>
          </ol>
          <div className="mt-5">
            <Link href="/help" className="text-sm font-medium text-brand underline-offset-4 hover:underline">
              Need help? View setup guide
            </Link>
            <span className="mx-2 text-zinc-400">•</span>
            <Link href="/" className="text-sm font-medium text-brand underline-offset-4 hover:underline">
              Back to Home
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

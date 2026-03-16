import Link from "next/link";

const windowsDownloadPath = "/download/windows";

export default function DownloadPage() {
  return (
    <main className="min-h-screen bg-background px-5 py-16 text-foreground sm:px-6">
      <div className="mx-auto w-full max-w-4xl space-y-8">
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
          </div>
        </section>
      </div>
    </main>
  );
}

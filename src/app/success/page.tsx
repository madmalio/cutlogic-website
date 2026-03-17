import Link from "next/link";

const downloadUrl = "/download";

export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-background px-5 py-16 text-foreground sm:px-6">
      <div className="mx-auto w-full max-w-2xl rounded-3xl border border-brand/20 bg-card p-8 shadow-xl shadow-black/20 sm:p-10">
        <p className="inline-flex rounded-full border border-brand/35 bg-brand/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand">
          Purchase Complete
        </p>
        <h1 className="mt-5 font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Your License Is Ready
        </h1>
        <p className="mt-3 text-muted">
          Your license key has been emailed to you. If CutLogic is already installed,
          open Settings &gt; License and activate with your purchase email and key.
        </p>

        <ol className="mt-8 space-y-3 text-sm text-foreground/90">
          <li>1. If needed, download and install CutLogic.</li>
          <li>2. Open CutLogic on your computer.</li>
          <li>3. Go to Settings &gt; License and enter your purchase email + key.</li>
        </ol>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href={downloadUrl}
            className="rounded-xl bg-brand px-6 py-3 text-center font-semibold text-white transition hover:bg-brand-deep"
          >
            Download Installer
          </a>
          <Link
            href="/"
            className="rounded-xl border border-brand/35 px-6 py-3 text-center font-semibold text-foreground transition hover:border-brand hover:text-brand"
          >
            Back to Website
          </Link>
        </div>
      </div>
    </main>
  );
}

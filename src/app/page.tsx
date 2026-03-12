import Image from "next/image";
import Link from "next/link";

const features = [
  {
    title: "Faster Job Setup",
    description:
      "Set up door jobs in minutes with reusable defaults and fewer manual steps.",
  },
  {
    title: "Accurate Cut Lists",
    description:
      "Generate production-ready cut lists that reduce mistakes and material waste.",
  },
  {
    title: "Catalog + Presets",
    description:
      "Standardize dimensions, overlays, and specs so every job follows the same standard.",
  },
  {
    title: "Quick Door Mode",
    description:
      "Handle one-off doors quickly without spinning up a full job workflow.",
  },
  {
    title: "Built for the Shop",
    description:
      "Built around cabinet and door production workflows, not generic spreadsheets.",
  },
  {
    title: "Local-First Reliability",
    description:
      "Keep working through internet issues and stay in control of production data.",
  },
];

const faqs = [
  {
    question: "Who is CutLogic built for?",
    answer:
      "CutLogic is built for cabinet shops, door manufacturers, and woodworking teams that need consistent cut list accuracy.",
  },
  {
    question: "Can I use CutLogic for custom one-off projects?",
    answer:
      "Yes. Quick Door mode handles one-off pieces quickly, while full job workflows support larger production runs.",
  },
  {
    question: "Is CutLogic cloud-dependent?",
    answer:
      "No. CutLogic is designed for real shop conditions and does not require constant internet access.",
  },
  {
    question: "Do you offer team support?",
    answer: "Yes. Team onboarding and priority support are available.",
  },
  {
    question: "Is this a subscription?",
    answer:
      "No. CutLogic is a one-time purchase with full access for a single price.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-brand/20 bg-background/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-6">
          <a href="#top" className="flex items-center gap-3">
            <Image
              src="/cutlogic-logo-dark.png"
              alt="CutLogic logo"
              width={36}
              height={36}
              className="h-9 w-9 rounded-md object-contain"
              priority
            />
            <span className="font-display text-xl font-bold tracking-tight">CutLogic</span>
          </a>
          <a
            href="https://app.cutlogic.app"
            className="rounded-full bg-brand px-5 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-brand-deep"
          >
            Get CutLogic
          </a>
        </div>
      </header>

      <main id="top">
        <section className="relative overflow-hidden px-5 pb-20 pt-18 sm:px-6 sm:pt-24">
          <div className="hero-grid absolute inset-0 opacity-70" aria-hidden />
          <div className="pointer-events-none absolute -left-40 top-20 h-72 w-72 rounded-full bg-brand-soft blur-3xl" />
          <div className="pointer-events-none absolute -right-36 bottom-5 h-72 w-72 rounded-full bg-brand/15 blur-3xl" />

          <div className="relative mx-auto w-full max-w-5xl text-center">
            <p className="fade-up inline-flex items-center rounded-full border border-brand/35 bg-card/80 px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand">
              Precision for Production
            </p>
            <h1 className="fade-up-delay mx-auto mt-6 max-w-4xl font-display text-5xl font-bold tracking-tight text-balance sm:text-7xl">
              Precision Cut Lists,
              <span className="text-brand"> Built for Real Door Production.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-muted sm:text-xl">
              CutLogic helps your shop move from quote to production with reliable
              calculations, cleaner outputs, and a workflow your team can trust.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="https://app.cutlogic.app"
                className="rounded-xl bg-brand px-8 py-4 text-base font-semibold text-white shadow-lg shadow-brand/25 transition hover:-translate-y-0.5 hover:bg-brand-deep"
              >
                Get Started
              </a>
              <a
                href="#pricing"
                className="rounded-xl border border-brand/35 bg-card px-8 py-4 text-base font-semibold text-foreground transition hover:border-brand hover:text-brand"
              >
                View Pricing
              </a>
            </div>
          </div>
        </section>

        <section className="border-y border-brand/10 bg-card px-5 py-20 sm:px-6">
          <div className="mx-auto w-full max-w-6xl">
            <div className="mb-12 text-center">
              <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
                Everything You Need. Nothing You Don&apos;t.
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-muted">
                Replace spreadsheet guesswork with a polished, repeatable production workflow.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <article
                  key={feature.title}
                  className="rounded-2xl border border-brand/20 bg-card p-6 shadow-sm shadow-black/20 transition hover:-translate-y-1 hover:border-brand/45"
                >
                  <h3 className="font-display text-xl font-semibold">{feature.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted">{feature.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="px-5 py-20 sm:px-6">
          <div className="mx-auto w-full max-w-4xl">
            <div className="mb-12 text-center">
              <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
                Straightforward Pricing
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-muted">
                One payment, full access, no recurring subscription.
              </p>
            </div>

            <article className="relative mx-auto max-w-xl rounded-3xl border-2 border-brand bg-card p-8 text-foreground shadow-2xl shadow-brand/20">
              <p className="absolute right-5 top-5 rounded-full bg-brand px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                Lifetime License
              </p>
              <h3 className="font-display text-2xl font-semibold">CutLogic</h3>
              <p className="mt-3 text-5xl font-bold">$39</p>
              <p className="mt-1 text-sm text-muted">one-time purchase</p>
              <ul className="mt-8 space-y-3 text-sm text-foreground/90">
                <li>Unlimited jobs</li>
                <li>Advanced cut optimization</li>
                <li>Quick Door + full workflows</li>
                <li>Lifetime access to current release</li>
              </ul>
              <a
                href="https://app.cutlogic.app"
                className="mt-8 block rounded-xl bg-brand px-5 py-3 text-center font-semibold text-white transition hover:bg-brand-deep"
              >
                Buy CutLogic
              </a>
            </article>
          </div>
        </section>

        <section className="border-y border-brand/10 bg-card px-5 py-20 sm:px-6">
          <div className="mx-auto w-full max-w-3xl">
            <h2 className="text-center font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Frequently Asked Questions
            </h2>
            <div className="mt-10 space-y-8">
              {faqs.map((faq) => (
                <article key={faq.question}>
                  <h3 className="font-display text-lg font-semibold">{faq.question}</h3>
                  <p className="mt-2 leading-relaxed text-muted">{faq.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="px-5 py-10 sm:px-6">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 text-sm text-muted sm:flex-row">
          <div className="flex items-center gap-3">
            <Image
              src="/cutlogic-logo-dark.png"
              alt="CutLogic logo"
              width={28}
              height={28}
              className="h-7 w-7 rounded object-contain"
            />
            <p className="font-display text-base font-semibold text-foreground">CutLogic</p>
            <p>© {new Date().getFullYear()} All rights reserved.</p>
          </div>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="transition hover:text-brand">
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition hover:text-brand">
              Terms of Service
            </Link>
            <a href="mailto:support@cutlogic.app" className="transition hover:text-brand">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

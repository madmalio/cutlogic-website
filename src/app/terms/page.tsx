import Link from "next/link";

export default function TermsPage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-3xl px-5 py-16 sm:px-6">
      <Link href="/" className="text-sm font-semibold text-brand hover:text-brand-deep">
        ← Back to CutLogic
      </Link>
      <h1 className="mt-6 font-display text-4xl font-bold tracking-tight">Terms of Service</h1>
      <p className="mt-3 text-sm text-muted">Effective Date: March 17, 2026</p>

      <section className="mt-5 rounded-xl border border-brand/20 bg-card p-4">
        <h2 className="font-display text-lg font-semibold">Plain-English Summary</h2>
        <ul className="mt-2 space-y-1 text-sm text-muted">
          <li>- You can use CutLogic for your internal business use.</li>
          <li>- Please verify final production dimensions before fabrication.</li>
          <li>- Paid features require an active license and periodic validation.</li>
          <li>- Refunds follow our policy at <Link href="/refund-policy" className="underline underline-offset-4">/refund-policy</Link>.</li>
        </ul>
      </section>

      <section className="mt-6 space-y-4 text-muted">
        <p>By accessing or using CutLogic, you agree to these Terms of Service (&quot;Terms&quot;).</p>
        <p>
          Subject to these Terms and payment of applicable fees, we grant you a limited,
          non-exclusive, non-transferable, revocable license to use CutLogic for internal
          business purposes.
        </p>
        <p>
          You agree not to reverse engineer, resell, sublicense, distribute, or otherwise
          misuse the software or related services.
        </p>
        <p>
          Trial access, features, and availability may change at any time. Purchases and billing
          are processed by Lemon Squeezy (or our designated payment processor).
        </p>
        <p>
          Refunds are governed by our refund policy: <Link href="/refund-policy" className="underline underline-offset-4">/refund-policy</Link>.
        </p>
        <p>
          Use of paid features requires an active license. We may perform periodic license
          validation. If a license is refunded, revoked, or invalid, paid features may be limited
          or disabled.
        </p>
        <p>
          You are responsible for verifying all measurements, dimensions, and production outputs
          before fabrication.
        </p>
        <p>
          THE SERVICES ARE PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND,
          EXPRESS OR IMPLIED.
        </p>
        <p>
          TO THE MAXIMUM EXTENT PERMITTED BY LAW, CUTLOGIC IS NOT LIABLE FOR INDIRECT,
          INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES. TOTAL LIABILITY WILL NOT
          EXCEED THE AMOUNT YOU PAID IN THE 12 MONTHS BEFORE THE CLAIM.
        </p>
        <p>
          These Terms are governed by the laws of the State of New Mexico, United States.
        </p>
        <p>
          Questions: <a href="mailto:support@cutlogic.app" className="underline underline-offset-4">support@cutlogic.app</a>
        </p>
      </section>
    </main>
  );
}

import Link from "next/link";
import Footer from "@/shared/ui/Footer";
import { plans } from "@/features/pricing/data/plans";
import { ALL_TOOLS } from "@/features/utilities/constants/tools";
import { getAllowedToolKeys } from "@/lib/utilities/tools-policy";

export const metadata = {
  title: "Premium plan | pdfSwiffter",
  description:
    "Upgrade to Premium for unlimited conversions, priority processing, and advanced helpers.",
};

const heroHighlights = [
  {
    title: "Unlimited conversions",
    description: "Run any tool indefinitely with no waiting rooms or daily quotas.",
  },
  {
    title: "Priority processing",
    description: "Large exports finish faster because premium jobs skip the shared queue.",
  },
  {
    title: "Advanced helpers",
    description: "Watermarks, page numbers, organization, and more unlock instantly.",
  },
  {
    title: "Ad-free workspace",
    description: "Work with sensitive PDFs without banners or clutter.",
  },
];

const baseMetrics = [
  { label: "Avg conversion time", value: "12s" },
  { label: "Premium tools", value: "0" },
  { label: "Monthly files", value: "4.2K" },
];

const workflowSteps = [
  {
    title: "Upload once, reuse often",
    description: "Run multiple conversions without re-uploading the same files.",
  },
  {
    title: "Batch-friendly exports",
    description: "Process multiple files in a single flow, with faster queues.",
  },
  {
    title: "Reliable history",
    description: "Premium keeps recent results available for quick re-downloads.",
  },
];

const comparisonRows = [
  { label: "Tool runs", free: "3 per tool / month", premium: "Unlimited" },
  { label: "Processing priority", free: "Standard queue", premium: "High priority" },
  { label: "Advanced features", free: "Limited", premium: "Watermarks, organize, numbering" },
  { label: "Ads", free: "Inline slots", premium: "No ads" },
  { label: "Support", free: "Email support", premium: "Priority email support" },
];

const fadeStyle = (delay = 0) => ({
  animation: "premiumFade 0.9s ease-out both",
  animationDelay: `${delay}ms`,
});

export default async function PremiumPage() {
  const premiumPlan = plans.find((plan) => plan.name === "Premium");
  const freePlan = plans.find((plan) => plan.name === "Standard");
  const allowedToolKeys = await getAllowedToolKeys();
  const allowedSet = new Set(allowedToolKeys || []);
  const premiumToolCount = ALL_TOOLS.filter(
    (tool) => tool.tier === "premium" && allowedSet.has(tool.key)
  ).length;
  const trustMetrics = baseMetrics.map((metric) =>
    metric.label === "Premium tools"
      ? { ...metric, value: String(premiumToolCount) }
      : metric
  );

  return (
    <div
      className="min-h-screen bg-[#f6f4ef] text-slate-900 font-[var(--font-body)]"
      style={{
        "--font-display": '"Fraunces", "Georgia", serif',
        "--font-body": '"Space Grotesk", "Trebuchet MS", sans-serif',
      }}
    >
      <style>{`
        @keyframes premiumFade {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute -top-32 right-0 h-64 w-64 rounded-full bg-amber-400/40 blur-3xl" />
        <div className="absolute -bottom-20 left-8 h-72 w-72 rounded-full bg-teal-500/30 blur-3xl" />
        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-amber-400 via-teal-400 to-slate-900" />

        <div className="relative z-10 mx-auto max-w-6xl px-6 py-16 lg:grid lg:grid-cols-[1.1fr_0.9fr] lg:gap-12 lg:py-20">
          <div style={fadeStyle(0)}>
            <span className="inline-flex items-center rounded-full border border-white/20 bg-white/5 px-4 py-1 text-xs uppercase tracking-[0.35em] text-amber-200">
              Premium plan
            </span>
            <h1
              className="mt-6 text-4xl font-extrabold leading-tight text-white md:text-5xl lg:text-6xl font-[var(--font-display)]"
              style={fadeStyle(120)}
            >
              Premium PDF tools that feel effortless.
            </h1>
            <p className="mt-5 max-w-xl text-base text-slate-200 md:text-lg" style={fadeStyle(180)}>
              Premium removes the friction from your daily workflow. Unlimited runs, faster queues, and advanced helpers
              mean you spend less time waiting and more time shipping.
            </p>

            <div className="mt-8 flex flex-wrap gap-4" style={fadeStyle(240)}>
              <Link
                href="/signup"
                className="inline-flex items-center justify-center rounded-full bg-amber-300 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-amber-200"
              >
                Start premium
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:border-white"
              >
                Compare plans
              </Link>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-3" style={fadeStyle(300)}>
              {trustMetrics.map((metric) => (
                <div key={metric.label}>
                  <p className="text-3xl font-extrabold text-white">{metric.value}</p>
                  <p className="text-xs uppercase tracking-[0.25em] text-slate-300">{metric.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 lg:mt-0" style={fadeStyle(200)}>
            <div className="rounded-3xl bg-white p-6 text-slate-900 shadow-[0_30px_80px_rgba(15,23,42,0.45)]">
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Premium</p>
                <span className="rounded-full bg-amber-100 px-3 py-1 text-[10px] font-semibold uppercase text-amber-700">
                  Most popular
                </span>
              </div>

              <div className="mt-4 flex items-end gap-3">
                <span className="text-4xl font-extrabold text-slate-900">{premiumPlan?.price || "$9"}</span>
                <span className="text-sm text-slate-500">/{premiumPlan?.period || "month"}</span>
              </div>
              <p className="mt-2 text-sm text-slate-600">{premiumPlan?.description}</p>

              <div className="mt-6 space-y-3 text-sm text-slate-700">
                {premiumPlan?.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-teal-500" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <div className="mt-7 flex flex-col gap-3">
                <Link
                  href="/signup"
                  className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  Start premium
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-400"
                >
                  Talk to sales
                </Link>
              </div>
              <p className="mt-4 text-xs text-slate-500">Cancel anytime. VAT invoices available on request.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Premium workflow</p>
            <h2 className="mt-4 text-3xl font-bold text-slate-900 font-[var(--font-display)]">
              Designed for deep focus, not busywork.
            </h2>
            <p className="mt-4 text-sm text-slate-600">
              Premium keeps your pipeline clean. You can batch conversions, revisit recent results, and apply advanced
              enhancements without opening multiple tools or tabs.
            </p>

            <div className="mt-8 space-y-6 border-l border-slate-200 pl-6">
              {workflowSteps.map((step) => (
                <div key={step.title}>
                  <h3 className="text-lg font-semibold text-slate-900">{step.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{step.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-6">
            {heroHighlights.map((item) => (
              <div key={item.title} className="border-b border-slate-200 pb-6 last:border-b-0 last:pb-0">
                <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Plan comparison</p>
              <h2 className="mt-3 text-2xl font-bold text-slate-900 font-[var(--font-display)]">
                See the upgrade in one glance.
              </h2>
            </div>
            <Link href="/pricing" className="text-sm font-semibold text-slate-900 underline">
              Full pricing details
            </Link>
          </div>

          <div className="mt-8 divide-y divide-slate-100 rounded-2xl border border-slate-200/70 bg-[#fbfaf7]">
            <div className="grid gap-2 px-6 py-4 text-xs uppercase tracking-[0.3em] text-slate-400 md:grid-cols-[1.4fr_1fr_1fr]">
              <span>Feature</span>
              <span>{freePlan?.name || "Standard"}</span>
              <span>{premiumPlan?.name || "Premium"}</span>
            </div>
            {comparisonRows.map((row) => (
              <div
                key={row.label}
                className="grid gap-3 px-6 py-4 text-sm text-slate-700 md:grid-cols-[1.4fr_1fr_1fr]"
              >
                <span className="font-medium text-slate-900">{row.label}</span>
                <span>{row.free}</span>
                <span className="font-semibold text-slate-900">{row.premium}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0f172a] text-white">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-teal-200">Trusted workflows</p>
              <h2 className="mt-4 text-3xl font-semibold font-[var(--font-display)]">
                Premium keeps teams moving, even under pressure.
              </h2>
              <p className="mt-4 text-sm text-slate-200">
                The premium tier is built for high-volume workflows, with priority infrastructure and proactive support
                when you need it.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-slate-100">
              <p className="text-lg font-semibold text-white">
                We cut our weekly PDF turnaround time in half after upgrading. Premium support made onboarding easy.
              </p>
              <p className="mt-4 text-xs uppercase tracking-[0.2em] text-slate-300">
                Operations Lead, Fintech Team
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="rounded-3xl bg-gradient-to-br from-amber-200 via-amber-100 to-teal-100 px-8 py-10 text-slate-900 shadow-lg">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-amber-700">Ready to upgrade</p>
              <h2 className="mt-4 text-3xl font-semibold font-[var(--font-display)]">
                Move faster with Premium.
              </h2>
              <p className="mt-3 text-sm text-slate-700">
                Unlock advanced helpers, keep your workspace ad-free, and process more files with confidence.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Start premium
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border border-slate-900/30 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-900/60"
              >
                Talk to sales
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

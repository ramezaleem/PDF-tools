"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { plans } from "@/features/pricing/data/plans";

export default function PricingPageClient() {
  const [loading, setLoading] = useState(null);
  const router = useRouter();
  const fadeStyle = (delay = 0) => ({
    animation: "priceLift 0.8s ease-out both",
    animationDelay: `${delay}ms`,
  });

  const handleUpgrade = async (plan) => {
    if (plan.price === "$0") {
      router.push(plan.ctaLink);
      return;
    }

    setLoading(plan.name);

    try {
      const amount = parseFloat(plan.price.replace("$", ""));

      const response = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          planName: plan.name,
          amount: amount,
        }),
      });

      const result = await response.json();

      if (result.success && result.paymentUrl) {
        window.location.assign(result.paymentUrl);
      } else {
        alert(result.message || "Failed to initiate payment. Please try again.");
        setLoading(null);
      }
    } catch (error) {
      console.error("Payment initiation error:", error);
      alert("An error occurred. Please try again.");
      setLoading(null);
    }
  };

  return (
    <div
      className="min-h-screen bg-[#f8f4ef] text-slate-900 font-[var(--font-body)]"
      style={{
        "--font-display": '"Fraunces", "Georgia", serif',
        "--font-body": '"Space Grotesk", "Trebuchet MS", sans-serif',
      }}
    >
      <style>{`
        @keyframes priceLift {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-white to-teal-50" />
        <div className="absolute -top-32 right-0 h-64 w-64 rounded-full bg-amber-300/40 blur-3xl" />
        <div className="absolute -bottom-32 left-0 h-72 w-72 rounded-full bg-teal-400/30 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-6xl px-6 py-16 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div style={fadeStyle(0)}>
              <span className="inline-flex items-center rounded-full border border-amber-200 bg-white/70 px-4 py-1 text-xs uppercase tracking-[0.35em] text-amber-800">
                Pricing
              </span>
              <h1 className="mt-6 text-4xl font-extrabold leading-tight text-slate-900 md:text-5xl font-[var(--font-display)]">
                Transparent plans built for fast-moving teams.
              </h1>
              <p className="mt-4 max-w-xl text-base text-slate-700 md:text-lg">
                Start with Standard and upgrade only when volume picks up. Premium unlocks unlimited runs, faster
                queues, and advanced helpers.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  "Standard includes 3 uses per tool each month.",
                  "Premium removes limits and accelerates processing.",
                  "Only high-reliability tools stay enabled.",
                  "Cancel or downgrade any time, no contracts.",
                ].map((point) => (
                  <div key={point} className="rounded-2xl bg-white/80 p-4 text-sm text-slate-700 shadow-sm">
                    {point}
                  </div>
                ))}
              </div>
            </div>

            <div
              className="rounded-3xl border border-slate-200/70 bg-white/90 p-6 shadow-[0_24px_70px_rgba(15,23,42,0.18)]"
              style={fadeStyle(120)}
            >
              <p className="text-xs uppercase tracking-[0.35em] text-slate-400">What you get</p>
              <h2 className="mt-4 text-2xl font-semibold text-slate-900 font-[var(--font-display)]">
                Reliability-first PDF workflows.
              </h2>
              <p className="mt-3 text-sm text-slate-600">
                Every plan includes secure processing, monthly usage tracking, and tool reliability checks.
              </p>
              <div className="mt-6 space-y-3 text-sm text-slate-700">
                {[
                  "Usage dashboard with remaining runs.",
                  "Instant access to core PDF transforms.",
                  "Priority support for Premium accounts.",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-amber-400" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, idx) => {
            const isPopular = plan.popular;
            return (
              <div
                key={plan.name}
                className={`relative ${isPopular ? "rounded-3xl bg-gradient-to-br from-amber-300 via-amber-100 to-teal-200 p-[1px]" : "rounded-3xl border border-slate-200/70"}`}
                style={fadeStyle(180 + idx * 120)}
              >
                <div className={`h-full rounded-3xl bg-white p-8 shadow-lg ${isPopular ? "ring-1 ring-amber-200" : ""}`}>
                  {isPopular && (
                    <div className="absolute right-8 top-0 -translate-y-1/2">
                      <span className="inline-flex rounded-full bg-slate-900 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                        Most popular
                      </span>
                    </div>
                  )}

                  <div className="text-center">
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{plan.name}</p>
                    <h3 className="mt-2 text-2xl font-bold text-slate-900">{plan.description}</h3>
                    <div className="mt-6 flex items-end justify-center gap-2">
                      <span className="text-5xl font-extrabold text-slate-900">{plan.price}</span>
                      <span className="text-sm font-medium text-slate-500">/{plan.period}</span>
                    </div>
                  </div>

                  <ul className="mt-8 space-y-4">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3 text-sm text-slate-700">
                        <svg
                          className={`h-5 w-5 shrink-0 ${isPopular ? "text-amber-500" : "text-teal-600"}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8">
                    <button
                      onClick={() => handleUpgrade(plan)}
                      disabled={loading === plan.name}
                      className={`block w-full rounded-full px-6 py-3 text-center text-sm font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                        isPopular
                          ? "bg-slate-900 text-white hover:bg-slate-800"
                          : "bg-amber-100 text-amber-900 hover:bg-amber-200"
                      }`}
                    >
                      {loading === plan.name ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                          </svg>
                          Processing...
                        </span>
                      ) : (
                        plan.cta
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

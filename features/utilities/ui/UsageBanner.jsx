"use client";

import Link from "next/link";

export default function UsageBanner({ usage, loading }) {
  if (loading) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-500">
        Checking usage limits...
      </div>
    );
  }

  if (!usage) return null;

  const isPremium = usage.plan === "premium";
  const limitLabel = isPremium
    ? "Unlimited"
    : `${usage.remaining ?? 0} of ${usage.limit ?? 3} uses remaining this month`;

  return (
    <div className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 flex flex-wrap items-center justify-between gap-3">
      <div>
        <span className="font-semibold text-gray-900">
          {isPremium ? "Premium plan" : "Standard plan"}
        </span>
        <span className="mx-2 text-gray-300">•</span>
        <span>{limitLabel}</span>
      </div>
      {!isPremium && (
        <Link href="/premium" className="text-sm font-semibold text-teal-600 hover:underline">
          Upgrade to Premium
        </Link>
      )}
    </div>
  );
}

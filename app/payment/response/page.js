import React from "react";
import PaymentResponseClient from "@/features/payment/ui/PaymentResponseClient";

export const metadata = {
  title: "Payment Verification | pdfSwiffter",
  description: "Verifying your payment and activating premium access.",
};

export default function PaymentResponsePage() {
  return (
    <React.Suspense fallback={<div />}>
      <PaymentResponseClient />
    </React.Suspense>
  );
}

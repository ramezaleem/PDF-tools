import React from "react";
import PaymentErrorClient from "@/features/payment/ui/PaymentErrorClient";

export const metadata = {
  title: "Payment Failed | pdfSwiffter",
  description: "We could not process your payment. Review common issues and try again.",
};

export default function PaymentErrorPage() {
  return (
    <React.Suspense fallback={<div />}> 
      <PaymentErrorClient />
    </React.Suspense>
  );
}

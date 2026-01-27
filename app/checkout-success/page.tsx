"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  useEffect(() => {
    console.log("Order placed:", orderId);
    // optional: call backend to fetch order status
  }, [orderId]);

  return (
    <div className="flex flex-col items-center mt-20">
      <h1 className="text-3xl font-bold text-green-600">
        Payment Successful 🎉
      </h1>
      <p className="mt-4">Order ID: {orderId}</p>
    </div>
  );
}

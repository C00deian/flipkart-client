"use client";

import { useSearchParams } from "next/navigation";

const CheckoutSuccess = () => {
  const params = useSearchParams();
  const orderId = params.get("orderId");

  return (
    <div className="text-center mt-10">
      <h1 className="text-2xl font-bold text-green-600">
        Payment Successful 🎉
      </h1>
      <p>Order ID: {orderId}</p>
    </div>
  );
};

export default CheckoutSuccess;

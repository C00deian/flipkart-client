
"use client";

import { useContext } from "react";
import { AuthContext } from "@/app/context/AuthContext";
import NullData from "@/app/components/NullData";
import { OrderDetails } from "./OrderDetails";

export default function OrderClient({ order }: any) {
  const auth = useContext(AuthContext);

if (!auth || auth.isLoading) {
    return <NullData title="Loading..." />;
  }

  const { currentUser } = auth;

  if (!currentUser || currentUser.role !== "ADMIN") {
    return <NullData title="Oops! Access Denied" />;
  }

  return <OrderDetails order={order} />;
}

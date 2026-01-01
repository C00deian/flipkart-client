
"use client";

import { useContext } from "react";
import { AuthContext } from "@/app/context/AuthContext";
import NullData from "@/app/components/NullData";
import { OrderDetails } from "./OrderDetails";

export default function OrderClient({ order }: any) {
  const { currentUser } = useContext(AuthContext);

  if (!currentUser || currentUser.id !== 7) {
    return <NullData title="Oops! Access Denied" />;
  }

  return <OrderDetails order={order} />;
}

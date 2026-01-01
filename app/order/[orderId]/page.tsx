
import { cookies } from "next/headers";
import Container from "@/app/components/Container";
import NullData from "@/app/components/NullData";
import OrderClient from "../OrderClient";
import { getOrderById } from "@/app/services/order/service";

export default async function Order({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  // ✅ FIX: params is Promise
  const { orderId } = await params;

  // ✅ Read token from cookie
  const token = (await cookies()).get("accessToken")?.value;

  if (!token) {
    return <NullData title="Unauthorized" />;
  }

  try {
    const order = await getOrderById(orderId, token);
    console.log("order" , order)

    return (
      <div className="p-8">
        <Container>
          <OrderClient order={order} />
        </Container>
      </div>
    );
  } catch (error) {
    return <NullData title="Order not found or access denied" />;
  }
}

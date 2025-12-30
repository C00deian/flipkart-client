import Container from "@/app/components/Container";
import { OrderDetails } from "./OrderDetails";
import NullData from "@/app/components/NullData";
import { getOrderByID } from "@/app/services/auth.service";

interface IParams {
    params: Promise<{ orderId: string }>;
}

const Order = async ({ params }: IParams) => {

    // 1. Params resolve karein
    const resolvedParams = await params;
    const orderId = resolvedParams.orderId;

    let order = null;

    try {
        const res = await getOrderByID(orderId);
        order = res.data.data;
        console.log("orders" , res.data.data)

    } catch (error) {
        console.error("Error fetching order:", error);
        // Error aane par order null hi rahega
    }

    // 4. Handle Null Case
    if (!order) {
        return <NullData title="Order not found or Access Denied" />;
    }

    return (
        <div className="p-8">
            <Container>
                <OrderDetails order={order} />
            </Container>
        </div>
    );
};

export default Order;
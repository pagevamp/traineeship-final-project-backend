import OrderDetails from "@/features/orders/components/OrderDetails";
import React from "react";

export async function generateMetadata() {
  return {
    title: "Order Detail | Arctern Express",
  };
}

const OrderDetailPage = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <OrderDetails id={params.id} />
    </div>
  );
};

export default OrderDetailPage;

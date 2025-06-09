import React from "react";
import OrdersComponent from "@/features/orders";

export async function generateMetadata() {
  return {
    title: "Orders | Arctern Express",
  };
}
const Index = () => {
  return (
    <div className="py-4">
      <OrdersComponent />
    </div>
  );
};

export default Index;

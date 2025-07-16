import { ClientOnly } from "@/components/ClientWrapper";
import Cart from "@/features/orders/components/cart";
import React from "react";

export async function generateMetadata() {
  return {
    title: "Cart | Arctern Express",
  };
}

const CartPage = () => {
  return (
    <ClientOnly fallback={<div>Loading...</div>}>
      <Cart />
    </ClientOnly>
  );
};

export default CartPage;

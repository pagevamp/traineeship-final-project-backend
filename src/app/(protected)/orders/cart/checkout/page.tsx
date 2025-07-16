import { ClientOnly } from "@/components/ClientWrapper";
import Cart from "@/features/orders/components/cart";
import CheckoutPage from "@/features/orders/components/cart/checkout";
import React from "react";

export async function generateMetadata() {
  return {
    title: "Checkout | Arctern Express",
  };
}

const CartPage = () => {
  return (
    <ClientOnly fallback={<div>Loading...</div>}>
      <CheckoutPage />
    </ClientOnly>
  );
};

export default CartPage;

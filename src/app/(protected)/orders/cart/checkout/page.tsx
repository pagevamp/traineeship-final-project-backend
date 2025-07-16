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
    <ClientOnly
      fallback={
        <div className="flex items-center justify-center p-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      }
    >
      <CheckoutPage />
    </ClientOnly>
  );
};

export default CartPage;

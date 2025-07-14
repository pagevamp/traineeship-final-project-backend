"use client";

import { useCartStore } from "@/lib/cart-store";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import GroupedCartItem from "./components/grouped-card-item";
import Link from "next/link";
import { ShoppingBag, ArrowLeft } from "lucide-react";

export default function Cart() {
  const { items, clearCart, getTotalItems, getTotalPrice, getGroupedItems } =
    useCartStore();

  const groupedItems = getGroupedItems();
  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <ShoppingBag className="w-24 h-24 mx-auto text-gray-300 mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Your cart is empty
          </h1>
          <p className="text-gray-600 mb-8">
            Looks like you haven&apos;t added any items to your cart yet.
          </p>
          <Link href="/">
            <Button size="lg">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
            <p className="text-gray-600 mt-1">
              {totalItems} {totalItems === 1 ? "item" : "items"} in your cart
              across {Object.keys(groupedItems).length}{" "}
              {Object.keys(groupedItems).length === 1 ? "product" : "products"}
            </p>
          </div>
          <Link href="/">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Continue Shopping
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Cart Items</h2>
              <Button
                variant="ghost"
                onClick={clearCart}
                className="text-red-500 hover:text-red-700"
              >
                Clear Cart
              </Button>
            </div>

            <div className="space-y-6">
              {Object.entries(groupedItems).map(([productId, productItems]) => (
                <GroupedCartItem
                  key={productId}
                  productId={productId}
                  items={productItems as any}
                />
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {Object.entries(groupedItems).map(
                    ([productId, productItems]: any) => {
                      const product = productItems[0].product;
                      const productTotal = productItems.reduce(
                        (sum: any, item: any) =>
                          sum + item.selectedVariation.price * item.quantity,
                        0
                      );
                      const productQuantity = productItems.reduce(
                        (sum: any, item: any) => sum + item.quantity,
                        0
                      );

                      return (
                        <div
                          key={productId}
                          className="flex justify-between text-sm"
                        >
                          <span className="truncate">
                            {product.name} ({productQuantity} items)
                          </span>
                          <span>{formatPrice(productTotal)}</span>
                        </div>
                      );
                    }
                  )}
                </div>

                <hr />

                <div className="flex justify-between text-sm">
                  <span>Subtotal ({totalItems} items)</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span>Tax</span>
                  <span>{formatPrice(totalPrice * 0.08)}</span>
                </div>

                <hr />

                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>{formatPrice(totalPrice * 1.08)}</span>
                </div>

                <Button className="w-full" size="lg">
                  Proceed to Checkout
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  Secure checkout powered by Stripe
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

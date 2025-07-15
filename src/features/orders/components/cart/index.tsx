"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/lib/utils";
import { ArrowLeft, ChevronLeft, ShoppingBag } from "lucide-react";
import Link from "next/link";
import GroupedCartItem from "./components/grouped-card-item";
import { useRouter } from "next/navigation";

export default function Cart() {
  const {
    items,
    clearCart,
    getTotalItems,
    getTotalPrice,
    getGroupedItems,
    getSelectedItems,
    getSelectedTotalItems,
    getSelectedTotalPrice,
    toggleAllSelection,
    selectAllItems,
    deselectAllItems,
    isAllSelected,
    _hasHydrated,
    clearSelectedItems,
  } = useCart();

  const router = useRouter();

  const groupedItems = getGroupedItems();
  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();
  const selectedItems = getSelectedItems();
  const selectedTotalItems = getSelectedTotalItems();
  const selectedTotalPrice = getSelectedTotalPrice();
  const allSelected = isAllSelected();

  const handleProceedToCheckout = () => {
    router.push("/orders/cart/checkout");
  };

  if (!_hasHydrated) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        <span className="ml-2">Loading cart...</span>
      </div>
    );
  }

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
          <Link href="/products">
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
    <div className="px-4 font-secondary">
      <div className="">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center justify-start ">
              <ChevronLeft
                className="cursor-pointer"
                onClick={() => router.back()}
              />
              <h1 className="text-lg font-bold text-gray-900 font-primary">
                My Cart
              </h1>
            </div>
            <p className="text-gray-500 mt-1 text-sm pl-2">
              {totalItems} {totalItems === 1 ? "item" : "items"} in your cart
              across {Object.keys(groupedItems).length}{" "}
              {Object.keys(groupedItems).length === 1 ? "product" : "products"}
            </p>
          </div>
          {/* <Link href="/products">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Continue Shopping
            </Button>
          </Link> */}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            {/* Selection Controls */}
            <div className="flex items-center justify-between mb-6 p-4 bg-white rounded-xl shadow">
              <div className="flex items-center space-x-3">
                <Checkbox
                  id="select-all"
                  checked={allSelected}
                  onCheckedChange={toggleAllSelection}
                />
                <label
                  htmlFor="select-all"
                  className="text-sm font-medium cursor-pointer"
                >
                  Select All ({totalItems} items)
                </label>
              </div>
              <div className="flex items-center space-x-2">
                {/* <Button
                  variant="ghost"
                  size="sm"
                  onClick={selectAllItems}
                  className="text-blue-600 hover:text-blue-700"
                >
                  Select All
                </Button> */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={deselectAllItems}
                  className="text-gray-600 hover:text-gray-700"
                >
                  Deselect All
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearCart}
                  className="text-red-500 hover:text-red-700"
                >
                  Clear Cart
                </Button>
              </div>
            </div>

            {/* Selected Items Summary */}
            {selectedItems.length > 0 && (
              <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-xl">
                <p className="text-sm text-blue-800">
                  <span className="font-medium">{selectedTotalItems}</span>{" "}
                  items selected for checkout • Total:{" "}
                  <span className="font-medium">
                    {formatPrice(selectedTotalPrice)}
                  </span>
                </p>
              </div>
            )}

            <div className="space-y-6">
              {Object.entries(groupedItems).map(([productId, productItems]) => (
                <GroupedCartItem
                  key={productId}
                  productId={productId}
                  items={productItems as any}
                  showSelection={true}
                />
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4 rounded-xl">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Order Summary</span>
                  {selectedItems.length > 0 && (
                    <span className="text-sm font-normal text-blue-600">
                      {selectedTotalItems} selected
                    </span>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedItems.length > 0 ? (
                  <>
                    {/* Selected Items Breakdown */}
                    <div className="space-y-2">
                      {Object.entries(groupedItems).map(
                        ([productId, productItems]: any) => {
                          const selectedProductItems = productItems.filter(
                            (item: any) =>
                              selectedItems.some(
                                (selectedItem) =>
                                  selectedItem.variationKey ===
                                  item.variationKey
                              )
                          );

                          if (selectedProductItems.length === 0) return null;

                          const product = selectedProductItems[0].product;
                          const productTotal = selectedProductItems.reduce(
                            (sum: any, item: any) =>
                              sum +
                              item.selectedVariation.price * item.quantity,
                            0
                          );
                          const productQuantity = selectedProductItems.reduce(
                            (sum: any, item: any) => sum + item.quantity,
                            0
                          );

                          return (
                            <div
                              key={productId}
                              className="flex justify-between text-sm"
                            >
                              <span className="truncate">
                                {product.commodityName} ({productQuantity}{" "}
                                items)
                              </span>
                              <span>{formatPrice(productTotal)}</span>
                            </div>
                          );
                        }
                      )}
                    </div>

                    <hr />

                    <div className="flex justify-between text-sm">
                      <span>Subtotal ({selectedTotalItems} items)</span>
                      <span>{formatPrice(selectedTotalPrice)}</span>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span>Shipping</span>
                      <span>N/A</span>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span>Tax</span>
                      <span>N/A</span>
                    </div>

                    <hr />

                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span>{formatPrice(selectedTotalPrice)}</span>
                    </div>

                    <Button
                      className="w-full"
                      size="lg"
                      onClick={handleProceedToCheckout}
                    >
                      Proceed to Checkout
                    </Button>
                  </>
                ) : (
                  <>
                    {/* No items selected */}
                    <div className="text-center py-8">
                      <p className="text-gray-500 mb-4">No items selected</p>
                      <p className="text-sm text-gray-400">
                        Select items from your cart to proceed to checkout
                      </p>
                    </div>
                    <Button className="w-full" size="lg" disabled>
                      Proceed to Checkout
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

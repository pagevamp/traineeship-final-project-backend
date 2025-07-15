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
import { Selectbox } from "@/components/ui/select-box";
import { useMemo, useState } from "react";
import CheckoutItems from "./components/checkout-items";
import { Badge } from "@/components/ui/badge";
import { useModal } from "@/hooks/useModal";
import AddressConfirmationModal from "./components/address-confirmation-modal";
import { useCreateOrder, useGetImporterDetails } from "../../hooks";
import { toast } from "sonner";

export default function CheckoutPage() {
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
    getGroupedSelectedItems,
  } = useCart();

  const { openModal } = useModal();

  const router = useRouter();

  const [customer, setCustomer] = useState("");

  const groupedItems = getGroupedItems();
  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();
  const selectedItems = getSelectedItems();
  const selectedTotalItems = getSelectedTotalItems();
  const selectedTotalPrice = getSelectedTotalPrice();
  const allSelected = isAllSelected();
  const groupedSelectedItems = getGroupedSelectedItems();

  const { data: importerDetails, isLoading: isImporterDetailsLoading } =
    useGetImporterDetails({ id: customer });

  const importerData = useMemo(
    () => importerDetails?.data?.data,
    [importerDetails]
  );

  function transformToOrderProducts(cartData: any) {
    // Group cart items by product ID
    const productGroups: any = {};

    cartData.forEach((item: any) => {
      const productId = item.product.id;

      // If product doesn't exist in groups, create it
      if (!productGroups[productId]) {
        productGroups[productId] = {
          product: {
            id: productId,
          },
          orderInventory: [],
        };
      }

      // Add the variation to the product's orderInventory
      productGroups[productId].orderInventory.push({
        productVariation: {
          id: item.selectedVariation.id,
        },
        quantity: item.quantity,
        amount: item.quantity * item.selectedVariation.price,
      });
    });

    // Convert grouped object to array
    const orderProducts = Object.values(productGroups);

    return {
      orderProducts,
    };
  }

  const { mutateAsync: handleCreateOrder, isPending: isCreateOrderPending } =
    useCreateOrder({
      onError: (error, variables, context) => {
        toast.error(error?.response?.data?.message || "Something went wrong");
      },
      onSuccess: (data) => {
        clearSelectedItems();
        toast.success("Order created successfully.");
        router.push(`/orders`);
      },
    });

  const handlePlaceOrder = async () => {
    const orderData = {
      importer: {
        id: "01980d77-3ced-7587-8a2a-d850bc8301b8",
      },
      netTermPeriod: 0,
      expetedDeliveryDate: "2025-07-25T09:43:52.852Z",
      billingAddress: [
        {
          locationName: "Billing Address",
          street1: "Billing Address 1",
          street2: "Billing Address 2",
          country: "Nepal",
          state: "Bagmati Province",
          city: "Kathmandu",
          zipCode: "44600",
          latitude: "27.7172",
          longitude: "85.3240",
        },
      ],
      shippingAddress: [
        {
          locationName: "Shipping Address",
          street1: "Shipping Address 1",
          street2: "Shipping Address 2",
          country: "Nepal",
          state: "Bagmati Province",
          city: "Kathmandu",
          zipCode: "44600",
          latitude: "27.7172",
          longitude: "85.3240",
        },
      ],
      orderProducts: transformToOrderProducts(selectedItems)?.orderProducts,
    };

    try {
      await handleCreateOrder(orderData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleContinue = () => {
    openModal({
      component: AddressConfirmationModal,
      props: {
        data: {
          billingAddress: {
            street1: "Thamel 1",
            street2: "Thamel 2",
            city: "Kathmandu",
            state: "Bagmati Province",
            country: "Nepal",
            zip: "44600",
          },
          shippingAddress: {
            street1: "Thamel 3",
            street2: "Thamel 4",
            city: "Kathmandu",
            state: "Bagmati Province",
            country: "Nepal",
            zip: "44600",
          },
        },
        handlePlaceOrder,
      },
      className: "max-w-4xl rounded-3xl shadow-2xl",
    });
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
                Checkout
              </h1>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            {/* Select customer */}
            <div className="mb-4 p-4 bg-white rounded-xl shadow space-y-2">
              <h2 className="text-sm font-medium text-gray-900">
                Select Customer
              </h2>
              <Selectbox
                options={[
                  {
                    label: "Stuti Upreti",
                    value: "01980d77-3ced-7587-8a2a-d850bc8301b8",
                  },
                ]}
                value={customer || ""}
                onChange={(selected) => setCustomer(selected.value)}
                placeholder="Select A Customer"
                emptyText="No data found."
                className="min-w-80 lg:min-w-96 bg-white h-12 p-4 shadow border-0"
              />
            </div>

            {isImporterDetailsLoading && (
              <div className="flex flex-col gap-2 items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                <span className="ml-2">Loading importer details...</span>
              </div>
            )}

            {importerData && (
              <>
                <Card className="mb-4 rounded-xl">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <h2 className="text-base font-medium">
                        Shipping Address
                      </h2>
                    </div>

                    <div className="space-y-1 text-sm">
                      <div className="font-medium">Sunil Shrees</div>
                      <div>+91 9843088216</div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">
                          Thamel, Kathmandu, Kathmandu, Bagmati Province
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="mb-4 rounded-xl">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <h2 className="text-base font-medium">Billing Address</h2>
                    </div>

                    <div className="space-y-1 text-sm">
                      <div className="font-medium">Sunil Shrees</div>
                      <div>+91 9843088216</div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">
                          Thamel, Kathmandu, Kathmandu, Bagmati Province
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}

            <div className="space-y-2">
              {Object.entries(groupedSelectedItems as any).map(
                ([productId, productItems]) => (
                  <CheckoutItems
                    key={productId}
                    productId={productId}
                    items={productItems as any}
                  />
                )
              )}
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
                      onClick={handleContinue}
                    >
                      Place Order
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
                      Place Order
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

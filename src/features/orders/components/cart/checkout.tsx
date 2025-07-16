"use client";

import { AnimatedLoader } from "@/components/loaders/animated-loader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Selectbox } from "@/components/ui/select-box";
import { useCart } from "@/hooks/useCart";
import { useModal } from "@/hooks/useModal";
import { formatPrice } from "@/lib/utils";
import _, { truncate } from "lodash";
import { ArrowLeft, ChevronLeft, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import {
  useCreateOrder,
  useGetAllImporters,
  useGetImporterDetails,
  useMultipleProductPrices,
} from "../../hooks";
import AddressConfirmationModal from "./components/address-confirmation-modal";
import CheckoutItems from "./components/checkout-items";

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

function updateOrderProductPrices(orderProduct: any, priceMap: any) {
  return orderProduct.map((productEntry: any) => {
    const productId = productEntry?.product?.id;
    const priceList = priceMap?.[productId];

    if (Array.isArray(priceList) && priceList.length > 0) {
      const priceMapLookup = priceList.reduce((lookup, item) => {
        lookup[item.productVariation.id] = item.price;
        return lookup;
      }, {});

      productEntry.orderInventory = productEntry.orderInventory.map(
        (inventoryItem: any) => {
          const variationId = inventoryItem.productVariation.id;
          const price = priceMapLookup[variationId];

          if (price !== undefined) {
            inventoryItem.amount = price;
          }

          return inventoryItem;
        }
      );
    }

    return productEntry;
  });
}

function updatedGroupedItemsFunction(cartData: any, priceMap: any) {
  const updatedCart: any = {};

  for (const productId in cartData) {
    const cartItems = cartData?.[productId];
    const priceList = priceMap?.[productId];

    updatedCart[productId] = cartItems.map((cartItem: any) => {
      if (Array.isArray(priceList)) {
        const variationId = cartItem.selectedVariation.id;
        const matchingPriceItem = priceList.find(
          (item) => item.productVariation.id === variationId
        );

        if (matchingPriceItem) {
          return {
            ...cartItem,
            selectedVariation: {
              ...cartItem.selectedVariation,
              price: matchingPriceItem.price,
            },
          };
        }
      }

      return cartItem;
    });
  }

  return updatedCart;
}

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

  const { data: importers, isLoading: isImportersLoading } = useGetAllImporters(
    {
      filters: {
        sortParams: { sortParam: "createdAt", sortOrder: "DESC" },
      },
      pagination: {
        page: 1,
        recordsPerPage: 100,
      },
    }
  );

  const allImporters = useMemo(() => importers?.data?.data?.items, [importers]);

  const { data: importerDetails, isLoading: isImporterDetailsLoading } =
    useGetImporterDetails({ id: customer });

  const importerData = useMemo(
    () => importerDetails?.data?.data,
    [importerDetails]
  );

  const orderProducts: any = useMemo(() => {
    return transformToOrderProducts(selectedItems)?.orderProducts;
  }, [selectedItems]);

  // get the product prices for the order products for importer

  const productPrices = useMultipleProductPrices(
    orderProducts,
    importerData?.id
  );

  const priceMap = useMemo(() => {
    if (!!(orderProducts.length === 0) || !importerData?.id) {
      return null;
    }
    const map: Record<string, any> = {};
    productPrices.forEach((query: any, index) => {
      const productId = orderProducts[index]?.product?.id;
      if (productId) {
        map[productId] =
          query?.data?.data?.data?.items?.[0]?.importerProductPrice ?? null;
      }
    });

    return map;
  }, [orderProducts, importerData?.id, productPrices]);

  const updatedOrderProducts = useMemo(() => {
    return updateOrderProductPrices(orderProducts, priceMap);
  }, [orderProducts, priceMap]);

  const updatedGroupedItems = useMemo(() => {
    return updatedGroupedItemsFunction(groupedItems, priceMap);
  }, [groupedItems, priceMap]);

  const updatedGroupedSelectedItems = useMemo(() => {
    return updatedGroupedItemsFunction(groupedSelectedItems, priceMap);
  }, [groupedSelectedItems, priceMap]);

  const totalAmount = useMemo(() => {
    return Object.entries(updatedGroupedSelectedItems).reduce(
      (acc: any, [productId, productItems]: any) => {
        return (
          acc +
          productItems.reduce((sum: any, item: any) => {
            return sum + item.selectedVariation.price * item.quantity;
          }, 0)
        );
      },
      0
    );
  }, [updatedGroupedSelectedItems]);

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
        id: customer,
      },
      netTermPeriod: importerData?.netTerm?.days,
      orderProducts: updatedOrderProducts,
    };

    try {
      await handleCreateOrder(orderData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleContinue = () => {
    if (!customer) {
      toast.info("Please select a customer to continue");
      return;
    }

    openModal({
      component: AddressConfirmationModal,
      props: {
        data: {
          billingAddress: importerData?.billingAddress?.[0],
          shippingAddress: importerData?.shippingAddress?.[0],
        },
        handlePlaceOrder,
      },
      className: "max-w-4xl rounded-3xl shadow-2xl",
    });
  };

  // Define the desired field order
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fields = ["street1", "city", "state", "country", "zipCode"];

  const shippingAddress = useMemo(() => {
    if (!importerData?.shippingAddress) return "N/A";
    return fields
      .map((field) => importerData?.shippingAddress?.[0]?.[field])
      .filter((value) => value && value.trim() !== "")
      .join(", ");
  }, [fields, importerData?.shippingAddress]);

  const billingAddress = useMemo(() => {
    if (!importerData?.billingAddress) return "N/A";
    return fields
      .map((field) => importerData?.billingAddress?.[0]?.[field])
      .filter((value) => value && value.trim() !== "")
      .join(", ");
  }, [fields, importerData?.billingAddress]);

  if (!_hasHydrated) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
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
      {isCreateOrderPending && (
        <div className="fixed inset-0 w-screen h-screen bg-black/50 z-[1000] overflow-hidden">
          <div className="flex items-center justify-center h-full">
            <AnimatedLoader variant={"truck"} size="sm" />
          </div>
        </div>
      )}
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
                options={allImporters?.map((importer: any) => ({
                  label: truncate(importer.name, { length: 40 }),
                  value: importer.id,
                }))}
                value={customer || ""}
                onChange={(selected) => setCustomer(selected.value)}
                placeholder="Select A Customer"
                emptyText="No data found."
                className="min-w-80 lg:min-w-96 bg-white h-12 p-4 shadow border-0"
                loading={isImportersLoading}
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
                      <div className="font-medium">{importerData?.name}</div>
                      <div>
                        {importerData?.phoneNumber
                          ? `${importerData?.countryCode}-${importerData?.phoneNumber}`
                          : "N/A"}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">
                          {shippingAddress}
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
                      <div className="font-medium">{importerData?.name}</div>
                      <div>
                        {importerData?.phoneNumber
                          ? `${importerData?.countryCode}-${importerData?.phoneNumber}`
                          : "N/A"}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">
                          {billingAddress}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}

            <div className="space-y-2">
              {Object.entries(updatedGroupedSelectedItems as any).map(
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
                      {Object.entries(updatedGroupedItems).map(
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
                      <span>{formatPrice(totalAmount)}</span>
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
                      <span>{formatPrice(totalAmount)}</span>
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

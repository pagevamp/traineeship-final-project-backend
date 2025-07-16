"use client";

import React, { useMemo } from "react";
import OrderHeading from "./OrderHeading";
import OrderLead from "./OrderLead";
import OrderCustomer from "./OrderCustomer";
import OrderProducts from "./OrderProducts";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useGetOrderById } from "../hooks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Package } from "lucide-react";
import Image from "next/image";
import { AlertTriangle } from "lucide-react";

const OrderDetails = ({ id }: { id: string }) => {
  const router = useRouter();

  const { data: orderDetails, isLoading: isLoadingOrderDetails } =
    useGetOrderById({ id });

  const orderData = useMemo(() => orderDetails?.data?.data, [orderDetails]);

  console.log(orderData, "orderData");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-amber-500 hover:bg-amber-500";
      case "PROCESSING":
        return "bg-blue-500 hover:bg-blue-500";
      case "SHIPPED":
        return "bg-purple-500 hover:bg-purple-500";
      case "DELIVERED":
        return "bg-green-500 hover:bg-green-500";
      default:
        return "bg-gray-500 hover:bg-gray-500";
    }
  };

  const getStockStatus = (inStock: number, reOrderPoint: number) => {
    if (inStock <= reOrderPoint) {
      return { color: "bg-red-100 text-red-800", text: "Low Stock" };
    } else if (inStock <= reOrderPoint * 2) {
      return { color: "bg-yellow-100 text-yellow-800", text: "Medium" };
    } else {
      return { color: "bg-green-100 text-green-800", text: "In Stock" };
    }
  };

  const totalQuantity = orderData?.orderProducts?.reduce(
    (sum: number, product: any) =>
      sum +
      product.orderInventory.reduce(
        (invSum: number, inv: any) => invSum + inv.quantity,
        0
      ),
    0
  );

  const subtotal = orderData?.orderProducts?.reduce(
    (sum: number, product: any) =>
      sum +
      product.orderInventory.reduce(
        (invSum: number, inv: any) => invSum + inv.amount,
        0
      ),
    0
  );

  const shippingCost = 150;
  const taxRate = 0.1;
  const taxAmount = subtotal * taxRate;
  const totalAmount = subtotal + shippingCost + taxAmount;

  const addressFields = ["street1", "city", "state", "country", "zipCode"];

  const fieldLabels: any = {
    street1: "Street 1 Address",
    city: "City",
    state: "State",
    country: "Country",
    zipCode: "Zip Code",
  };

  const billing = orderData?.importer?.billingAddress?.[0] || {};
  const shipping = orderData?.importer?.shippingAddress?.[0] || {};

  if (isLoadingOrderDetails) {
    return (
      <div className="flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }
  return (
    <div className="font-secondary">
      <div className="flex items-center justify-start text-base mb-3">
        <ChevronLeft className="cursor-pointer" onClick={() => router.back()} />
        <span className="font-primary font-bold">Order Details</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-8 gap-4  relative">
        {/* Left Column - Order Info & Details */}
        <div className="lg:col-span-5 space-y-4 sticky top-0">
          {/* Order Status & Info Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-700">
                  Order Status:
                </span>
                <Badge
                  className={`${getStatusColor(
                    orderData.latestStatus.status
                  )} text-white px-3 py-1`}
                >
                  {orderData.latestStatus.status}
                </Badge>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-700">
                  Comments:
                </span>
                <span className="text-sm text-gray-600">
                  {orderData.additionNote || "No additional notes"}
                </span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-700">
                  Tracking ID:
                </span>
                <span className="text-sm text-gray-600">
                  {orderData.trackingId ?? "N/A"}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-700">
                  Delivery Option:
                </span>
                <span className="text-sm text-gray-600">
                  {orderData.deliveryOption ?? "N/A"}
                </span>
              </div>
            </div>
          </div>

          {/* Lead Details */}
          <Card className="shadow-sm bg-white/80 backdrop-blur-sm border border-white/20">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-gray-900">
                Lead details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-purple-50/50 rounded-lg p-4 border border-purple-100">
                <div className="flex items-center gap-2 text-gray-600">
                  <AlertTriangle className="h-4 w-4" />
                  <span className="text-sm">No data found.</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Commission Detail */}
          {/* <Card className="shadow-sm bg-white/80 backdrop-blur-sm border border-white/20">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-gray-900">
                Commission detail
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-purple-50/50 rounded-lg p-4 border border-purple-100">
                <div className="flex items-center gap-2 text-gray-600">
                  <AlertTriangle className="h-4 w-4" />
                  <span className="text-sm">No data found.</span>
                </div>
              </div>
            </CardContent>
          </Card> */}

          {/* Customer Details */}
          <Card className="shadow-sm bg-white/80 backdrop-blur-sm border border-white/20">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-gray-900">
                Customer details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Basic Information */}
              <div>
                <h4 className="font-medium text-gray-900 mb-4">
                  Basic Information
                </h4>
                <div className="bg-purple-50/50 rounded-lg p-4 border border-purple-100">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <Badge
                          variant="secondary"
                          className="bg-orange-100 text-orange-800"
                        >
                          IMPORTER
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-gray-600">
                          Contact:
                        </span>
                        <span className="text-sm text-gray-900">
                          {orderData?.importer?.phoneNumber
                            ? `${orderData?.importer?.countryCode} -${orderData?.importer?.phoneNumber}`
                            : "N/A"}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-gray-600">
                          Name:
                        </span>
                        <span className="text-sm text-gray-900">
                          {orderData?.importer?.name}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-gray-600">
                          Email:
                        </span>
                        <span className="text-sm text-gray-900">
                          {orderData?.importer?.email}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Address Information */}
              <div>
                <h4 className="font-medium text-gray-900 mb-4">
                  Address Information
                </h4>
                <div className="bg-purple-50/50 rounded-lg p-4 border border-purple-100">
                  <div className="grid grid-cols-3 gap-6 border-b pb-2 text-sm font-primary">
                    <div className="">Address</div>
                    <div className="">Billing Address</div>
                    <div className="">Shipping Address</div>
                  </div>
                  {addressFields.map((field) => (
                    <div
                      key={field}
                      className="grid grid-cols-3 gap-6 border-b py-2 text-sm"
                    >
                      <div className="font-extralight">
                        {fieldLabels[field]}
                      </div>
                      <div>{billing?.[field] || "-"}</div>
                      <div>{shipping?.[field] || "-"}</div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Product Details List View */}
        <div className="lg:col-span-3 space-y-6">
          <Card className="shadow-sm bg-white/90 backdrop-blur-sm border border-white/30">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Package className="h-5 w-5" />
                Product Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Products List */}
              <div className="space-y-4">
                {orderData?.orderProducts?.map(
                  (orderProduct: any, index: number) => (
                    <div key={orderProduct.id}>
                      <div
                        key={index}
                        className="p-4 bg-purple-50/50 rounded-lg border border-purple-100 hover:bg-purple-50/70 transition-colors"
                      >
                        {/* Top Section - Product Info */}
                        <div className="flex items-start gap-3 mb-3">
                          {/* Product Image */}
                          <div className="flex-shrink-0">
                            <Image
                              src={
                                orderProduct.product.productImageUrl ||
                                "/placeholder.svg"
                              }
                              alt={orderProduct.product.commodityName}
                              width={60}
                              height={60}
                              className="rounded-lg object-cover aspect-square border border-purple-200"
                            />
                          </div>

                          {/* Product Name and Details */}
                          <div className="flex-1">
                            <h4 className="text-sm font-semibold text-gray-900 mb-1">
                              {orderProduct.product.commodityName}
                            </h4>
                            <p className="text-xs text-gray-600 mb-2">
                              HS Code: {orderProduct?.product?.hsCode}
                            </p>
                          </div>
                        </div>

                        {/* Bottom Section - Variation Details */}
                        <div className="grid grid-cols-1 gap-2">
                          {orderProduct?.orderInventory?.map(
                            (inventory: any, invIndex: number) => (
                              <div
                                className="bg-white rounded-lg p-3 border border-purple-200"
                                key={invIndex}
                              >
                                <div className="grid grid-cols-1 gap-3 text-xs">
                                  <div className="space-y-1">
                                    <div className="flex justify-between">
                                      <span className="text-gray-600">
                                        Qty:
                                      </span>
                                      <span className="font-semibold text-gray-900">
                                        {inventory.quantity}
                                      </span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-gray-600">
                                        Price:
                                      </span>
                                      <span className="font-semibold text-purple-600">
                                        ${inventory.amount.toFixed(2)}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <Separator className="my-2" />
                                <div className="flex justify-between items-center">
                                  <span className="text-sm font-semibold text-gray-700">
                                    Subtotal:
                                  </span>
                                  <span className="text-lg font-bold text-green-600">
                                    $
                                    {(
                                      inventory.quantity * inventory.amount
                                    ).toFixed(2)}
                                  </span>
                                </div>
                              </div>
                            )
                          )}
                          <div className="flex justify-between items-center px-2">
                            <span className="text-sm font-semibold text-gray-700">
                              Total:
                            </span>
                            <span className="text-lg font-bold text-green-600">
                              $
                              {orderProduct?.orderInventory
                                ?.reduce(
                                  (sum: number, inventory: any) =>
                                    sum + inventory.quantity * inventory.amount,
                                  0
                                )
                                .toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>

                      {index < orderData.orderProducts.length - 1 && (
                        <Separator className="my-4" />
                      )}
                    </div>
                  )
                )}
              </div>

              {/* Order Summary */}
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4 border border-purple-200 mt-6">
                <h4 className="font-semibold text-gray-900 mb-4">
                  Order Summary
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-gray-600">Order ID:</span>
                    <span className="text-gray-900 font-mono">
                      {orderData.orderId}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-gray-600">
                      Total Items:
                    </span>
                    <span className="text-gray-900 font-semibold">
                      {totalQuantity}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-gray-600">Subtotal:</span>
                    <span className="text-gray-900">
                      {" "}
                      ${orderData?.totalAmount?.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-gray-600">Shipping:</span>
                    <span className="text-gray-900">N/A</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-gray-600">Tax:</span>
                    <span className="text-gray-900">N/A</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-lg font-bold text-gray-900">
                      Total Amount:
                    </span>
                    <span className="text-lg font-bold text-green-600">
                      ${orderData?.totalAmount?.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 font-semibold">
                Purchase Order
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* <div className="flex flex-col rounded-3xl p-4 bg-white">
        <OrderHeading />
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="grid grid-cols-1">
            <OrderLead />
            <OrderCustomer />
          </div>
          <OrderProducts />
        </div>
      </div> */}
    </div>
  );
};

export default OrderDetails;

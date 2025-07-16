"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ChevronLeft,
  Settings,
  Clock,
  Mail,
  Phone,
  MapPin,
  DollarSign,
  ShoppingCart,
  Building2,
  BadgeDollarSign,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { customerData } from "./constant";
import { useRouter } from "next/navigation";
import CustomerTeamTable from "./CustomerTeamTable";
import OrdersTable from "./OrdersTable";
import { ImporterPayload } from "../types";

export default function ImporterDetailPage({
  importerDetail,
}: {
  importerDetail: any;
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [orderDetailsEnabled, setOrderDetailsEnabled] = useState(true);
  const [addressType, setAddressType] = useState<"billing" | "shipping">(
    "billing"
  );
  const router = useRouter();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <>
      <div className="bg-white rounded-3xl">
        {/* Header */}
        <div
          className={cn(
            "bg-white/80 backdrop-blur-md border-b border-gray-100 rounded-t-3xl transition-all duration-500",
            isLoaded ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
          )}
        >
          <div className="px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex gap-4">
                <ChevronLeft
                  className="h-6 w-6 mt-1 cursor-pointer"
                  onClick={() => router.back()}
                />
                <div>
                  <h1 className="text-lg font-bold text-gray-900 font-primary">
                    Importer Detail Page
                  </h1>
                  {/* <p className="text-sm text-gray-500 font-secondary font-[300]">
                    Last Active: {customerData.lastActive}
                  </p> */}
                </div>
              </div>
              {/* <Button className="hover:bg-primary hover:opacity-90 font-primary transition-all duration-200 shadow-lg hover:shadow-xl">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button> */}
            </div>
          </div>
        </div>

        <div className="p-4">
          {/* Customer Info and Address Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
            {/* Customer Info Card */}
            <Card
              className={cn(
                "group hover:shadow-lg transition-all duration-300 border shadow",
                isLoaded
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              )}
              style={{ transitionDelay: "100ms" }}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Avatar className="h-12 w-12 ring-4 ring-orange-100 transition-all duration-300 group-hover:ring-orange-100">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback className="bg-gradient-to-br capitalize from-orange-400 to-orange-600 text-white text-lg font-semibold">
                      {importerDetail?.user?.firstName
                        ?.split(" ")
                        ?.map((n: any) => n[0])
                        ?.join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h2 className="text-base font-semibold text-gray-900 font-secondary w-[80%] break-all">
                        {importerDetail?.user?.firstName}{" "}
                        {importerDetail?.user?.lastName}
                      </h2>
                      <Badge
                        variant="secondary"
                        className="bg-purple-100 text-purple-700 font-secondary hover:bg-emerald-200 transition-colors"
                      >
                        {importerDetail?.user?.status}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-1 text-xs text-gray-500 mb-4 font-secondary font-[300]">
                      <Clock className="h-3 w-3" />
                      <span>Net Term {importerDetail?.netTerm?.days} Days</span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-3 text-sm">
                        <Mail className="h-4 w-4 text-gray-600" />
                        <span className="text-gray-600 font-primary">
                          Email
                        </span>
                      </div>
                      <p className="text-gray-900 font-[300] font-secondary text-sm bg-gray-50 p-2 rounded-md">
                        {importerDetail?.user?.email}
                      </p>

                      <div className="flex items-center gap-3 text-sm">
                        <Phone className="h-4 w-4 text-gray-600" />
                        <span className="text-gray-600 font-primary">
                          Contact
                        </span>
                      </div>
                      <p className="text-gray-900 font-secondary font-[300] text-sm bg-gray-50 p-2 rounded-md">
                        {importerDetail?.user?.countryCode}{" "}
                        {importerDetail?.user?.phoneNumber}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Address Card with Toggle */}
            <div>
              <Card
                className={cn(
                  "hover:shadow-lg transition-all duration-300 border shadow",
                  isLoaded
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                )}
                style={{ transitionDelay: "200ms" }}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center flex-wrap gap-2 justify-between w-full">
                    <CardTitle className="flex items-center gap-2 text-lg font-secondary">
                      <MapPin className="h-5 w-5 text-orange-600" />
                      {addressType === "billing"
                        ? "Billing Address"
                        : "Shipping Address"}
                    </CardTitle>
                    <div className="flex gap-2 mb-2">
                      <Button
                        variant={
                          addressType === "billing" ? "default" : "outline"
                        }
                        onClick={() => setAddressType("billing")}
                        size="sm"
                        className="hover:bg-primary hover:text-white"
                      >
                        Billing Address
                      </Button>
                      <Button
                        variant={
                          addressType === "shipping" ? "default" : "outline"
                        }
                        onClick={() => setAddressType("shipping")}
                        size="sm"
                        className="hover:bg-primary hover:text-white"
                      >
                        Shipping Address
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs text-gray-500 font-secondary uppercase tracking-wide">
                        Street 1 Address
                      </label>
                      <p className="text-gray-900 text-sm font-secondary break-all">
                        {addressType === "billing"
                          ? importerDetail?.billingAddress?.[0]?.street1
                          : importerDetail?.shippingAddress?.[0]?.street1}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-gray-500 font-secondary uppercase tracking-wide">
                        Street 2 Address
                      </label>
                      <p className="text-gray-900 text-sm font-secondary break-all">
                        {addressType === "billing"
                          ? importerDetail?.billingAddress?.[0]?.street2 ||
                            "N/A"
                          : importerDetail?.shippingAddress?.[0]?.street2 ||
                            "N/A"}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-secondary text-gray-500 uppercase tracking-wide">
                        City
                      </label>
                      <p className="text-gray-900 font-secondary text-sm break-all">
                        {addressType === "billing"
                          ? importerDetail?.billingAddress?.[0]?.city
                          : importerDetail?.shippingAddress?.[0]?.city}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-secondary text-gray-500 uppercase tracking-wide">
                        State
                      </label>
                      <p className="text-gray-900 font-secondary text-sm break-all">
                        {addressType === "billing"
                          ? importerDetail?.billingAddress?.[0]?.state
                          : importerDetail?.shippingAddress?.[0]?.state}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-secondary text-gray-500 uppercase tracking-wide">
                        Country
                      </label>
                      <p className="text-gray-900 font-secondary text-sm break-all">
                        {addressType === "billing"
                          ? importerDetail?.billingAddress?.[0]?.country
                          : importerDetail?.shippingAddress?.[0]?.country}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-secondary text-gray-500 uppercase tracking-wide">
                        Zip Code
                      </label>
                      <p className="text-gray-900 font-secondary text-sm break-all">
                        {addressType === "billing"
                          ? importerDetail?.billingAddress?.[0]?.zipCode
                          : importerDetail?.shippingAddress?.[0]?.zipCode}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div>
            <Card
              className={cn(
                "mb-4 hover:shadow-lg transition-all duration-300 border shadow",
                isLoaded
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              )}
              style={{ transitionDelay: "80ms" }}
            >
              <CardContent className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-4 text-sm">
                      <Building2 className="h-4 w-4 text-gray-600" />
                      <span className="font-semibold text-gray-700 whitespace-nowrap">
                        Organization Name:
                      </span>
                      <span className="text-gray-900 break-all">
                        {importerDetail?.name || "N/A"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-gray-600" />
                      <span className="font-semibold text-gray-700">
                        Email:
                      </span>
                      <span className="text-gray-900 break-all">
                        {importerDetail?.user?.email || "N/A"}
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-4 text-sm">
                      <Phone className="h-4 w-4 text-gray-600" />
                      <span className="font-semibold text-gray-700">
                        Contact:
                      </span>
                      <span className="text-gray-900 break-all">
                        {importerDetail?.countryCode || ""}{" "}
                        {importerDetail?.phoneNumber || "N/A"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <BadgeDollarSign className="h-4 w-4 text-gray-600" />
                      <span className="font-semibold text-gray-700 whitespace-nowrap">
                        Tax ID:
                      </span>
                      <span className="text-gray-900 break-all">
                        {importerDetail?.taxId || "N/A"}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Amount and Order Details Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Amount Card */}
            {/* <Card
              className={cn(
                "hover:shadow-lg transition-all duration-300 border shadow",
                isLoaded
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              )}
              style={{ transitionDelay: "300ms" }}
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-lg font-secondary">
                    <DollarSign className="h-5 w-5 text-orange-600" />
                    Amount
                  </CardTitle>
                  <Select defaultValue="all-time">
                    <SelectTrigger className="w-32 h-8 text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="font-secondary font-[300] text-xs">
                      <SelectItem value="all-time">All time</SelectItem>
                      <SelectItem value="this-month">This month</SelectItem>
                      <SelectItem value="last-month">Last month</SelectItem>
                      <SelectItem value="this-year">This year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                    <p className="text-sm font-secondary text-blue-600 uppercase tracking-wide mb-1">
                      Total
                    </p>
                    <p className="text-base font-secondary font-bold text-blue-700">
                      {customerData.amounts.total}
                    </p>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg">
                    <p className="text-sm font-secondary text-amber-600 uppercase tracking-wide mb-1">
                      Pending
                    </p>
                    <p className="text-base font-secondary font-bold text-amber-700">
                      {customerData.amounts.pending}
                    </p>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg">
                    <p className="text-sm font-secondary text-emerald-600 uppercase tracking-wide mb-1">
                      Paid
                    </p>
                    <p className="text-base font-secondary font-bold text-emerald-700">
                      {customerData.amounts.paid}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card> */}

            {/* Order Details Card */}
            {/* <Card
              className={cn(
                "hover:shadow-lg transition-all duration-300 border shadow",
                isLoaded
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              )}
              style={{ transitionDelay: "400ms" }}
            >
              <CardHeader className="pb-4">
                <div className="flex items-center flex-wrap gap-2 justify-between">
                  <div className="flex items-center gap-3">
                    <CardTitle className="flex items-center gap-2 text-lg font-secondary">
                      <ShoppingCart className="h-5 w-5 text-orange-600" />
                      Order details
                    </CardTitle>
                    <Switch
                      checked={orderDetailsEnabled}
                      onCheckedChange={setOrderDetailsEnabled}
                      className="data-[state=checked]:bg-emerald-600"
                    />
                  </div>
                  <Select defaultValue="all-time">
                    <SelectTrigger className="w-32 h-8 text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="font-secondary font-[300] text-xs">
                      <SelectItem value="all-time">All time</SelectItem>
                      <SelectItem value="this-month">This month</SelectItem>
                      <SelectItem value="last-month">Last month</SelectItem>
                      <SelectItem value="this-year">This year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div
                  className={cn(
                    "grid grid-cols-1 sm:grid-cols-4 gap-4 transition-all duration-300"
                  )}
                >
                  <div className="text-center p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg">
                    <p className="text-xs font-secondary text-gray-600 uppercase tracking-wide mb-1">
                      All Orders
                    </p>
                    <p className="text-base font-bold text-gray-700">
                      {customerData.orders.all}
                    </p>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg">
                    <p className="text-xs font-medium text-emerald-600 uppercase tracking-wide mb-1 break-all">
                      Completed
                    </p>
                    <p className="text-base font-bold text-emerald-700">
                      {customerData.orders.completed}
                    </p>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                    <p className="text-xs font-medium text-blue-600 uppercase tracking-wide mb-1 break-all">
                      Processing
                    </p>
                    <p className="text-base font-bold text-blue-700">
                      {customerData.orders.processing}
                    </p>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-red-50 to-red-100 rounded-lg">
                    <p className="text-xs font-medium text-red-600 uppercase tracking-wide mb-1 break-all">
                      Cancelled
                    </p>
                    <p className="text-base font-bold text-red-700">
                      {customerData.orders.cancelled}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card> */}
          </div>
        </div>
      </div>
      {/* <CustomerTeamTable /> */}
      {/* <OrdersTable /> */}
    </>
  );
}

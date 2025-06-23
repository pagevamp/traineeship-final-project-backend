import React from "react";
import OrderHeading from "./OrderHeading";
import OrderLead from "./OrderLead";
import OrderCustomer from "./OrderCustomer";
import OrderProducts from "./OrderProducts";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

const OrderId = () => {
  return (
    <div>
      <div className="flex items-center justify-start mb-2 text-[16px]">
        <ChevronLeft />
        <span className="font-secondary text-[16px] md:text-[18px] font-bold my-1">
          Order Details
        </span>
      </div>
      <div className="flex flex-col bg-[#ffffff] rounded-3xl p-4">
        <OrderHeading />
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="grid grid-cols-1">
            <OrderLead />
            <OrderCustomer />
          </div>
          <OrderProducts />
        </div>
      </div>
    </div>
  );
};

export default OrderId;

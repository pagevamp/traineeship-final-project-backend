"use client";
import React from "react";
import ShipmentAdd from "./ShipmentAdd";
import ShipmentPickup from "./ShipmentPickup";
import ShipmentDetail from "./ShipmentDetails";
import ShipmentItemDetails from "./ShipmentItemDetails";
import { Button } from "@/components/ui/button";

const ShipmentCreation = () => {
  return (
    <div className="flex flex-col gap-4 pb-10">
      <ShipmentAdd />
      <ShipmentDetail />
      <ShipmentPickup />
      <ShipmentItemDetails />
      <div className="flex items-center justify-center w-full">
        <Button className="bg-gradient-to-r from-[#FF6502] to-[#E3802A] font-primary font-light text-white h-[40px] 2xl:h-[52px] w-full lg:w-[190px] 2xl:w-[200px] text-[12px] 2xl:text-[14px]">
          Submit Shipment
        </Button>
      </div>
    </div>
  );
};

export default ShipmentCreation;

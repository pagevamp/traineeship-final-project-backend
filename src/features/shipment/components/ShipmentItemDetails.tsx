import React from "react";
import ShipmentDocuments from "./ShipmentDocuments";
import { shipmentItemDetails } from "../constant";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import ShipmentSelection from "./ShipmentSelection";

const ShipmentItemDetails = () => {
  return (
    <div className="flex flex-col gap-1 py-2">
      <div className="flex flex-row justify-between items-center px-6">
        <span className="font-primary text-black font-bold text-[16px]">
          Item Details
        </span>

        <Button
          variant="outline"
          className="flex items-center gap-2 bg-white text-primary text-[13px] font-medium border border-primary rounded-[37px] px-4"
        >
          Add
          <Image src="/plus.svg" alt="plus" width={12} height={12} />
        </Button>
      </div>

      <div className="rounded-[25px] bg-white w-full h-full flex-col items-center px-6 py-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-6 w-full">
          {shipmentItemDetails.map(({ label, value }, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row sm:items-center gap-1"
            >
              <span className="font-primary text-[14px] md:text-[15px] text-[#404040] font-medium">
                {label}
              </span>
              <span className="font-secondary text-[13px] md:text-[14px] text-[#404040] font-light">
                {value}
              </span>
            </div>
          ))}
        </div>

        <div className="w-full mt-8">
          <ShipmentSelection />
        </div>

        <div className="w-full mt-4">
          <ShipmentDocuments />
        </div>
      </div>
    </div>
  );
};

export default ShipmentItemDetails;

import React from "react";
import ShipmentDocuments from "./ShipmentDocuments";
import { shipmentItemDetails } from "../constant";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import ShipmentSelection from "./ShipmentSelection";
import { useModalContext } from "@/providers/modal-context";
import ShipmentModal from "./ShipmentModal";

const ShipmentItemDetails = () => {
  const { openModal } = useModalContext();
  const handleCreateClick = () => {
    openModal({
      component: ShipmentModal,
      className: "h-fit bg-white max-w-[98%] sm:max-w-[50%] rounded-[39px]",
    });
  };

  return (
    <div className="flex flex-col gap-1 py-2">
      <div className="flex flex-row justify-between items-center px-6">
        <span className="font-primary text-black text-[16px] font-normal">
          Item Details
        </span>

        <Button
          variant="outline"
          className="flex items-center gap-3 bg-white text-primary text-[13px] font-secondary font-normal border border-primary rounded-[37px] p-2"
          onClick={handleCreateClick}
        >
          Add
          <Image src="/plus.svg" alt="plus" width={24} height={24} />
        </Button>
      </div>

      <div className="rounded-[25px] bg-white w-full h-full flex-col items-center pl-8 pr-16 py-6">
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

        <div className="w-full mt-4">
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

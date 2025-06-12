import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { documentDetails } from "../constant";
import { useModalContext } from "@/providers/modal-context";
import ShipmentDocumentModal from "./ShipmentDocumentModal";

const ShipmentDocuments = () => {
  const { openModal } = useModalContext();

  const handleCreateClick = () => {
    openModal({
      component: ShipmentDocumentModal,
      className: "h-fit bg-white max-w-[98%] sm:max-w-[50%] rounded-[39px]",
    });
  };
  return (
    <div className="w-full bg-white rounded-[25px] flex flex-col gap-4">
      <div className="flex flex-row justify-between items-center w-full">
        <span className="font-primary text-black font-normal text-[16px]">
          Documents
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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 w-full">
        {documentDetails.map((item) => (
          <div
            key={item.id}
            className="w-full h-[48px] border border-[#C6C6C6] rounded-lg flex items-center justify-between px-4"
          >
            <span className="font-primary text-[14px] text-[#A0A0A0]">
              {item.title}
              {item.required && <span className="text-red-500 ml-1">*</span>}
            </span>
            <Image
              src="/uploadgrey.svg"
              alt="upload icon"
              width={20}
              height={20}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShipmentDocuments;

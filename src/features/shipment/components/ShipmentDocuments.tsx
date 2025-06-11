import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { documentDetails } from "../constant";

const ShipmentDocuments = () => {
  return (
    <div className="w-full bg-white rounded-[25px] md:px-[49px] py-6 flex flex-col gap-6">
      <div className="flex flex-row justify-between items-center w-full">
        <span className="font-primary text-black font-bold text-[16px]">
          Documents
        </span>

        <Button
          variant="outline"
          className="flex items-center gap-2 bg-white text-primary text-[13px] font-medium border border-primary rounded-[37px] px-4"
        >
          Add
          <Image src="/plus.svg" alt="plus" width={18} height={18} />
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
        {documentDetails.map((item) => (
          <div
            key={item.id}
            className="w-full h-[48px] border border-[#C6C6C6] rounded-lg flex items-center justify-between px-4"
          >
            <span className="font-primary text-[14px] text-[#A0A0A0]">
              {item.title}
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

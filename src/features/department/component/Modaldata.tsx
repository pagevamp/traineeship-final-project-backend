import React from "react";
import { Input } from "@/components/ui/input";

const ModalData = () => {
  return (
    <div className="relative p-12">
      <span className="font-primary text-[20px] text-[#111D35] block">
        Create Department
      </span>

      <div className="flex gap-[26px] mt-[28px]">
        <div className="flex flex-col flex-1">
          <Input
            type="text"
            labelName="Department Name"
            placeholder="Enter Department Name"
            className="w-full h-[40px] px-3 rounded border border-[#ccc] text-[14px] bg-white"
          />
        </div>
        <div className="flex flex-col flex-1">
          <Input
            type="text"
            labelName="Contact Person"
            placeholder="Enter Contact Person Name"
            className="w-full h-[40px] px-3 text-muted-foreground rounded border border-[#ccc] text-[14px] bg-white"
          />
        </div>
      </div>

      <div className="flex gap-[26px] mt-[20px]">
        <div className="flex flex-col flex-1">
          <label className="mb-1 text-[14px] font-medium text-[#111D35]">
            Email
          </label>
          <Input
            type="email"
            placeholder="Enter Email"
            className="w-full h-[40px] px-3 rounded border border-[#ccc] text-[14px] bg-white"
          />
        </div>
        <div className="flex flex-col flex-1">
          <label className="mb-1 text-[14px] font-medium text-[#111D35]">
            Phone Number
          </label>
          <Input
            type="tel"
            placeholder="+91"
            className="w-full h-[40px] px-3 rounded border border-[#ccc] text-[14px] bg-white"
          />
        </div>
      </div>

      <div className="flex justify-center mt-[28px]">
        <button
          className="w-[191px] h-[40px] rounded text-white font-medium text-[14px]"
          style={{
            background: "linear-gradient(90deg, #E06518 0%, #E3802A 100%)",
          }}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default ModalData;

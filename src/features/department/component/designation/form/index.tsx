import React from "react";
import { Input } from "@/components/ui/input";

const Index = () => {
  return (
    <div className="relative p-6">
      <span className="font-primary text-[20px] text-[#111D35] block">
        Create Designation
      </span>

      <div className="flex gap-[26px] mt-[28px]">
        <div className="flex flex-col flex-1">
          <Input
            type="text"
            labelName="Designation Name"
            placeholder="Enter Designation Name"
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
          Create
        </button>
      </div>
    </div>
  );
};

export default Index;

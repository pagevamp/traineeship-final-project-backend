"use client";

import React from "react";
import { details } from "../constant";

const DepartmentInfoCard = () => {
  return (
    <div className="w-full h-[165px] bg-[#ffffff] rounded-[25px] pl-[24px] py-[20px] flex flex-col font-primary">
      <h2 className="text-[20px] text-[#404040] mb-4">Department Details</h2>
      <div className="grid grid-cols-2 gap-y-2 gap-x-12">
        {details.map((item, index) => (
          <div key={index} className="flex gap-2">
            <span className="text-[18px] text-[#404040]">{item.label}:</span>
            <span className="text-[18px] text-[#404040]">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DepartmentInfoCard;

"use client";

import React from "react";
import { details } from "../constant";

const DepartmentInfoCard = () => {
  return (
    <div className="w-full bg-[#ffffff] rounded-[25px] px-4 py-4 sm:px-6 sm:py-6 md:px-[24px] md:py-[20px] flex flex-col font-primary">
      <h2 className="text-[18px] sm:text-[20px] text-[#404040] mb-4">
        Department Details
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 sm:gap-x-8 md:gap-x-12">
        {details.map((item, index) => (
          <div key={index} className="flex gap-2 flex-wrap">
            <span className="lg:text-[16px] sm:text-[14px] md:text-[15px] text-[#404040] font-primary">
              {item.label}:
            </span>
            <span className="lg:text-[16px] sm:text-[14px] md:text-[15px]  text-[#404040] font-secondary">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DepartmentInfoCard;

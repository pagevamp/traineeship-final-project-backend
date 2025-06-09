import React from "react";
import { bankDetails } from "./constant";

const BankDetails = () => {
  return (
    <div className="bg-white rounded-[25px] px-4 md:px-[22px] pb-6 md:pb-[18px] w-full mx-auto">
      <h2 className="text-[12px] md:text-[11px] font-semibold text-[#1A1A1A] mb-4">
        Bank Details
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-6">
        {bankDetails.map(({ label, fullForm, value }, index) => (
          <div key={index}>
            <span className="font-primary lg:text-[15px] md:text-[13px] text-[#1A1A1A] whitespace-nowrap">
              {label}
              {fullForm && (
                <span className="text-[10px] ml-[6px] text-[#555]">
                  ({fullForm})
                </span>
              )}
              :
            </span>{" "}
            <span className="font-secondary lg:text-[14px] md:text-[10px] text-[#333333]">
              {value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BankDetails;

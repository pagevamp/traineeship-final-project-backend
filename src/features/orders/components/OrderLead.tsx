import React from "react";

const OrderLead = () => {
  return (
    <div className="flex flex-col gap-2">
      <span className="font-secondary text-[14px] md:text-[16px] text-start">
        Lead details
      </span>
      <div className="bg-[#F9F3FF] p-3 rounded-[5px]">
        <div className="bg-[#FFFFFF] flex flex-col gap-2 p-4">
          <span className="font-secondary text-[14px] md:text-[16px] font-weight-200">
            Commission detail
          </span>
          <span className="font-extralight text-[14px] md:text-[16px]">
            No data found.
          </span>
        </div>
      </div>
    </div>
  );
};

export default OrderLead;

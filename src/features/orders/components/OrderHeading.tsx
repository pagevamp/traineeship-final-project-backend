import React from "react";
import { headerDetails } from "../constant";
import { ChevronLeft } from "lucide-react";

const OrderHeading = () => {
  return (
    <div className="flex flex-col justify-start mb-2">
      <div className="w-full grid grid-cols-2 sm:grid-cols-2 gap-x-8 gap-y-4 justify-end">
        {headerDetails.map((detail, index) => (
          <div
            key={index}
            className={
              index == 0 || 3
                ? "flex items-center gap-2 justify-start"
                : "flex flex-col items-center gap-2 justify-end"
            }
          >
            <p>
              <span className="font-secondary text-[14px] md:text-[16px] mr-[4px] font-normal">
                {detail.label}:{" "}
              </span>
              <span className="font-secondary text-[14px] md:text-[16px] font-light">
                {detail.value}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHeading;

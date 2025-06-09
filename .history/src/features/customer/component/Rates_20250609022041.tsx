"use client";

import { RateCardTable } from "@/components/ui/rateCards";
import { useState } from "react";
import { FtlRateData, LtlRateData } from "./constant";

const Rates = () => {
  const [activeTab, setActiveTab] = useState<"FTL" | "LTL">("FTL");

  return (
    <div className="w-full flex flex-col items-center gap-4 px-4 sm:px-6 md:px-8">
      <div className="flex gap-8 self-start mt-6 border-b border-[#D3A8FF] w-fit">
        {["FTL", "LTL"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as "FTL" | "LTL")}
            className={`relative text-[16px] font-medium text-[#540F86] pb-2 whitespace-nowrap inline-block ${
              activeTab === tab ? "border-b border-[#540F86]" : ""
            }`}
            style={{
              borderRadius: activeTab === tab ? "8px 8px 0 0" : undefined,
              borderBottomWidth: activeTab === tab ? "1px" : undefined,
            }}
          >
            Rate card for {tab}
          </button>
        ))}
      </div>

      <div className="w-full max-w-full overflow-x-auto">
        <div className="min-w-[320px] md:min-w-[1110px] bg-[#ffffff] rounded-[25px] font-primary mx-auto">
          <div className="h-[54px] pt-[14px] mb-[23px] text-[14px] font-primary text-[#0B0704] text-center px-4">
            {activeTab === "FTL"
              ? "Bonded FTL to GCC Freight only (excluding clearance)"
              : "Bonded LTL to GCC Freight only (excluding clearance)"}
          </div>

          <RateCardTable
            data={activeTab === "FTL" ? FtlRateData : LtlRateData}
          />
        </div>
      </div>
    </div>
  );
};

export default Rates;

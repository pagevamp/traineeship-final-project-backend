"use client";

import { RateCardTable } from "@/components/ui/rateCards";
import { useState } from "react";
import { FtlRateData, LtlRateData } from "./constant";

const Rates = () => {
  const [activeTab, setActiveTab] = useState<"FTL" | "LTL">("FTL");

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <div className="flex gap-8 self-start mt-2 border-b border-[#D3A8FF] w-fit">
        {["FTL", "LTL"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as "FTL" | "LTL")}
            className="relative whitespace-nowrap text-[14px] md:text-[16px] font-medium text-[#540F86] pb-3 transition-all duration-300 overflow-visible"
          >
            <span className="relative z-10"> Rate card for {tab}</span>
            {activeTab === tab && (
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[100%] h-[3px] bg-[#540F86] rounded-t-[10px] transition-all duration-300 z-0" />
            )}
          </button>
        ))}
      </div>

      <div className="w-full overflow-x-auto">
        <div className="bg-[#ffffff] rounded-[25px] font-primary mx-auto">
          <div className="h-[54px] pt-[14px] text-[14px] font-primary text-[#0B0704] text-center px-4">
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

"use client";
import React, { useState } from "react";
import { po_commodity } from "../constant";

type DGFields = {
  EnterCommodityName: string;
  EnterUNNumber: string;
  EnterDGClass: string;
  PackagingGroup: string;
  DGDAttached: string;
};

const ShipmentItemDetails = () => {
  const [temperatureEnabled, setTemperatureEnabled] = useState(false);
  const [unit, setUnit] = useState<"F" | "C">("F");
  const [temperature, setTemperature] = useState("");

  const [dgEnabled, setDgEnabled] = useState(false);
  const [dgFields, setDgFields] = useState<DGFields>({
    EnterCommodityName: "",
    EnterUNNumber: "",
    EnterDGClass: "",
    PackagingGroup: "",
    DGDAttached: "",
  });

  const handleDGChange = (field: keyof DGFields, value: string) => {
    setDgFields((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="w-full max-w-7xl mx-auto bg-white rounded-lg p-4 sm:p-6 flex flex-col gap-4 sm:gap-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <span className="font-primary text-[14px] sm:text-[14px] md:text-[15px] text-[#404040] whitespace-nowrap">
              Temperature Requirement
            </span>
            <button
              onClick={() => setTemperatureEnabled(!temperatureEnabled)}
              className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ${
                temperatureEnabled ? "bg-[#19BDA5]" : "bg-[#FF6502]"
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full transform transition-transform duration-300 ${
                  temperatureEnabled ? "translate-x-6" : ""
                }`}
              />
            </button>
          </div>

          {temperatureEnabled && (
            <div className="flex items-center px-3 py-1 bg-[#F3F3F3] text-[#333] rounded-[40px] text-[14px] font-secondary shadow-sm gap-2 w-fit">
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value as "F" | "C")}
                className="bg-transparent focus:outline-none"
              >
                <option value="F">°F</option>
                <option value="C">°C</option>
              </select>
              |
              <input
                type="number"
                value={temperature}
                onChange={(e) => setTemperature(e.target.value)}
                placeholder="00"
                className="w-12 bg-transparent text-center focus:outline-none"
              />
            </div>
          )}
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <span className="font-primary text-[14px] sm:text-[14px] md:text-[15px] text-[#404040] whitespace-nowrap">
              DG Declaration
            </span>
            <button
              onClick={() => setDgEnabled(!dgEnabled)}
              className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ${
                dgEnabled ? "bg-[#19BDA5]" : "bg-[#FF6502]"
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full transform transition-transform duration-300 ${
                  dgEnabled ? "translate-x-6" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(dgFields).map(([field, value]) => (
          <input
            key={field}
            value={value}
            onChange={(e) =>
              handleDGChange(field as keyof DGFields, e.target.value)
            }
            placeholder={field
              .replace(/([A-Z])/g, " $1")
              .replace(/^./, (c) => c.toUpperCase())}
            className={`rounded-[40px] p-2 text-sm w-full ${
              dgEnabled
                ? "border border-black bg-white text-[#404040]"
                : "border border-gray-300 bg-white text-gray-400"
            }`}
            disabled={!dgEnabled}
          />
        ))}
      </div>

      <div className="flex flex-col gap-4 sm:gap-6">
        {po_commodity.map((item) => (
          <div key={item.id} className="flex flex-col gap-3">
            <span className="font-primary text-[14px] sm:text-[14px] md:text-[15px] text-[#404040]">
              PO Number :{" "}
              <span className="font-secondary text-[13px] sm:text-[13px] md:text-[14px] text-[#404040]">
                {item.po}
              </span>
            </span>
            <div className="flex flex-col sm:flex-row gap-2 sm:items-start">
              <span className="font-primary text-[14px] sm:text-[14px] md:text-[15px] text-[#404040] whitespace-nowrap">
                Commodity Description:
              </span>
              <div className="w-full border border-[#EAEAEA] rounded-[25px] p-2 font-secondary font-light text-[#404040] break-words">
                {item.commodity}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShipmentItemDetails;

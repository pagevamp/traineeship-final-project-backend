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

const ShipmentSelection = () => {
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
    <div className="w-full max-w-7xl mx-auto bg-white rounded-lg flex flex-col gap-4 sm:gap-6">
      <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8">
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
          {temperatureEnabled && (
            <div className="flex items-center px-3 py-1 bg-[#F3F3F3] text-[#333] rounded-[40px] text-[14px] font-secondary gap-2 w-fit">
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

        <div className="flex flex-col sm:flex-row sm:items-center gap-3 flex-1">
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

          {dgEnabled && (
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                value={dgFields.EnterCommodityName}
                onChange={(e) =>
                  handleDGChange("EnterCommodityName", e.target.value)
                }
                placeholder="Enter DG Commodity Name"
                className="rounded-[40px] p-2 text-[12px] w-[180px] border border-[#E9E9E9] bg-white text-[#404040]"
              />
              <input
                value={dgFields.EnterUNNumber}
                onChange={(e) =>
                  handleDGChange("EnterUNNumber", e.target.value)
                }
                placeholder="Enter UN Number"
                className="rounded-[40px] p-2 text-[12px] w-[180px] border border-[#E9E9E9] bg-white text-[#404040]"
              />
            </div>
          )}
        </div>
      </div>

      {dgEnabled && (
        <div className="flex flex-row justify-end">
          <div className="flex flex-wrap gap-4">
            <input
              value={dgFields.EnterDGClass}
              onChange={(e) => handleDGChange("EnterDGClass", e.target.value)}
              placeholder="Enter DG Class"
              className="rounded-[40px] p-2 text-[12px] w-[180px] border border-[#E9E9E9] bg-white text-[#404040]"
            />
            <input
              value={dgFields.PackagingGroup}
              onChange={(e) => handleDGChange("PackagingGroup", e.target.value)}
              placeholder="Packaging Group"
              className="rounded-[40px] p-2 text-[12px] w-[180px] border border-[#E9E9E9] bg-white text-[#404040]"
            />
            <input
              value={dgFields.DGDAttached}
              onChange={(e) => handleDGChange("DGDAttached", e.target.value)}
              placeholder="DGD Attached: Yes/No"
              className="rounded-[40px] p-2 text-[12px] w-[180px] border border-[#E9E9E9] bg-white text-[#404040]"
            />
          </div>
        </div>
      )}

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
              <div className="max-full border border-[#EAEAEA] rounded-[10px] p-2 font-secondary font-normal text-[#404040] text-[14px]">
                {item.commodity}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShipmentSelection;

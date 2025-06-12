import React, { useState } from "react";
import ShipmentDocuments from "./ShipmentDocuments";
import { po_commodity, shipmentItemDetails } from "../constant";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import ShipmentSelection from "./ShipmentSelection";
import { useModalContext } from "@/providers/modal-context";
import ShipmentModal from "./ShipmentModal";

type DGFields = {
  EnterCommodityName: string;
  EnterUNNumber: string;
  EnterDGClass: string;
  PackagingGroup: string;
  DGDAttached: string;
};

const ShipmentItemDetails = () => {
  const { openModal } = useModalContext();
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
  const handleCreateClick = () => {
    openModal({
      component: ShipmentModal,
      className: "h-fit bg-white max-w-[98%] sm:max-w-[50%] rounded-[39px]",
    });
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between items-end px-6">
        <span className="font-primary text-black text-[16px] pb-1 font-normal">
          Item Details
        </span>

        <Button
          variant="outline"
          className="flex items-center mb-2 gap-3 bg-white text-primary text-[13px] font-secondary font-normal border border-primary rounded-[37px] p-2"
          onClick={handleCreateClick}
        >
          Add
          <Image src="/plus.svg" alt="plus" width={24} height={24} />
        </Button>
      </div>

      <div className="rounded-[25px] bg-white w-full h-full flex-col items-center p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-8 w-full">
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-1">
              <span className="font-primary text-[14px] md:text-[15px] text-[#404040] font-medium">
                {"Commodity Name:"}
              </span>
              <span className="font-secondary text-[13px] md:text-[14px] text-[#404040] font-light">
                {"Shaan Roy"}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-1">
              <span className="font-primary text-[14px] md:text-[15px] text-[#404040] font-medium">
                {"No. of Units / Pallets:"}
              </span>
              <span className="font-secondary text-[13px] md:text-[14px] text-[#404040] font-light">
                {"123"}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-1">
              <span className="font-primary text-[14px] md:text-[15px] text-[#404040] font-medium">
                {"Net Weight (kg):"}
              </span>
              <span className="font-secondary text-[13px] md:text-[14px] text-[#404040] font-light">
                {"800"}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <span className="font-primary text-[14px] sm:text-[14px] md:text-[15px] text-[#404040] whitespace-nowrap">
                Temperature Requirement
              </span>
              <div className="w-12">
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
          </div>
          <div className="col-span-2 space-y-4">
            <div className="grid grid-cols-2">
              <div>
                <></>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-1">
                <span className="font-primary text-[14px] md:text-[15px] text-[#404040] font-medium">
                  {"H.S Code:"}
                </span>
                <span className="font-secondary text-[13px] md:text-[14px] text-[#404040] font-light">
                  {"12345678"}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2">
              <div className="flex flex-col sm:flex-row sm:items-center gap-1">
                <span className="font-primary text-[14px] md:text-[15px] text-[#404040] font-medium">
                  {"Package Type:"}
                </span>
                <span className="font-secondary text-[13px] md:text-[14px] text-[#404040] font-light">
                  {"Cartoons"}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-1">
                <span className="font-primary text-[14px] md:text-[15px] text-[#404040] font-medium">
                  {"Gross Weight (kg):"}
                </span>
                <span className="font-secondary text-[13px] md:text-[14px] text-[#404040] font-light">
                  {"1000"}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2">
              <div className="flex flex-col sm:flex-row sm:items-center gap-1">
                <span className="font-primary text-[14px] md:text-[15px] text-[#404040] font-medium">
                  {"Volume (CBM):"}
                </span>
                <span className="font-secondary text-[13px] md:text-[14px] text-[#404040] font-light">
                  {"40 cm × 30 cm × 20 cm"}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-1">
                <span className="font-primary text-[14px] md:text-[15px] text-[#404040] font-medium">
                  {"Declared Value:"}
                </span>
                <span className="font-secondary text-[13px] md:text-[14px] text-[#404040] font-light">
                  {"AED 500,000"}
                </span>
              </div>
            </div>

            <div className="flex gap-3 items-center">
              <span className="font-primary text-[14px] sm:text-[14px] md:text-[15px] text-[#404040] whitespace-nowrap">
                DG Declaration
              </span>
              <div className="w-12">
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

              {dgEnabled && (
                <div className="flex flex-col flex-wrap sm:flex-row gap-4">
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
            {dgEnabled && (
              <div className="flex flex-col flex-wrap sm:flex-row gap-4">
                <input
                  value={dgFields.EnterDGClass}
                  onChange={(e) =>
                    handleDGChange("EnterDGClass", e.target.value)
                  }
                  placeholder="Enter DG Class"
                  className="rounded-[40px] p-2 text-[12px] w-[180px] border border-[#E9E9E9] bg-white text-[#404040]"
                />
                <input
                  value={dgFields.PackagingGroup}
                  onChange={(e) =>
                    handleDGChange("PackagingGroup", e.target.value)
                  }
                  placeholder="Packaging Group"
                  className="rounded-[40px] p-2 text-[12px] w-[180px] border border-[#E9E9E9] bg-white text-[#404040]"
                />
                <input
                  value={dgFields.DGDAttached}
                  onChange={(e) =>
                    handleDGChange("DGDAttached", e.target.value)
                  }
                  placeholder="DGD Attached: Yes/No"
                  className="rounded-[40px] p-2 text-[12px] w-[180px] border border-[#E9E9E9] bg-white text-[#404040]"
                />
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-4 sm:gap-6 py-4">
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
        <div className="w-full mt-4">
          <ShipmentDocuments />
        </div>
      </div>
    </div>
  );
};

export default ShipmentItemDetails;

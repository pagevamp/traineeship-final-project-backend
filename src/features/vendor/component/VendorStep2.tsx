import React from "react";
import { Selectbox } from "@/components/ui/select-box";
import { Input } from "@/components/ui/input";
import { Controller } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { MultiSelect } from "@/components/ui/multi-select";
import { SelectedBadges } from "@/components/selected-badge/SelectedBadges";
import { companyType } from "../constant";

const Vendor2 = ({ control }: { control: any }) => {
  const [selectedCompany, setSelectedCompany] = React.useState<string[]>([]);

  const handleRemoveFramework = (value: string) => {
    setSelectedCompany((prev) => prev.filter((item) => item !== value));
  };
  return (
    <motion.div
      className="text-[16px] max-w-[500px] w-full px-4 sm:px-6 md:px-8 lg:px-0 justify-items flex flex-col gap-4"
      initial={{ x: 50, opacity: 0.1 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
    >
      <div className="flex flex-col gap-2 w-full">
        <MultiSelect
          options={companyType}
          selected={selectedCompany}
          onChange={setSelectedCompany}
          placeholder="Select Type of Vehicles Offered..."
          searchPlaceholder="Search..."
          label="Type of Vehicles Offered"
        />
        <SelectedBadges
          selected={selectedCompany}
          options={companyType}
          onRemove={handleRemoveFramework}
        />
      </div>

      <Input
        className="w-full py-2 px-4 placeholder:text-xs placeholder:text-[#9C9AA5] h-12"
        id="totalNumberofVehicles"
        name="totalNumberofVehicles"
        labelName="Total Number of Vehicles"
        placeholder="Enter the Total Number of Vehicles"
        type="number"
        required={true}
      />

      <div className="flex flex-col gap-2 w-full">
        <MultiSelect
          options={companyType}
          selected={selectedCompany}
          onChange={setSelectedCompany}
          placeholder="Select Type of Cargo Supported..."
          searchPlaceholder="Search..."
          label="Type of Cargo Supported"
        />
        <SelectedBadges
          selected={selectedCompany}
          options={companyType}
          onRemove={handleRemoveFramework}
        />
      </div>

      <div className="flex flex-col gap-2 w-full">
        <MultiSelect
          options={companyType}
          selected={selectedCompany}
          onChange={setSelectedCompany}
          placeholder="Select Coverage Area / Route..."
          searchPlaceholder="Search..."
          label="Coverage Area / Routes"
        />
        <SelectedBadges
          selected={selectedCompany}
          options={companyType}
          onRemove={handleRemoveFramework}
        />
      </div>

      <div className="flex flex-col gap-2 w-full">
        <MultiSelect
          options={companyType}
          selected={selectedCompany}
          onChange={setSelectedCompany}
          placeholder="Select Operational Days..."
          searchPlaceholder="Search..."
          label="Operational Days"
        />
        <SelectedBadges
          selected={selectedCompany}
          options={companyType}
          onRemove={handleRemoveFramework}
        />
      </div>
      <Input
        id="emergencyResponseSLA"
        name="emergencyResponseSLA"
        type="number"
        labelName="Emergency Response SLA"
        placeholder="Enter Emergency Response SLA"
        // className="w-full h-[40px] px-3 rounded border border-[#ccc] text-[14px] bg-white"
        required={false}
      />
    </motion.div>
  );
};

export default Vendor2;

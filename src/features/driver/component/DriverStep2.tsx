import React from "react";
import { Selectbox } from "@/components/ui/select-box";
import { Input } from "@/components/ui/input";
import { Controller } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { MultiSelect } from "@/components/ui/multi-select";
import { SelectedBadges } from "@/components/selected-badge/SelectedBadges";
import { companyType } from "../constant";
import { DatePicker } from "@/components/ui/date-picker";

const Driver2 = ({ control }: { control: any }) => {
  const [selectedCompany, setSelectedCompany] = React.useState<string[]>([]);
  const [date, setDate] = React.useState<Date | undefined>(undefined);

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
      <Input
        className="w-full py-2 px-4 placeholder:text-xs placeholder:text-[#9C9AA5] h-12"
        id="phoneNumber"
        name="phoneNumber"
        labelName="Phone Number"
        placeholder="Enter your Phone Number"
        type="tel"
        required={true}
      />

      <Input
        className="w-full py-2 px-4 placeholder:text-xs placeholder:text-[#9C9AA5] h-12"
        id="emailAddress"
        name="emailAddress"
        labelName="Email Address"
        placeholder="Enter your Email Address"
        type="tel"
        required={false}
      />

      <Input
        className="w-full py-2 px-4 placeholder:text-xs placeholder:text-[#9C9AA5] h-12"
        id="emergencyContactName"
        name="emergencyContactName"
        labelName="Emergency Contact Name"
        placeholder="Enter your Emergency Contact Name"
        type="text"
        required={true}
      />

      <Input
        className="w-full py-2 px-4 placeholder:text-xs placeholder:text-[#9C9AA5] h-12"
        id="emergencyContactNo"
        name="emergencyContactNo"
        labelName="Emergency Contact No."
        placeholder="Enter your Emergency Contact No."
        type="integer"
        required={true}
      />
    </motion.div>
  );
};

export default Driver2;

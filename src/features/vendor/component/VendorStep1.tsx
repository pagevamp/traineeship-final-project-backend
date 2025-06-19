import React from "react";
import { Selectbox } from "@/components/ui/select-box";
import { Input } from "@/components/ui/input";
import { Controller } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { MultiSelect } from "@/components/ui/multi-select";
import { SelectedBadges } from "@/components/selected-badge/SelectedBadges";
import { DatePicker } from "@/components/ui/date-picker";

const Vendor1 = ({ control }: { control: any }) => {
  return (
    <motion.div
      className="text-[16px] max-w-[500px] w-full px-4 sm:px-6 md:px-8 lg:px-0 justify-items flex flex-col gap-4"
      initial={{ x: 50, opacity: 0.1 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
    >
      <Input
        className="w-full py-2 px-4 placeholder:text-xs placeholder:text-[#9C9AA5] h-12"
        id="vendorName"
        name="vendorName"
        labelName="Vendor Name"
        placeholder="Enter your Vendor Name"
        type="text"
        required={true}
      />

      <Input
        type="text"
        id="contactName"
        name="contactName"
        labelName="Contact Person"
        placeholder="Enter Contact Person Name"
        className="w-full h-[40px] px-3 text-muted-foreground rounded border border-[#ccc] text-[14px] bg-white"
        required={true}
      />

      <Input
        id="phoneNumber"
        name="phoneNumber"
        type="tel"
        labelName="Contact Number"
        placeholder="+91"
        className="w-full h-[40px] px-3 rounded border border-[#ccc] text-[14px] bg-white"
        required={true}
      />

      <Input
        id="emailAddress"
        name="emailAddress"
        type="email"
        labelName="Email Address"
        placeholder="Enter Email Address"
        className="w-full h-[40px] px-3 rounded border border-[#ccc] text-[14px] bg-white"
        required={true}
      />

      <Input
        id="companyAddress"
        name="companyAddress"
        type="textarea"
        labelName="Company Address"
        placeholder="Enter Company Address"
        className="w-full h-[40px] px-3 rounded border border-[#ccc] text-[14px] bg-white"
        required={true}
      />

      <Controller
        name="countryOfOperation"
        control={control}
        render={({ field }) => (
          <Selectbox
            options={[
              { label: "Nepal", value: "Nepal" },
              { label: "India", value: "India" },
            ]}
            value={field.value || ""}
            onChange={(selected) => field.onChange(selected.value)}
            placeholder="Country Of Operation"
            emptyText="No data found."
            className="w-full bg-transparent h-12"
            label="Country Of Operation"
          />
        )}
      />
    </motion.div>
  );
};

export default Vendor1;

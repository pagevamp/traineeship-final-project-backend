import React from "react";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Controller } from "react-hook-form";
import { Selectbox } from "@/components/ui/select-box";
import { DatePicker } from "@/components/ui/date-picker";

const Driver5 = ({ control }: { control: any }) => {
  const employeeId = `EMP-${Math.random()
    .toString(36)
    .substring(2, 10)
    .toUpperCase()}`;

  const [date, setDate] = React.useState<Date | undefined>(undefined);

  return (
    <motion.div
      className="text-[16px] max-w-[500px] w-full px-4 sm:px-6 md:px-8 lg:px-0 justify-items flex flex-col gap-4"
      initial={{ x: 50, opacity: 0.1 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
    >
      <Input
        className="w-full py-2 px-4 placeholder:text-xs placeholder:text-[#9C9AA5]  bg-gray-100 h-12"
        id="employeeId"
        name="employeeId"
        labelName="Employee Id"
        value={employeeId}
        placeholder="Enter your Employee Id"
        type="text"
      />

      <div className="flex flex-col gap-2">
        <DatePicker
          selected={date}
          onSelect={setDate}
          placeholder="Hiring Date"
          label="Hiring Date"
          className="w-full text-xs"
        />
      </div>

      <Controller
        name="contactType"
        control={control}
        render={({ field }) => (
          <Selectbox
            options={[
              { label: "Full-time", value: "Full-time" },
              { label: "Part-time", value: "Part-time" },
              { label: "Vendor-supplied", value: "Vendor-supplied" },
            ]}
            value={field.value || ""}
            onChange={(selected) => field.onChange(selected.value)}
            placeholder="Contract Type"
            emptyText="No data found."
            className="w-full bg-transparent h-12"
            label="Contract Type"
          />
        )}
      />

      <Input
        id="salary"
        name="salary"
        type="text"
        labelName="Salary"
        placeholder="Enter the Salary"
        className="w-full h-[40px] px-3 rounded border border-[#ccc] text-[14px]"
        optional={true}
      />
    </motion.div>
  );
};

export default Driver5;

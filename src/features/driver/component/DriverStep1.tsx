import React from "react";
import { Selectbox } from "@/components/ui/select-box";
import { Input } from "@/components/ui/input";
import { Controller } from "react-hook-form";
import { motion } from "framer-motion";
import { DatePicker } from "@/components/ui/date-picker";

const Driver1 = ({ control }: { control: any }) => {
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  return (
    <motion.div
      className="text-[16px] max-w-[500px] w-full px-4 sm:px-6 md:px-8 lg:px-0 justify-items flex flex-col gap-4"
      initial={{ x: 50, opacity: 0.1 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
    >
      <Input
        className="w-full py-2 px-4 placeholder:text-xs placeholder:text-[#9C9AA5] h-12"
        id="fullName"
        name="fullName"
        labelName="Full Name"
        placeholder="Enter your Full Name"
        type="text"
        required={true}
      />

      <Controller
        name="nationality"
        control={control}
        render={({ field }) => (
          <Selectbox
            options={[
              { label: "Nepal", value: "Nepal" },
              { label: "India", value: "India" },
            ]}
            value={field.value || ""}
            onChange={(selected) => field.onChange(selected.value)}
            placeholder="Nationality"
            emptyText="No data found."
            className="w-full bg-transparent h-12"
            label="Nationality"
          />
        )}
      />

      <div className="flex flex-col gap-2">
        <DatePicker
          selected={date}
          onSelect={setDate}
          placeholder="Enter Date"
          label="Date Of Birth"
          className="w-full text-xs"
        />
      </div>

      <Controller
        name="gender"
        control={control}
        render={({ field }) => (
          <Selectbox
            options={[
              { label: "Female", value: "Female" },
              { label: "Male", value: "Male" },
              { label: "Others", value: "Others" },
            ]}
            value={field.value || ""}
            onChange={(selected) => field.onChange(selected.value)}
            placeholder="Gender"
            emptyText="No data found."
            className="w-full bg-transparent h-12"
            label="Gender"
            optional={true}
          />
        )}
      />

      <Input
        id="photo"
        name="photo"
        type="file"
        labelName="Photo"
        placeholder="Upload photo"
        className="w-full h-full px-3 rounded border border-[#ccc] text-[14px] bg-white"
        optional={true}
      />
    </motion.div>
  );
};

export default Driver1;

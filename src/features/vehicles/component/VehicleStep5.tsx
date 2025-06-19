import React from "react";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Controller } from "react-hook-form";
import { Selectbox } from "@/components/ui/select-box";
import { DatePicker } from "@/components/ui/date-picker";

const Vehicle5 = ({ control }: { control: any }) => {
  const [date, setDate] = React.useState<Date | undefined>(undefined);

  return (
    <motion.div
      className="text-[16px] max-w-[500px] w-full px-4 sm:px-6 md:px-8 lg:px-0 justify-items flex flex-col gap-4"
      initial={{ x: 50, opacity: 0.1 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
    >
      <div className="flex flex-col gap-2">
        <DatePicker
          selected={date}
          onSelect={setDate}
          placeholder="Enter Date"
          label="Next Service Date"
          className="w-full text-xs"
        />
      </div>

      <Input
        id="odometerReading"
        name="odometerReading"
        labelName="Odometer Reading"
        placeholder="Odometer Reading"
        type="integer"
        className="w-full py-1.5 text-xs font-light px-3 placeholder:text-[11px] placeholder:text-[#9C9AA5] h-10"
        required={true}
      />

      <div>
        <Controller
          name="fuelType"
          control={control}
          render={({ field }) => (
            <Selectbox
              options={[
                { label: "Diesel", value: "Diesel" },
                { label: "Petrol", value: "Inactive" },
              ]}
              value={field.value || ""}
              onChange={(selected) => field.onChange(selected.value)}
              placeholder="Fuel Type"
              emptyText="No data found."
              className="w-full bg-transparent h-12"
              label="Fuel Type"
            />
          )}
        />
      </div>

      <div>
        <Controller
          name="GDPTrackerInstalled"
          control={control}
          render={({ field }) => (
            <Selectbox
              options={[
                { label: "Yes", value: "Yes" },
                { label: "No", value: "No" },
              ]}
              value={field.value || ""}
              onChange={(selected) => field.onChange(selected.value)}
              placeholder="GDP Tracker Installed"
              emptyText="No data found."
              className="w-full bg-transparent h-12"
              label="GDP Tracker Installed"
            />
          )}
        />
      </div>

      <Input
        id="deviceId"
        name="deviceId"
        labelName="Device ID (if GPS)"
        placeholder="Device Id"
        type="integer"
        className="w-full py-1.5 text-xs font-light px-3 placeholder:text-[11px] placeholder:text-[#9C9AA5] h-10"
        required={false}
      />
    </motion.div>
  );
};

export default Vehicle5;

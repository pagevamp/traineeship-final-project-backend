import React from "react";
import { Selectbox } from "@/components/ui/select-box";
import { Input } from "@/components/ui/input";
import { Controller } from "react-hook-form";
import { motion } from "framer-motion";
import { DatePicker } from "@/components/ui/date-picker";

const Vehicle1 = ({ control }: { control: any }) => {
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
        id="vehicleName"
        name="vehicleName"
        labelName="Vehicle Name / Title"
        placeholder="Enter the Vehicle Name"
        type="text"
        required={true}
      />

      <div>
        <Controller
          name="vehicleType"
          control={control}
          render={({ field }) => (
            <Selectbox
              options={[
                { label: "3 Ton", value: "3 Ton" },
                { label: "7 Ton", value: "7 Ton" },
              ]}
              value={field.value || ""}
              onChange={(selected) => field.onChange(selected.value)}
              placeholder="Vehicle Type"
              emptyText="No data found."
              className="w-full bg-transparent h-12"
              label="Vehicle Type"
            />
          )}
        />
      </div>

      <Input
        type="text"
        id="vehicleModel"
        name="vehicleModel"
        labelName="Vehicle Make / Model"
        placeholder="Enter Vehicle Make / Model"
        className="w-full h-[40px] px-3 text-muted-foreground rounded border border-[#ccc] text-[14px] bg-white"
        required={true}
      />

      <div className="flex flex-col gap-2">
        <DatePicker
          selected={date}
          onSelect={setDate}
          placeholder="Enter Date"
          label="Year of Manufacture"
          className="w-full text-xs"
        />
      </div>

      <Input
        id="plateNumber"
        name="plateNumber"
        type="text"
        labelName="Plate Number"
        placeholder="Enter Plate Number"
        className="w-full h-[40px] px-3 rounded border border-[#ccc] text-[14px] bg-white"
        required={true}
      />

      <div>
        <Controller
          name="countryOfRegistration"
          control={control}
          render={({ field }) => (
            <Selectbox
              options={[
                { label: "Nepal", value: "Nepal" },
                { label: "India", value: "India" },
              ]}
              value={field.value || ""}
              onChange={(selected) => field.onChange(selected.value)}
              placeholder="Country Of Registration"
              emptyText="No data found."
              className="w-full bg-transparent h-12"
              label="Country Of Registration"
            />
          )}
        />
      </div>
    </motion.div>
  );
};

export default Vehicle1;

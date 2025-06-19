import React from "react";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Controller } from "react-hook-form";
import { Selectbox } from "@/components/ui/select-box";

const Vehicle6 = ({ control }: { control: any }) => {
  const vehicleId = `VEC-${Math.random()
    .toString(36)
    .substring(2, 10)
    .toUpperCase()}`;
  const createdBy = "User";
  const dateCreated = new Date();
  return (
    <motion.div
      className="text-[16px] max-w-[500px] w-full px-4 sm:px-6 md:px-8 lg:px-0 justify-items flex flex-col gap-4"
      initial={{ x: 50, opacity: 0.1 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
    >
      <Input
        className="w-full py-2 px-4 placeholder:text-xs placeholder:text-[#9C9AA5]  bg-gray-100 h-12"
        id="vehicleId"
        name="vehicleId"
        labelName="Vehicle Id"
        value={vehicleId}
        placeholder="Enter your Vehicle Id"
        type="text"
        readOnly
        optional={false}
      />

      <div>
        <Controller
          name="selectAcceptedCurrency"
          control={control}
          render={({ field }) => (
            <Selectbox
              options={[
                { label: "Active", value: "Active" },
                { label: "Inactive", value: "Inactive" },
              ]}
              value={field.value || ""}
              onChange={(selected) => field.onChange(selected.value)}
              placeholder="Status"
              emptyText="No data found."
              className="w-full bg-transparent h-12"
              label="Status"
            />
          )}
        />
      </div>

      <Input
        id="createdBy"
        name="createdBy"
        type="text"
        labelName="Created By"
        value={createdBy}
        readOnly
        className="w-full h-[40px] px-3 rounded border border-[#ccc] text-[14px]  bg-gray-100"
        optional={false}
      />

      <Input
        id="dateCreated"
        name="dateCreated"
        type="text"
        labelName="Created Date"
        value={format(dateCreated, "PPpp")}
        readOnly
        className="w-full h-[40px] px-3 rounded border border-[#ccc] text-[14px] bg-gray-100"
        optional={false}
      />
    </motion.div>
  );
};

export default Vehicle6;

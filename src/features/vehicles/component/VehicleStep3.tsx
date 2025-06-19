import React from "react";
import { Selectbox } from "@/components/ui/select-box";
import { Input } from "@/components/ui/input";
import { Controller } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";

const Vehicle3 = ({ control }: { control: any }) => {
  return (
    <motion.div
      className="text-[16px] max-w-[500px] w-full px-4 sm:px-6 md:px-8 lg:px-0 justify-items flex flex-col gap-4"
      initial={{ x: 50, opacity: 0.1 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
    >
      <div>
        <Controller
          name="temperatureControlled"
          control={control}
          render={({ field }) => (
            <Selectbox
              options={[
                { label: "Yes", value: "Yes" },
                { label: "No", value: "No" },
              ]}
              value={field.value || ""}
              onChange={(selected) => field.onChange(selected.value)}
              placeholder="Temperature Controlled"
              emptyText="No data found."
              className="w-full bg-transparent h-12"
              label="Temperature Controlled"
            />
          )}
        />
      </div>

      <Input
        id="temperatureRange"
        name="temperatureRange"
        labelName="Temperature Range"
        placeholder="Enter Temperature Range"
        type="string"
        className="w-full py-1.5 text-xs font-light px-3 placeholder:text-[11px] placeholder:text-[#9C9AA5] h-10"
        required={false}
      />

      <div>
        <Controller
          name="DGCertified"
          control={control}
          render={({ field }) => (
            <Selectbox
              options={[
                { label: "Yes", value: "Yes" },
                { label: "No", value: "No" },
              ]}
              value={field.value || ""}
              onChange={(selected) => field.onChange(selected.value)}
              placeholder="DG Certified"
              emptyText="No data found."
              className="w-full bg-transparent h-12"
              label="DG Certified"
            />
          )}
        />
      </div>

      <div>
        <Controller
          name="GDPCompliant"
          control={control}
          render={({ field }) => (
            <Selectbox
              options={[
                { label: "Yes", value: "Yes" },
                { label: "No", value: "No" },
              ]}
              value={field.value || ""}
              onChange={(selected) => field.onChange(selected.value)}
              placeholder="GDP Compliant"
              emptyText="No data found."
              className="w-full bg-transparent h-12"
              label="GDP Compliant"
              optional={true}
            />
          )}
        />
      </div>

      <Input
        id="capacity"
        name="capacity"
        labelName="Capacity (Weight)"
        placeholder="Capacity"
        type="integer"
        className="w-full py-1.5 text-xs font-light px-3 placeholder:text-[11px] placeholder:text-[#9C9AA5] h-10"
        required={true}
      />

      <Input
        id="volumeCapacity "
        name="volumeCapacity "
        labelName="Volume Capacity (CBM)"
        placeholder="Volume Capacity"
        type="integer"
        className="w-full py-1.5 text-xs font-light px-3 placeholder:text-[11px] placeholder:text-[#9C9AA5] h-10"
        required={true}
      />
    </motion.div>
  );
};

export default Vehicle3;

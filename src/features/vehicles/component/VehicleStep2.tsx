import React from "react";
import { Selectbox } from "@/components/ui/select-box";
import { Controller } from "react-hook-form";
import { motion } from "framer-motion";

const Vehicle2 = ({ control }: { control: any }) => {
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
      <div>
        <Controller
          name="ownershipType"
          control={control}
          render={({ field }) => (
            <Selectbox
              options={[
                { label: "Owned", value: "Owned" },
                { label: "Licensed", value: "Licensed" },
              ]}
              value={field.value || ""}
              onChange={(selected) => field.onChange(selected.value)}
              placeholder="Ownership Type"
              emptyText="No data found."
              className="w-full bg-transparent h-12"
              label="Ownership Type"
            />
          )}
        />
      </div>

      <div>
        <Controller
          name="assignedVendor"
          control={control}
          render={({ field }) => (
            <Selectbox
              options={[
                { label: "3 Ton", value: "3 Ton" },
                { label: "7 Ton", value: "7 Ton" },
              ]}
              value={field.value || ""}
              onChange={(selected) => field.onChange(selected.value)}
              placeholder="Assigned Vendor"
              emptyText="No data found."
              className="w-full bg-transparent h-12"
              label="Assigned Vendor (if leased)"
              optional={true}
            />
          )}
        />
      </div>

      <div>
        <Controller
          name="assignedDriver"
          control={control}
          render={({ field }) => (
            <Selectbox
              options={[
                { label: "3 Ton", value: "3 Ton" },
                { label: "7 Ton", value: "7 Ton" },
              ]}
              value={field.value || ""}
              onChange={(selected) => field.onChange(selected.value)}
              placeholder="Assigned Driver"
              emptyText="No data found."
              className="w-full bg-transparent h-12"
              label="Assigned Driver"
              optional={true}
            />
          )}
        />
      </div>
    </motion.div>
  );
};

export default Vehicle2;

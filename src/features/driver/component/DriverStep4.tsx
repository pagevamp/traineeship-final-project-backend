import React from "react";
import { Selectbox } from "@/components/ui/select-box";
import { Input } from "@/components/ui/input";
import { Controller } from "react-hook-form";
import { motion } from "framer-motion";
import { companyType } from "../constant";
import { MultiSelect } from "@/components/ui/multi-select";
import { SelectedBadges } from "@/components/selected-badge/SelectedBadges";

const Driver4 = ({ control }: { control: any }) => {
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
      <Controller
        name="assignedVendor"
        control={control}
        render={({ field }) => (
          <Selectbox
            options={[
              { label: "AED (UAE Dirham)", value: "AED (UAE Dirham)" },
              { label: "SAR (Saudi Riyal)", value: "SAR (Saudi Riyal)" },
            ]}
            value={field.value || ""}
            onChange={(selected) => field.onChange(selected.value)}
            placeholder="Assigned Vendor"
            emptyText="No data found."
            className="w-full bg-transparent h-12"
            label="Assigned Vendor"
          />
        )}
      />

      <div className="flex flex-col gap-2 w-full">
        <MultiSelect
          options={companyType}
          selected={selectedCompany}
          onChange={setSelectedCompany}
          placeholder="Select Type of Vehicles Assigned..."
          searchPlaceholder="Search..."
          label="Assigned Vehicle(s)"
        />
        <SelectedBadges
          selected={selectedCompany}
          options={companyType}
          onRemove={handleRemoveFramework}
        />
      </div>

      <Controller
        name="availabilityStatus"
        control={control}
        render={({ field }) => (
          <Selectbox
            options={[
              { label: "AED (UAE Dirham)", value: "AED (UAE Dirham)" },
              { label: "SAR (Saudi Riyal)", value: "SAR (Saudi Riyal)" },
            ]}
            value={field.value || ""}
            onChange={(selected) => field.onChange(selected.value)}
            placeholder="Availability Status"
            emptyText="No data found."
            className="w-full bg-transparent h-12"
            label="Availability Status"
          />
        )}
      />

      <Controller
        name="DGCertification"
        control={control}
        render={({ field }) => (
          <Selectbox
            options={[
              { label: "Yes", value: "Yes" },
              { label: "No", value: "No" },
            ]}
            value={field.value || ""}
            onChange={(selected) => field.onChange(selected.value)}
            placeholder="DG Certification"
            emptyText="No data found."
            className="w-full bg-transparent h-12"
            label="DG Certification"
            optional={true}
          />
        )}
      />

      <Controller
        name="reeferHandlingCert"
        control={control}
        render={({ field }) => (
          <Selectbox
            options={[
              { label: "Yes", value: "Yes" },
              { label: "No", value: "No" },
            ]}
            value={field.value || ""}
            onChange={(selected) => field.onChange(selected.value)}
            placeholder="Reefer/GDP Handling Cert."
            emptyText="No data found."
            className="w-full bg-transparent h-12"
            label="Reefer/GDP Handling Cert."
            optional={true}
          />
        )}
      />
    </motion.div>
  );
};

export default Driver4;

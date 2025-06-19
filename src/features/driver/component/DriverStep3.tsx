import React from "react";
import { Selectbox } from "@/components/ui/select-box";
import { Input } from "@/components/ui/input";
import { Controller } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { DatePicker } from "@/components/ui/date-picker";

const Driver3 = ({ control }: { control: any }) => {
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
        id="licenseNumber"
        name="licenseNumber"
        labelName="Driver's License Number"
        placeholder="Enter the Driver's License Number"
        type="text"
        required={true}
      />

      <div className="flex flex-col gap-2">
        <DatePicker
          selected={date}
          onSelect={setDate}
          placeholder="License Expiry Date"
          label="License Expiry Date"
          className="w-full text-xs"
        />
      </div>

      <Controller
        name="licenseType"
        control={control}
        render={({ field }) => (
          <Selectbox
            options={[
              { label: "Heavy", value: "Heavy" },
              { label: "Medium", value: "Medium" },
              { label: "Light", value: "Light" },
            ]}
            value={field.value || ""}
            onChange={(selected) => field.onChange(selected.value)}
            placeholder="License Type"
            emptyText="No data found."
            className="w-full bg-transparent h-12"
            label="License Type"
          />
        )}
      />

      <Controller
        name="licenseCountry"
        control={control}
        render={({ field }) => (
          <Selectbox
            options={[
              { label: "Nepal", value: "Nepal" },
              { label: "India", value: "India" },
              { label: "Kuwait", value: "Kuwait" },
            ]}
            value={field.value || ""}
            onChange={(selected) => field.onChange(selected.value)}
            placeholder="License Country"
            emptyText="No data found."
            className="w-full bg-transparent h-12"
            label="License Country"
          />
        )}
      />

      <Input
        id="uploadLicenseCopy"
        name="uploadLicenseCopy"
        labelName="Upload License Copy"
        type="file"
        accept=".pdf,.xlsx,.xls"
        className="w-full py-1.5 text-xs font-light px-3 placeholder:text-[11px] placeholder:text-[#9C9AA5] h-10"
        required={true}
      />

      <Input
        id="emiratesID"
        name="emiratesID"
        labelName="Emirates ID / National ID"
        type="file"
        className="w-full py-1.5 text-xs font-light px-3 placeholder:text-[11px] placeholder:text-[#9C9AA5] h-10"
        required={true}
      />

      <Input
        id="passportCopy"
        name="passportCopy"
        labelName="Passport Copy"
        type="file"
        className="w-full py-1.5 text-xs font-light px-3 placeholder:text-[11px] placeholder:text-[#9C9AA5] h-10"
        required={true}
      />

      <Input
        id="visaWorkPermit"
        name="visaWorkPermit"
        labelName="Visa / Work Permit"
        type="file"
        className="w-full py-1.5 text-xs font-light px-3 placeholder:text-[11px] placeholder:text-[#9C9AA5] h-10"
        required={true}
      />

      <Input
        id="policeClearanceCertificate"
        name="policeClearanceCertificate"
        labelName="Police Clearance Certificate"
        type="file"
        className="w-full py-1.5 text-xs font-light px-3 placeholder:text-[11px] placeholder:text-[#9C9AA5] h-10"
        required={false}
      />
    </motion.div>
  );
};

export default Driver3;

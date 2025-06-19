import React from "react";
import { Selectbox } from "@/components/ui/select-box";
import { Input } from "@/components/ui/input";
import { Controller } from "react-hook-form";
import { motion } from "framer-motion";

const Vendor4 = ({ control }: { control: any }) => {
  return (
    <motion.div
      className="text-[16px] max-w-[500px] w-full px-4 sm:px-6 md:px-8 lg:px-0 justify-items flex flex-col gap-4"
      initial={{ x: 50, opacity: 0.1 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
    >
      <Input
        className="w-full py-2 px-4 placeholder:text-xs placeholder:text-[#9C9AA5] h-12"
        id="billingContact"
        name="billingContact"
        placeholder="Enter billing contact person's name"
        labelName="Billing Contact Name"
        type="string"
        required={true}
      />

      <Input
        id="billingEmail"
        name="billingEmail"
        placeholder="Enter Billing Email"
        type="email"
        labelName="Billing Email"
        className="w-full h-[40px] px-3 text-muted-foreground rounded border border-[#ccc] text-[14px] bg-white"
        required={true}
      />

      <Input
        id="bankName"
        name="bankName"
        placeholder="Enter your bank name (GCC region)"
        type="string"
        labelName="Bank Name"
        className="w-full h-[40px] px-3 rounded border border-[#ccc] text-[14px] bg-white"
        required={true}
      />

      <Input
        id="iban"
        name="iban"
        type="textarea"
        labelName="IBAN / Account Number"
        placeholder="Enter IBAN / Account Number"
        className="w-full h-[40px] px-3 rounded border border-[#ccc] text-[14px] bg-white"
        required={true}
      />

      <Input
        id="swift"
        name="swift"
        type="textarea"
        labelName="SWIFT / BIC Code"
        placeholder="Enter SWIFT / BIC Code"
        className="w-full h-[40px] px-3 rounded border border-[#ccc] text-[14px] bg-white"
        required={true}
      />

      <Controller
        name="selectAcceptedCurrency"
        control={control}
        render={({ field }) => (
          <Selectbox
            options={[
              { label: "AED (UAE Dirham)", value: "AED (UAE Dirham)" },
              { label: "SAR (Saudi Riyal)", value: "SAR (Saudi Riyal)" },
            ]}
            value={field.value || ""}
            onChange={(selected) => field.onChange(selected.value)}
            placeholder="Currency Accepted"
            emptyText="No data found."
            className="w-full bg-transparent h-12"
            label="Currency Accepted"
          />
        )}
      />

      <Controller
        name="preferredPaymentTerms"
        control={control}
        render={({ field }) => (
          <Selectbox
            options={[
              { label: "7 days", value: "7 days" },
              { label: "15 days", value: "15 days" },
            ]}
            value={field.value || ""}
            onChange={(selected) => field.onChange(selected.value)}
            placeholder="Preferred Payment Terms"
            emptyText="No data found."
            className="w-full bg-transparent h-12"
            label="Preferred Payment Terms"
          />
        )}
      />

      <Input
        id="vat"
        name="vat"
        type="textarea"
        labelName="VAT / TRN Number"
        placeholder="Enter the VAT / TRN Number"
        className="w-full h-[40px] px-3 rounded border border-[#ccc] text-[14px] bg-white"
        required={false}
      />
    </motion.div>
  );
};

export default Vendor4;

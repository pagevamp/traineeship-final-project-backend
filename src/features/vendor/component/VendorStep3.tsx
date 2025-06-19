import React from "react";
import { Selectbox } from "@/components/ui/select-box";
import { Input } from "@/components/ui/input";
import { Controller } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";

const Vendor3 = ({ control }: { control: any }) => {
  return (
    <motion.div
      className="text-[16px] max-w-[500px] w-full px-4 sm:px-6 md:px-8 lg:px-0 justify-items flex flex-col gap-4"
      initial={{ x: 50, opacity: 0.1 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Input
          id="tradeLicense"
          name="tradeLicense"
          labelName="Trade License Copy"
          type="file"
          accept=".pdf"
          className="w-full py-1.5 text-xs font-light px-3 placeholder:text-[11px] placeholder:text-[#9C9AA5] h-10"
          required={true}
        />

        <Input
          id="insuranceDoc"
          name="insuranceDoc"
          labelName="Insurance Document"
          type="file"
          className="w-full py-1.5 text-xs font-light px-3 placeholder:text-[11px] placeholder:text-[#9C9AA5] h-10"
          required={true}
        />

        <Input
          id="driverList"
          name="driverList"
          labelName="Driver List (with IDs)"
          type="file"
          accept=".pdf,.xlsx,.xls"
          className="w-full py-1.5 text-xs font-light px-3 placeholder:text-[11px] placeholder:text-[#9C9AA5] h-10"
          required
        />

        <Input
          id="vehicleList"
          name="vehicleList"
          labelName="Vehicle List (with plates)"
          type="file"
          accept=".pdf,.xlsx,.xls"
          className="w-full py-1.5 text-xs font-light px-3 placeholder:text-[11px] placeholder:text-[#9C9AA5] h-10"
          required={true}
        />

        <Input
          id="rateCard"
          name="rateCard"
          labelName="Rate Card"
          type="file"
          className="w-full py-1.5 text-xs font-light px-3 placeholder:text-[11px] placeholder:text-[#9C9AA5] h-10"
          required
        />

        <Input
          id="serviceAgreement"
          name="serviceAgreement"
          labelName="Service Agreement"
          type="file"
          className="w-full py-1.5 text-xs font-light px-3 placeholder:text-[11px] placeholder:text-[#9C9AA5] h-10"
          required={true}
        />

        <Input
          id="dgCertificate"
          name="dgCertificate"
          labelName="DG Handling Certificate"
          type="file"
          className="w-full py-1.5 text-xs font-light px-3 placeholder:text-[11px] placeholder:text-[#9C9AA5] h-10"
          required={false}
        />

        <Input
          id="reeferCertificate"
          name="reeferCertificate"
          labelName="Reefer/GDP Compliance Cert."
          type="file"
          className="w-full py-1.5 text-xs font-light px-3 placeholder:text-[11px] placeholder:text-[#9C9AA5] h-10"
          required={false}
        />
      </div>
    </motion.div>
  );
};

export default Vendor3;

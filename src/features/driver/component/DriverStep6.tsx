import React from "react";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

const Driver6 = ({ control }: { control: any }) => {
  return (
    <motion.div
      className="text-[16px] max-w-[500px] w-full px-4 sm:px-6 md:px-8 lg:px-0 justify-items flex flex-col gap-4"
      initial={{ x: 50, opacity: 0.1 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
    >
      <Input
        id="uploadRegistrationDocument"
        name="uploadRegistrationDocument"
        labelName="Driving License Copy"
        type="file"
        accept=".pdf,.jpg,"
        className="w-full py-1.5 text-xs font-light px-3 placeholder:text-[11px] placeholder:text-[#9C9AA5] h-10"
        required={true}
      />

      <Input
        id="uploadInsuranceDocument"
        name="uploadInsuranceDocument"
        labelName="Emirates ID or National ID"
        type="file"
        accept=".pdf,.jpg,"
        className="w-full py-1.5 text-xs font-light px-3 placeholder:text-[11px] placeholder:text-[#9C9AA5] h-10"
        required={true}
      />

      <Input
        id="uploadFitnessCertificate"
        name="uploadFitnessCertificate"
        labelName="Passport Copy"
        type="file"
        accept=".pdf,.jpg,"
        className="w-full py-1.5 text-xs font-light px-3 placeholder:text-[11px] placeholder:text-[#9C9AA5] h-10"
        required={true}
      />

      <Input
        id="uploadReeferCertificate"
        name="uploadReeferCertificate"
        labelName="Visa / Work Permit"
        type="file"
        accept=".pdf,.jpg,"
        className="w-full py-1.5 text-xs font-light px-3 placeholder:text-[11px] placeholder:text-[#9C9AA5] h-10"
        required={true}
      />

      <Input
        id="uploadDGCertificate"
        name="uploadDGCertificate"
        labelName="Driver Photo (optional)"
        type="file"
        accept=".pdf,.xlsx,.xls"
        className="w-full py-1.5 text-xs font-light px-3 placeholder:text-[11px] placeholder:text-[#9C9AA5] h-10"
        required={true}
      />
      <Input
        id="uploadRegistrationDocument"
        name="uploadRegistrationDocument"
        labelName="Police Clearance Certificate"
        type="file"
        accept=".pdf,.jpg,"
        className="w-full py-1.5 text-xs font-light px-3 placeholder:text-[11px] placeholder:text-[#9C9AA5] h-10"
        required={true}
      />

      <Input
        id="uploadInsuranceDocument"
        name="uploadInsuranceDocument"
        labelName="Medical Fitness Certificate"
        type="file"
        accept=".pdf,.jpg,"
        className="w-full py-1.5 text-xs font-light px-3 placeholder:text-[11px] placeholder:text-[#9C9AA5] h-10"
        required={true}
      />

      <Input
        id="uploadFitnessCertificate"
        name="uploadFitnessCertificate"
        labelName="Any specialized training certs"
        type="file"
        accept=".pdf,.jpg,"
        className="w-full py-1.5 text-xs font-light px-3 placeholder:text-[11px] placeholder:text-[#9C9AA5] h-10"
        required={true}
      />
    </motion.div>
  );
};

export default Driver6;

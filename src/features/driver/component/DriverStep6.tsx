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
        id="drivingLicenseCopy"
        name="drivingLicenseCopy"
        labelName="Driving License Copy"
        type="file"
        accept=".pdf,.jpg,"
        className="w-full py-1.5 text-xs font-light px-3 placeholder:text-[11px] placeholder:text-[#9C9AA5] h-10"
        required={true}
      />

      <Input
        id="emiratesID"
        name="emiratesID"
        labelName="Emirates ID or National ID"
        type="file"
        accept=".pdf,.jpg,"
        className="w-full py-1.5 text-xs font-light px-3 placeholder:text-[11px] placeholder:text-[#9C9AA5] h-10"
        required={true}
      />

      <Input
        id="passportCopy"
        name="passportCopy"
        labelName="Passport Copy"
        type="file"
        accept=".pdf,.jpg,"
        className="w-full py-1.5 text-xs font-light px-3 placeholder:text-[11px] placeholder:text-[#9C9AA5] h-10"
        required={true}
      />

      <Input
        id="workPermit"
        name="workPermit"
        labelName="Visa / Work Permit"
        type="file"
        accept=".pdf,.jpg,"
        className="w-full py-1.5 text-xs font-light px-3 placeholder:text-[11px] placeholder:text-[#9C9AA5] h-10"
        required={true}
      />

      <Input
        id="driverPhoto"
        name="driverPhoto"
        labelName="Driver Photo (optional)"
        type="file"
        accept=".jpeg,.png"
        className="w-full py-1.5 text-xs font-light px-3 placeholder:text-[11px] placeholder:text-[#9C9AA5] h-10"
        required={false}
      />

      <Input
        id="policeClearanceCertificate"
        name="policeClearanceCertificate"
        labelName="Police Clearance Certificate"
        type="file"
        accept=".pdf,.jpg,"
        className="w-full py-1.5 text-xs font-light px-3 placeholder:text-[11px] placeholder:text-[#9C9AA5] h-10"
        required={false}
      />

      <Input
        id="medicalFitnessCertificate"
        name="medicalFitnessCertificate"
        labelName="Medical Fitness Certificate"
        type="file"
        accept=".pdf"
        className="w-full py-1.5 text-xs font-light px-3 placeholder:text-[11px] placeholder:text-[#9C9AA5] h-10"
        required={false}
      />

      <Input
        id="specializationCerts"
        name="specializationCerts"
        labelName="Any specialized training certs"
        type="file"
        accept=".pdf,.xlsx,.xls"
        className="w-full py-1.5 text-xs font-light px-3 placeholder:text-[11px] placeholder:text-[#9C9AA5] h-10"
        required={false}
      />
    </motion.div>
  );
};

export default Driver6;

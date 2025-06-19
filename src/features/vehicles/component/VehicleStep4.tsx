import React from "react";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { DatePicker } from "@/components/ui/date-picker";

const Vehicle4 = ({ control }: { control: any }) => {
  const [date, setDate] = React.useState<Date | undefined>(undefined);

  return (
    <motion.div
      className="text-[16px] max-w-[500px] w-full px-4 sm:px-6 md:px-8 lg:px-0 justify-items flex flex-col gap-4"
      initial={{ x: 50, opacity: 0.1 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
    >
      <div className="flex flex-col gap-2">
        <DatePicker
          selected={date}
          onSelect={setDate}
          placeholder="Enter Date"
          label="Registration Expiry Date"
          className="w-full text-xs"
        />
      </div>

      <div className="flex flex-col gap-2">
        <DatePicker
          selected={date}
          onSelect={setDate}
          placeholder="Enter Date"
          label="Insurance Expiry Date"
          className="w-full text-xs"
        />
      </div>
      <div className="flex flex-col gap-2">
        <DatePicker
          selected={date}
          onSelect={setDate}
          placeholder="Enter Date"
          label="Fitness Certificate Expiry"
          className="w-full text-xs"
        />
      </div>

      <Input
        id="uploadRegistrationDocument"
        name="uploadRegistrationDocument"
        labelName="Upload Registration Document"
        type="file"
        accept=".pdf,.jpg,"
        className="w-full py-1.5 text-xs font-light px-3 placeholder:text-[11px] placeholder:text-[#9C9AA5] h-10"
        required={true}
      />

      <Input
        id="uploadInsuranceDocument"
        name="uploadInsuranceDocument"
        labelName="Upload Insurance Document"
        type="file"
        accept=".pdf,.jpg,"
        className="w-full py-1.5 text-xs font-light px-3 placeholder:text-[11px] placeholder:text-[#9C9AA5] h-10"
        required={true}
      />

      <Input
        id="uploadFitnessCertificate"
        name="uploadFitnessCertificate"
        labelName="Upload Fitness Certificate"
        type="file"
        accept=".pdf,.jpg,"
        className="w-full py-1.5 text-xs font-light px-3 placeholder:text-[11px] placeholder:text-[#9C9AA5] h-10"
        required={true}
      />

      <Input
        id="uploadReeferCertificate"
        name="uploadReeferCertificate"
        labelName="Upload Reefer/GDP Cert (if applicable)"
        type="file"
        accept=".pdf,.jpg,"
        className="w-full py-1.5 text-xs font-light px-3 placeholder:text-[11px] placeholder:text-[#9C9AA5] h-10"
        required={false}
      />

      <Input
        id="uploadDGCertificate"
        name="uploadDGCertificate"
        labelName="Upload DG Certificate (if applicable)"
        type="file"
        accept=".pdf,.xlsx,.xls"
        className="w-full py-1.5 text-xs font-light px-3 placeholder:text-[11px] placeholder:text-[#9C9AA5] h-10"
        required={false}
      />
    </motion.div>
  );
};

export default Vehicle4;

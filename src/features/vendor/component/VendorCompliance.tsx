import React from "react";
import { Input } from "@/components/ui/input";

const VendorCompliance = () => {
  return (
    <div className="text-[14px] w-full px-4 sm:px-6 md:px-8 lg:px-0">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Input
          id="trade-license"
          name="trade-license"
          labelName="Trade License Copy"
          type="file"
          accept=".pdf"
          className="w-full py-1.5 text-xs font-light px-3 placeholder:text-[11px] placeholder:text-[#9C9AA5] h-10"
          required
        />

        <Input
          id="insurance-doc"
          name="insurance-doc"
          labelName="Insurance Document"
          type="file"
          className="w-full py-1.5 text-xs font-light px-3 placeholder:text-[11px] placeholder:text-[#9C9AA5] h-10"
          required
        />

        <Input
          id="driver-list"
          name="driver-list"
          labelName="Driver List"
          type="file"
          accept=".pdf,.xlsx,.xls"
          className="w-full py-1.5 text-xs font-light px-3 placeholder:text-[11px] placeholder:text-[#9C9AA5] h-10"
          required
        />

        <Input
          id="vehicle-list"
          name="vehicle-list"
          labelName="Vehicle List (with plates)"
          type="file"
          accept=".pdf,.xlsx,.xls"
          className="w-full py-1.5 text-xs font-light px-3 placeholder:text-[11px] placeholder:text-[#9C9AA5] h-10"
          required
        />

        <Input
          id="rate-card"
          name="rate-card"
          labelName="Rate Card"
          type="file"
          className="w-full py-1.5 text-xs font-light px-3 placeholder:text-[11px] placeholder:text-[#9C9AA5] h-10"
          required
        />

        <Input
          id="service-agreement"
          name="service-agreement"
          labelName="Service Agreement"
          type="file"
          className="w-full py-1.5 text-xs font-light px-3 placeholder:text-[11px] placeholder:text-[#9C9AA5] h-10"
          required
        />

        <Input
          id="dg-certificate"
          name="dg-certificate"
          labelName="DG Handling Certificate"
          type="file"
          className="w-full py-1.5 text-xs font-light px-3 placeholder:text-[11px] placeholder:text-[#9C9AA5] h-10"
        />

        <Input
          id="reefer-certificate"
          name="reefer-certificate"
          labelName="Reefer/GDP Compliance Cert."
          type="file"
          className="w-full py-1.5 text-xs font-light px-3 placeholder:text-[11px] placeholder:text-[#9C9AA5] h-10"
        />
      </div>
    </div>
  );
};

export default VendorCompliance;

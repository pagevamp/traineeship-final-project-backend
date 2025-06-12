import React from "react";
import { Input } from "@/components/ui/input";

const BillingDetailComponent = () => {
  return (
    <div className="p-4 bg-primary-light mt-6 rounded-2xl">
      <p className="font-secondary font-medium tracking-normal pb-6">
        Billing Detail
      </p>

      <div className="relative grid grid-cols-2 gap-14">
        <div className="absolute left-[50%] top-[50%] w-[1px] bg-[#d6d6d67e] translate-x-[-50%] translate-y-[-50%] h-[100%] hidden md:block"></div>
        <div className="space-y-4">
          <Input
            labelName="Street Address 1"
            placeholder="Enter Your Street Address 1"
            className="bg-white border-border-extra-light"
            type="text"
            name={"streetAddress1"}
            maxLength={50}
            required
          />
          <Input
            labelName="City"
            placeholder="Enter City"
            className="bg-white border-border-extra-light"
            type="text"
            name={"city"}
            maxLength={50}
            required
          />
          <Input
            labelName="Country"
            placeholder="Enter Country"
            className="bg-white border-border-extra-light"
            type="text"
            name={"country"}
            maxLength={50}
          />
        </div>
        <div className="space-y-4">
          <Input
            labelName="Street Address 2"
            placeholder="Enter Your Street Address 2"
            className="bg-white border-border-extra-light"
            type="text"
            name={"streetAddress2"}
            maxLength={50}
          />
          <Input
            labelName="State"
            placeholder="Enter State"
            className="bg-white border-border-extra-light"
            type="text"
            name={"state"}
            maxLength={50}
            required
          />
          <Input
            labelName="Zip Code"
            placeholder="Enter Zip Code"
            className="bg-white border-border-extra-light"
            type="text"
            name={"zipCode"}
            maxLength={50}
          />
        </div>
      </div>
    </div>
  );
};

export default BillingDetailComponent;

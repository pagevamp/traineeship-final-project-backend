import { Input } from "@/components/ui/input";
import React from "react";

const InformationComponent = () => {
  return (
    <div className="p-4 bg-primary-light mt-6 rounded-2xl">
      <p className="font-secondary font-medium tracking-normal pb-6">
        Information
      </p>

      <div className="relative grid grid-cols-2 gap-14">
        <div className="absolute left-[50%] top-[50%] w-[1px] bg-[#d6d6d67e] translate-x-[-50%] translate-y-[-50%] h-[100%] hidden md:block"></div>
        <div className="space-y-4">
          <Input
            labelName="First Name"
            placeholder="Enter Your First Name"
            className="bg-white border-border-extra-light"
            type="text"
            // register={register}
            // trigger={trigger}
            name={"firstName"}
            maxLength={50}
            // error={errors?.title?.message}
            // defaultValue={defaultValues?.firstName}
            required
          />
          <Input
            labelName="Email /  Username"
            placeholder="Enter Your Email / Username"
            className="bg-white border-border-extra-light"
            type="text"
            name={"email"}
            maxLength={50}
            required
          />
          <Input
            labelName="Password"
            placeholder="Enter Your Password"
            type="password"
            name={"password"}
            className="bg-white border-border-extra-light"
            required
          />
          <Input
            labelName="Organization Name"
            placeholder="Enter Your Organization Name"
            type="text"
            name={"organizationName"}
            className="bg-white border-border-extra-light"
            required
          />
          <Input
            labelName="Invoice Email"
            placeholder="Enter Your Invoice Email"
            type="text"
            name={"invoiceEmail"}
            className="bg-white border-border-extra-light"
            required
          />
          <div className="grid grid-cols-3 gap-2">
            <div className="col-span-2">
              <Input
                labelName="Customer Contact"
                placeholder="Enter Your Customer Contact"
                className="bg-white border-border-extra-light"
                type="text"
                name={"customerContact"}
                maxLength={10}
              />
            </div>
            <Input
              labelName="Extension"
              placeholder="Enter Your Number"
              className="bg-white border-border-extra-light"
              type="text"
              name={"customerExtension_Number"}
              maxLength={50}
            />
          </div>
          <Input
            labelName="NPI"
            placeholder="Enter Your NPI"
            type="text"
            name={"npi"}
            className="bg-white border-border-extra-light"
            required
          />
          <Input
            labelName="Terms"
            placeholder="Select Terms"
            type="text"
            name={"invoiceEmail"}
            className="bg-white border-border-extra-light"
            required
          />
        </div>
        <div className="space-y-4">
          <Input
            labelName="Last Name"
            placeholder="Enter Your Last Name"
            className="bg-white border-border-extra-light"
            type="text"
            name={"lastName"}
            maxLength={50}
            required
          />
          <div className="grid grid-cols-3 gap-2">
            <div className="col-span-2">
              <Input
                labelName="Contact Number"
                placeholder="Enter Your Contact Number"
                className="bg-white border-border-extra-light"
                type="text"
                name={"lastName"}
                maxLength={10}
                required
              />
            </div>
            <Input
              labelName="Extension"
              placeholder="Enter Your Number"
              className="bg-white border-border-extra-light"
              type="text"
              name={"extension_Number"}
              maxLength={50}
            />
          </div>
          <Input
            labelName="Confirm Password"
            placeholder="Re-enter your password"
            type="password"
            name={"confirmPassword"}
            className="bg-white border-border-extra-light"
            required
          />
          <Input
            labelName="IVR Email"
            placeholder="Enter Your IVR Email"
            type="text"
            name={"ivrEmail"}
            className="bg-white border-border-extra-light"
            required
          />
          <Input
            labelName="Packing Slip Email"
            placeholder="Enter Your Packing Slip Email"
            type="text"
            name={"packingSlipEmail"}
            className="bg-white border-border-extra-light"
            required
          />
          <Input
            labelName="Tax Id"
            placeholder="Enter Your Tax Id"
            type="text"
            name={"taxId"}
            className="bg-white border-border-extra-light"
            required
          />
          <Input
            labelName="PTAN No."
            placeholder="Enter Your PTAN No."
            type="text"
            name={"taxId"}
            className="bg-white border-border-extra-light"
            required
          />
        </div>
      </div>
    </div>
  );
};

export default InformationComponent;

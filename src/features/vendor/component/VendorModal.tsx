import { Input } from "@/components/ui/input";
import React from "react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useModal } from "@/hooks/useModal";
import { Icon } from "@iconify/react/dist/iconify.js";

const VendorModal = () => {
  const { closeModal } = useModal();
  return (
    <div className="relative p-6">
      <div
        onClick={closeModal}
        className="absolute -top-2 -right-2 z-50 bg-white hover:bg-primary-light w-[45px] h-[45px] rounded-full text-2xl text-[#E06518] font-bold border-primary border cursor-pointer flex items-center justify-center"
      >
        <Icon icon="ic:baseline-close" width="24" height="24" />
      </div>
      <span className="font-primary text-[20px] text-[#111D35] block">
        Vendor Registration
      </span>

      <div className="flex gap-[26px] mt-[28px]">
        <div className="flex flex-col flex-1">
          <Input
            type="text"
            labelName="Vendor Name"
            placeholder="Enter Vendor Name"
            className="w-full h-[40px] px-3 rounded border border-[#ccc] text-[14px] bg-white"
            required={true}
          />
        </div>
        <div className="flex flex-col flex-1">
          <Input
            type="text"
            labelName="Contact Person Name"
            placeholder="Enter Contact Person Name"
            className="w-full h-[40px] px-3 text-muted-foreground rounded border border-[#ccc] text-[14px] bg-white"
            required={true}
          />
        </div>
      </div>

      <div className="flex gap-[26px] mt-[20px]">
        <div className="flex flex-col flex-1">
          <label className="mb-1 text-[14px] font-medium text-[#111D35]">
            Phone Number
          </label>
          <Input
            type="tel"
            placeholder="+91"
            className="w-full h-[40px] px-3 rounded border border-[#ccc] text-[14px] bg-white"
            required={true}
          />
        </div>
        <div className="flex flex-col flex-1">
          <label className="mb-1 text-[14px] font-medium text-[#111D35]">
            Email
          </label>
          <Input
            type="email"
            labelName="Email Address"
            placeholder="Enter Email Address"
            className="w-full h-[40px] px-3 rounded border border-[#ccc] text-[14px] bg-white"
            required={true}
          />
        </div>
      </div>

      <div className="flex gap-[26px] mt-[20px]">
        <div className="flex flex-col flex-1">
          <Input
            type="text"
            labelName="Company Address"
            placeholder="Enter Company Address"
            className="w-full h-[40px] px-3 rounded border border-[#ccc] text-[14px] bg-white"
            required={true}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label
            className="text-[14px] font-primary text-[#26203B]"
            required={true}
          >
            Company Type
          </Label>
          <Select>
            <SelectTrigger
              id="company-type"
              className="w-full py-2 px-4 placeholder:text-sm placeholder:text-[#9C9AA5] h-12"
            >
              <SelectValue placeholder="Select your company type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel
                  required={true}
                  className="text-[16px] font-primary text-[#26203B]"
                >
                  Country of Operation
                </SelectLabel>
                <SelectLabel>Country of Operation</SelectLabel>
                <SelectItem value="apple">UAE</SelectItem>
                <SelectItem value="banana">Oman</SelectItem>
                <SelectItem value="blueberry">KSA</SelectItem>
                <SelectItem value="grapes">Qatar</SelectItem>
                <SelectItem value="pineapple">Bahrain</SelectItem>
                <SelectItem value="pineapple">Kuwait</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-center mt-[28px]">
        <button
          className="w-[191px] h-[40px] rounded text-white font-medium text-[14px]"
          style={{
            background: "linear-gradient(90deg, #E06518 0%, #E3802A 100%)",
          }}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default VendorModal;

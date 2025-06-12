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

const DriverModal = () => {
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
        Driver Registration
      </span>

      <div className="flex gap-[26px] mt-[28px]">
        <div className="flex flex-col flex-1">
          <Input
            type="text"
            labelName="Full Name"
            placeholder="Enter Full Name"
            className="w-full h-[40px] px-3 rounded border border-[#ccc] text-[14px] bg-white"
            required={true}
          />
        </div>
        <div className="flex flex-col flex-1">
          <Input
            type="text"
            labelName="Nationality"
            placeholder="Enter Nationality"
            className="w-full h-[40px] px-3 text-muted-foreground rounded border border-[#ccc] text-[14px] bg-white"
            required={true}
          />
        </div>
      </div>

      <div className="flex gap-[26px] mt-[20px]">
        <div className="flex flex-col flex-1">
          <Input
            type="type"
            labelName="Date of Birth"
            placeholder="Enter Date of Birth"
            className="w-full h-[40px] px-3 rounded border border-[#ccc] text-[14px] bg-white"
            required={true}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label
            className="text-[14px] font-primary text-[#26203B]"
            required={true}
          >
            Gender
          </Label>
          <Select>
            <SelectTrigger
              id="company-type"
              className="w-full h-[40px] py-2 px-4 placeholder:text-sm placeholder:text-[#9C9AA5] "
            >
              <SelectValue placeholder="Select your company type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel
                  required={false}
                  className="text-[16px] font-primary text-[#26203B]"
                >
                  Gender
                </SelectLabel>
                <SelectLabel>Gender</SelectLabel>
                <SelectItem value="Male">UAE</SelectItem>
                <SelectItem value="Female">Oman</SelectItem>
                <SelectItem value="Other">KSA</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col flex-1">
          <Input
            type="image"
            labelName="Image"
            placeholder="Upload Image"
            className="w-full h-[40px] px-3 rounded border border-[#ccc] text-[14px] bg-white"
            required={false}
          />
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

export default DriverModal;

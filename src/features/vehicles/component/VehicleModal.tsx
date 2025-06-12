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


const VehicleModal = () => {
  const { closeModal } = useModal();
  return (
    <div className="relative p-10">
      <div
        onClick={closeModal}
        className="absolute -top-2 -right-2 z-50 bg-white hover:bg-primary-light w-[45px] h-[45px] rounded-full text-2xl text-[#E06518] font-bold border-primary border cursor-pointer flex items-center justify-center"
      >
        <Icon icon="ic:baseline-close" width="24" height="24" />
      </div>
      <span className="font-primary text-[20px] text-[#111D35] block">
        Vehicle Registration
      </span>

      <div className="flex gap-[26px] mt-[28px]">
        <div className="flex flex-col flex-1">
          <Input
            type="text"
            labelName="Vehicle Name"
            placeholder="Enter Vehicle Name"
            className="w-full h-[40px] px-3 rounded border border-[#ccc] text-[14px] bg-white"
            required={true}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label
            className="text-[14px] font-primary text-[#26203B]"
            required={true}
          >
            Country of Registration
          </Label>
          <Select>
            <SelectTrigger
              id="company-type"
              className="w-full py-2 px-4 placeholder:text-sm placeholder:text-[#9C9AA5] h-[40px]"
            >
              <SelectValue placeholder="Select your company type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel
                  required={false}
                  className="text-[16px] font-primary text-[#26203B]"
                >
                  Country of Registration
                </SelectLabel>
                <SelectLabel>Country of Registration</SelectLabel>
                <SelectItem value="Male">UAE</SelectItem>
                <SelectItem value="Female">Oman</SelectItem>
                <SelectItem value="Other">KSA</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex gap-[26px] mt-[20px]">
        <div className="flex flex-col flex-1">
          <Input
            type="text"
            labelName="Vehicle Model"
            placeholder="Enter Vehicle Model"
            className="w-full h-[40px] px-3 rounded border border-[#ccc] text-[14px] bg-white"
            required={true}
          />
        </div>

        <div className="flex flex-col flex-1">
          <Input
            type="any"
            labelName="Year of Manufacture"
            placeholder="Enter Year of Manufacture"
            className="w-full h-[40px] px-3 rounded border border-[#ccc] text-[14px] bg-white"
            required={false}
          />
        </div>
      </div>

      <div className="flex gap-[26px] mt-[20px]">
        <div className="flex flex-col flex-1">
          <Input
            type="text"
            labelName="Plate Number"
            placeholder="Enter Plate Number"
            className="w-full h-[40px] px-3 rounded border border-[#ccc] text-[14px] bg-white"
            required={true}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label
            className="text-[14px] font-primary text-[#26203B]"
            required={true}
          >
            Vehicle Type
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
                  required={false}
                  className="text-[16px] font-primary text-[#26203B]"
                >
                  Vehicle Type
                </SelectLabel>
                <SelectLabel>Vehicle Type</SelectLabel>
                <SelectItem value="Male">UAE</SelectItem>
                <SelectItem value="Female">Oman</SelectItem>
                <SelectItem value="Other">KSA</SelectItem>
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

export default VehicleModal;

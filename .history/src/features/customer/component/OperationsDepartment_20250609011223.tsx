import Image from "next/image";
import React from "react";

import { PlusCircleIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Operations = () => {
  return (
    <div className="w-full bg-[#ffffff] rounded-[25px] flex-col pb-[10px] pt-[5px]">
      <span className="font-primary text-[16px] text-[#1C2B38] text-center ">
        Operational Department
      </span>
      <div className="flex flex-col items-center gap-[27px] mt-[14px] pl-[27px]">
        <div className="flex flex-row inline items-end gap-[24px]">
          <div className="flex flex-col gap-2 w-[442px] h-[76px]">
            <Label
              htmlFor="designation"
              className="text-[16px] font-primary text-[#26203B]"
            >
              Designation:
            </Label>
            <Select>
              <SelectTrigger className="h-[48px] bg-white py-2 px-4 placeholder:text-sm placeholder:text-[#9C9AA5]">
                <SelectValue placeholder="Select Designation" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="developer">Developer</SelectItem>
                  <SelectItem value="designer">Designer</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2 w-[442px] h-[76px]">
            <Label
              htmlFor="assign"
              className="text-[16px] font-primary text-[#26203B]"
            >
              Assign To:
            </Label>
            <Select>
              <SelectTrigger className="h-[48px] bg-white py-2 px-4 placeholder:text-sm placeholder:text-[#9C9AA5]">
                <SelectValue placeholder="Select Employee" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="john">Ram Malla</SelectItem>
                  <SelectItem value="jane">Shyaam Khadka</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="w-[85px] h-[35px] rounded-[37px] bg-gradient-to-b from-[#E06518] to-[#E3802A] p-[1px] self-end">
            <button className="w-full h-full flex items-center justify-center text-sm text-[#E06518] bg-white rounded-[35px]">
              Add <PlusCircleIcon className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>

        <div className="flex flex-row gap-4 items-center">
          <div
            className="relative w-[377px] h-[48px] rounded"
            style={{
              background: "linear-gradient(to right, #FF6502, #FF953D)",
            }}
          >
            <button
              className="w-full h-full rounded text-white text-[20px] font-medium flex items-center"
              style={{ paddingLeft: "98px" }}
            >
              Generate SOP
            </button>
            <div className="absolute right-[11.9px] top-[7px] w-[64px] h-[34px] bg-[#FFAE7A] rounded flex items-center justify-center">
              <Image src="/navigation.svg" alt="icon" width={20} height={12} />
            </div>
          </div>

          <div className="w-[50px] h-[48px] bg-[#FAFBFD] border border-[#D5D5D5] flex items-center justify-center rounded-md">
            <Image src="/Archive.svg" alt="icon" width={18} height={18} />
          </div>

          <Image src="/Pdf.svg" alt="pdf" width={163} height={27} />
        </div>
      </div>
    </div>
  );
};

export default Operations;

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
    <div className="w-full bg-[#ffffff] rounded-[25px] flex flex-col pb-2 pt-1 px-4 md:px-8">
      <span className="font-primary text-[16px] text-[#1C2B38] text-center">
        Operational Department
      </span>

      <div className="flex flex-col gap-7 mt-4">
        {/* Inputs + Add button */}
        <div className="flex flex-col md:flex-row md:flex-wrap md:items-end md:gap-6 lg:gap-[24px] justify-center lg:justify-start">
          {/* Designation */}
          <div className="flex flex-col gap-2 w-full md:max-w-[442px] h-[76px]">
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

          {/* Assign To */}
          <div className="flex flex-col gap-2 w-full md:max-w-[442px] h-[76px]">
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

          {/* Add button */}
          <div className="w-full md:w-[85px] h-[35px] rounded-[37px] bg-gradient-to-b from-[#E06518] to-[#E3802A] p-[1px] self-start md:self-end">
            <button className="w-full h-full flex items-center justify-center text-sm text-[#E06518] bg-white rounded-[35px]">
              Add <PlusCircleIcon className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>

        {/* Bottom buttons */}
        <div className="flex flex-col md:flex-row md:items-center md:gap-4 justify-center lg:justify-start">
          <div
            className="relative w-full max-w-[377px] h-[48px] rounded mb-4 md:mb-0"
            style={{
              background: "linear-gradient(to right, #FF6502, #FF953D)",
            }}
          >
            <button className="w-full h-full rounded text-white text-[20px] font-medium flex items-center pl-[30%] sm:pl-[98px]">
              Generate SOP
            </button>
            <div className="absolute right-3 top-1 w-[64px] h-[34px] bg-[#FFAE7A] rounded flex items-center justify-center">
              <Image src="/navigation.svg" alt="icon" width={20} height={12} />
            </div>
          </div>

          <div className="w-[50px] h-[48px] bg-[#FAFBFD] border border-[#D5D5D5] flex items-center justify-center rounded-md mb-4 md:mb-0">
            <Image src="/Archive.svg" alt="icon" width={18} height={18} />
          </div>

          <Image src="/Pdf.svg" alt="pdf" width={163} height={27} />
        </div>
      </div>
    </div>
  );
};

export default Operations;

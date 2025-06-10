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
import { Button } from "@/components/ui/button";

const Operations = () => {
  return (
    <div className="w-full bg-white rounded-[25px] flex flex-col items-center pb-4 pt-2 px-4 md:px-8">
      <span className="font-primary text-[16px] text-[#1C2B38] text-center">
        Operational Department
      </span>

      <div className="flex flex-col items-center gap-7 mt-4 w-full max-w-[920px]">
        <div className="flex flex-col md:flex-row md:items-end md:flex-wrap md:gap-6 w-full">
          <div className="flex flex-col gap-2 w-full md:flex-1 min-w-[280px] h-auto md:h-[76px]">
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

          <div className="flex flex-col gap-2 w-full md:flex-1 min-w-[280px] h-auto md:h-[76px] mt-4 md:mt-0">
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

          <div className="w-full md:w-[85px] h-[35px] rounded-[37px] bg-gradient-to-b from-[#E06518] to-[#E3802A] p-[1px] mt-4 md:mt-auto self-start md:self-end flex-shrink-0">
            <button className="w-full h-full flex items-center justify-center text-sm text-[#E06518] bg-white rounded-[35px]">
              Add <PlusCircleIcon className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-center w-full justify-center max-w-[920px]">
          <div className="relative max-w-[250px] min-w-[160px] rounded-[7px] sm:w-[377px] h-[48px] bg-linear-to-r from-[#FF6502] to to-[#FF953D]">
            <Button
              className="h-full w-full rounded-[10px] text-white font-medium flex items-center justify-center px-3
  text-[12px] sm:text-[10px] md:text-[16px] lg:text-[16px] 
  hover:bg-[#FF6502] transition-colors duration-200"
            >
              Generate SOP
            </Button>

            <div className="absolute right-3 top-2 w-[30px] h-[30px] sm:w-[40px] sm:h-[34px] bg-[#FFAE7A] rounded flex items-center justify-center sm:mx-[2px]">
              <Image src="/navigation.svg" alt="icon" width={20} height={12} />
            </div>
          </div>

          <div className="w-[50px] h-[48px] bg-[#FAFBFD] border border-[#D5D5D5] flex items-center justify-center rounded-md flex-shrink-0">
            <Image src="/Archive.svg" alt="icon" width={18} height={18} />
          </div>

          <Image
            src="/Pdf.svg"
            alt="pdf"
            width={80}
            height={10}
            className="item-center"
          />
        </div>
      </div>
    </div>
  );
};

export default Operations;

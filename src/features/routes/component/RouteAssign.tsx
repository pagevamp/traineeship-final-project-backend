import React from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const RouteAssign = () => {
  return (
    <div className="w-full max-w-screen-2xl mx-auto flex flex-col gap-6 py-6 px-4">
      <span className="font-primary text-[16px] 2xl:text-[20px] text-[#1C2B38] text-start font-light">
        Pick Number:<span className="font-secondary"> 455820-00980</span>
      </span>
      <div className="flex flex-col gap-1">
        <span className="font-primary text-[16px] 2xl:text-[20px] text-[#1C2B38] text-start">
          Assign
        </span>
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 2xl:grid-cols-3 gap-12 w-full">
          <div className="flex flex-col gap-2 w-full">
            <Label
              htmlFor="vehicle"
              className="text-[14px] 2xl:text-[18px] font-primary text-[#26203B]"
            >
              Vehicle :
            </Label>
            <Select>
              <SelectTrigger
                id="vehicle"
                className="bg-white h-[46px] 2xl:h-[52px] py-2 px-4 2xl:text-[16px] placeholder:text-sm 2xl:placeholder:text-base placeholder:text-[#9C9AA5] w-full"
              >
                <SelectValue placeholder="Select Vehicle" />
              </SelectTrigger>
              <SelectContent className="2xl:text-[16px]">
                <SelectGroup>
                  <SelectLabel>Select Vehicle</SelectLabel>
                  <SelectItem value="net-15">Net 15</SelectItem>
                  <SelectItem value="net-30">Net 30</SelectItem>
                  <SelectItem value="net-45">Net 45</SelectItem>
                  <SelectItem value="net-60">Net 60</SelectItem>
                  <SelectItem value="net-90">Net 90</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2 w-full">
            <Label
              htmlFor="driver"
              className="text-[14px] 2xl:text-[18px] font-primary text-[#26203B]"
            >
              Driver :
            </Label>
            <Select>
              <SelectTrigger
                id="driver"
                className="bg-white h-[46px] 2xl:h-[52px] py-2 px-4 2xl:text-[16px] placeholder:text-sm 2xl:placeholder:text-base placeholder:text-[#9C9AA5] w-full"
              >
                <SelectValue placeholder="Select Driver" />
              </SelectTrigger>
              <SelectContent className="2xl:text-[16px]">
                <SelectGroup>
                  <SelectLabel>Select Driver</SelectLabel>
                  <SelectItem value="net-15">Net 15</SelectItem>
                  <SelectItem value="net-30">Net 30</SelectItem>
                  <SelectItem value="net-45">Net 45</SelectItem>
                  <SelectItem value="net-60">Net 60</SelectItem>
                  <SelectItem value="net-90">Net 90</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-end justify-end w-full">
            <Button className="bg-gradient-to-r from-[#FF6502] to-[#E3802A] font-primary font-light text-white h-[46px] 2xl:h-[52px] w-full lg:w-[180px] 2xl:w-[200px] text-[12px] 2xl:text-[14px]">
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RouteAssign;

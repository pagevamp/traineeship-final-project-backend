import { Input } from "@/components/ui/input";
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
import React from "react";

const Financial = () => {
  return (
    <div className="w-full flex flex-col gap-6 items-center">
      <span className="font-primary text-[16px] text-[#1C2B38] text-center">
        Financial Department
      </span>

      <div className="flex flex-wrap gap-6 w-full">
        <div className="flex flex-col gap-2 w-full sm:w-[442px] h-[76px]">
          <Input
            id="credit-amount"
            name="credit-amount"
            labelName="Credit Amount:"
            placeholder="Enter Credit Amount"
            type="text"
            className="h-[48px] bg-white placeholder:text-sm placeholder:text-[#9C9AA5] py-2 px-4"
          />
        </div>

        <div className="flex flex-col gap-2 w-full sm:w-[442px] h-[76px]">
          <Label
            htmlFor="net-term"
            className="text-[14px] font-primary text-[#26203B]"
          >
            Net Term:
          </Label>
          <Select>
            <SelectTrigger
              id="net-term"
              className="h-[48px] bg-white py-2 px-4 placeholder:text-sm placeholder:text-[#9C9AA5]"
            >
              <SelectValue placeholder="Select your net term" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Net Term</SelectLabel>
                <SelectItem value="net-15">Net 15</SelectItem>
                <SelectItem value="net-30">Net 30</SelectItem>
                <SelectItem value="net-45">Net 45</SelectItem>
                <SelectItem value="net-60">Net 60</SelectItem>
                <SelectItem value="net-90">Net 90</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default Financial;

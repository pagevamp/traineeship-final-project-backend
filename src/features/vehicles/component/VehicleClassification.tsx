import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";

const VehicleClassification = () => {
  return (
    <div className="text-[16px] max-w-[500px] grid grid-cols-2 w-full px-4 sm:px-6 md:px-8 lg:px-0 justify-items gap-4">
      <div className="flex flex-col gap-2">
        <Label
          className="text-[14px] font-primary text-[#26203B]"
          required={true}
        >
          Temperature Controlled
        </Label>
        <Select>
          <SelectTrigger
            id="temperature-controlled"
            className="w-full py-2 px-4 placeholder:text-sm placeholder:text-[#9C9AA5] h-12"
          >
            <SelectValue placeholder="Select option" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Temperature Control</SelectLabel>
              <SelectItem value="yes">Yes</SelectItem>
              <SelectItem value="no">No</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <Input
          className="w-full py-2 px-4 placeholder:text-xs placeholder:text-[#9C9AA5] h-12"
          id="temperature-range"
          name="temperature-range"
          labelName="Temperature Range (if Yes)"
          placeholder="e.g., -20°C to 5°C"
          type="text"
          required={false}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label
          className="text-[14px] font-primary text-[#26203B]"
          required={true}
        >
          DG Certified
        </Label>
        <Select>
          <SelectTrigger
            id="dg-certified"
            className="w-full py-2 px-4 placeholder:text-sm placeholder:text-[#9C9AA5] h-12"
          >
            <SelectValue placeholder="Select option" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Dangerous Goods</SelectLabel>
              <SelectItem value="yes">Yes</SelectItem>
              <SelectItem value="no">No</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <Label
          className="text-[14px] font-primary text-[#26203B]"
          required={false}
        >
          GDP Compliant
        </Label>
        <Select>
          <SelectTrigger
            id="gdp-compliant"
            className="w-full py-2 px-4 placeholder:text-sm placeholder:text-[#9C9AA5] h-12"
          >
            <SelectValue placeholder="Select option" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Pharmaceutical Compliance</SelectLabel>
              <SelectItem value="yes">Yes</SelectItem>
              <SelectItem value="no">No</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <Input
          className="w-full py-2 px-4 placeholder:text-xs placeholder:text-[#9C9AA5] h-12"
          id="capacity-weight"
          name="capacity-weight"
          labelName="Capacity (Weight)"
          placeholder="Enter maximum weight in KG/Tons"
          type="number"
          min="0"
          required={true}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Input
          className="w-full py-2 px-4 placeholder:text-xs placeholder:text-[#9C9AA5] h-12"
          id="volume-capacity"
          name="volume-capacity"
          labelName="Volume Capacity (CBM)"
          placeholder="Enter maximum volume in cubic meters"
          type="number"
          min="0"
          step="0.01"
          required={true}
        />
      </div>
    </div>
  );
};

export default VehicleClassification;

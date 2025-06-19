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

const commonInputClasses =
  "h-10 px-3 text-sm border border-gray-300 rounded-md w-full";

const VehicleClassification = () => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-2">
        <div className="flex flex-col gap-1">
          <Label className="text-sm text-[#26203B]">
            Temperature Controlled
          </Label>
          <Select>
            <SelectTrigger
              id="temperature-controlled"
              className={commonInputClasses}
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

        <div className="flex flex-col gap-1">
          <Label className="text-sm text-[#26203B]">Temperature Range</Label>
          <Input
            className={commonInputClasses}
            id="temperature-range"
            placeholder="e.g., -20°C to 5°C"
            type="text"
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label className="text-sm text-[#26203B]">DG Certified</Label>
          <Select>
            <SelectTrigger id="dg-certified" className={commonInputClasses}>
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

        <div className="flex flex-col gap-1">
          <Label className="text-sm text-[#26203B]">GDP Compliant</Label>
          <Select>
            <SelectTrigger id="gdp-compliant" className={commonInputClasses}>
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

        <div className="flex flex-col gap-1">
          <Label className="text-sm text-[#26203B]">Capacity (Weight)</Label>
          <Input
            className={commonInputClasses}
            id="capacity-weight"
            placeholder="Max weight in KG/Tons"
            type="number"
            min="0"
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label className="text-sm text-[#26203B]">
            Volume Capacity (CBM)
          </Label>
          <Input
            className={commonInputClasses}
            id="volume-capacity"
            placeholder="Max volume in m³"
            type="number"
            min="0"
            step="0.01"
          />
        </div>
      </div>
    </div>
  );
};

export default VehicleClassification;

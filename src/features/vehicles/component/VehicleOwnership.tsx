import React from "react";
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

const commonSelectTriggerClasses =
  "w-full py-2 px-3 placeholder:text-xs placeholder:text-[#9C9AA5] h-10 text-sm border border-gray-300 rounded-md";

const VehicleOwnership = () => {
  return (
    <div className="text-[14px] max-w-full grid grid-cols-3 gap-x-3 gap-y-2 px-4 sm:px-6 md:px-8 lg:px-0">
      <div className="flex flex-col gap-1">
        <Label className="text-xs font-primary text-[#26203B]">
          Ownership Type
        </Label>
        <Select>
          <SelectTrigger
            id="ownership-type"
            className={commonSelectTriggerClasses}
          >
            <SelectValue placeholder="Select ownership type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel className="text-xs">Ownership Options</SelectLabel>
              <SelectItem value="owned">Owned</SelectItem>
              <SelectItem value="leased">Leased</SelectItem>
              <SelectItem value="vendor-supplied">Vendor-supplied</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-1">
        <Label className="text-xs font-primary text-[#26203B]">
          Assigned Vendor (if leased)
        </Label>
        <Select>
          <SelectTrigger
            id="assigned-vendor"
            className={commonSelectTriggerClasses}
          >
            <SelectValue placeholder="Select vendor" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel className="text-xs">Vendor List</SelectLabel>
              <SelectItem value="vendor-1">ABC Transport</SelectItem>
              <SelectItem value="vendor-2">XYZ Logistics</SelectItem>
              <SelectItem value="vendor-3">Global Fleet</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-1">
        <Label className="text-xs font-primary text-[#26203B]">
          Driver Assigned
        </Label>
        <Select>
          <SelectTrigger
            id="driver-assigned"
            className={commonSelectTriggerClasses}
          >
            <SelectValue placeholder="Select driver" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel className="text-xs">Driver List</SelectLabel>
              <SelectItem value="driver-1">John Smith (DL-12345)</SelectItem>
              <SelectItem value="driver-2">Sarah Johnson (DL-67890)</SelectItem>
              <SelectItem value="driver-3">Michael Brown (DL-54321)</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default VehicleOwnership;

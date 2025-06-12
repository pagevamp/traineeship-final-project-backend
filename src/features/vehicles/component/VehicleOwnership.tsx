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

const VehicleOwnership = () => {
  return (
    <div className="text-[14px] max-w-[500px] grid grid-cols-2 w-full px-4 sm:px-6 md:px-8 lg:px-0 gap-3 justify-items-stretch">
      <div className="flex flex-col gap-1.5">
        <Label className="text-[12px] font-primary text-[#26203B]" required>
          Ownership Type
        </Label>
        <Select>
          <SelectTrigger
            id="ownership-type"
            className="w-full py-1.5 px-3 placeholder:text-xs placeholder:text-[#9C9AA5] h-9 text-sm"
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

      <div className="flex flex-col gap-1.5">
        <Label
          className="text-[12px] font-primary text-[#26203B]"
          required={false}
        >
          Assigned Vendor (if leased)
        </Label>
        <Select>
          <SelectTrigger
            id="assigned-vendor"
            className="w-full py-1.5 px-3 placeholder:text-xs placeholder:text-[#9C9AA5] h-9 text-sm"
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

      <div className="flex flex-col gap-1.5 col-span-2">
        <Label
          className="text-[12px] font-primary text-[#26203B]"
          required={false}
        >
          Driver Assigned
        </Label>
        <Select>
          <SelectTrigger
            id="driver-assigned"
            className="w-full py-1.5 px-3 placeholder:text-xs placeholder:text-[#9C9AA5] h-9 text-sm"
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

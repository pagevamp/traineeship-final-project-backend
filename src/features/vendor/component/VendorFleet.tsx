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

const VendorFleet = () => {
  return (
    <div className="text-[14px] w-full grid grid-cols-3 gap-3 px-4 sm:px-6 md:px-8 lg:px-0 justify-items-stretch">
      <div className="flex flex-col gap-1.5">
        <Label className="text-[13px] font-primary text-[#26203B]" required>
          Type of Vehicles Offered
        </Label>
        <Select>
          <SelectTrigger
            id="vehicle-types"
            className="w-full py-1.5 px-3 placeholder:text-xs placeholder:text-[#9C9AA5] h-10"
          >
            <SelectValue placeholder="Select vehicle types" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Vehicle Types</SelectLabel>
              <SelectItem value="13.5M Box">13.5M Box</SelectItem>
              <SelectItem value="Flatbed">Flatbed</SelectItem>
              <SelectItem value="Reefer">Reefer</SelectItem>
              <SelectItem value="7 Ton">7 Ton</SelectItem>
              <SelectItem value="3 Ton">3 Ton</SelectItem>
              <SelectItem value="Low Bed">Low Bed</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-1.5">
        <Input
          className="w-full py-1.5 px-3 placeholder:text-xs placeholder:text-[#9C9AA5] h-10"
          id="total-vehicles"
          name="total-vehicles"
          labelName="Total Number of Vehicles"
          placeholder="Enter total number of vehicles"
          type="number"
          min="0"
          required
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label className="text-[13px] font-primary text-[#26203B]" required>
          Type of Cargo Supported
        </Label>
        <Select>
          <SelectTrigger
            id="cargo-types"
            className="w-full py-1.5 px-3 placeholder:text-xs placeholder:text-[#9C9AA5] h-10"
          >
            <SelectValue placeholder="Select cargo types" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Cargo Types</SelectLabel>
              <SelectItem value="General">General</SelectItem>
              <SelectItem value="DG (Dangerous Goods)">
                DG (Dangerous Goods)
              </SelectItem>
              <SelectItem value="Chilled">Chilled</SelectItem>
              <SelectItem value="Ambient">Ambient</SelectItem>
              <SelectItem value="Reefer">Reefer</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label className="text-[13px] font-primary text-[#26203B]" required>
          Coverage Area / Route
        </Label>
        <Select>
          <SelectTrigger
            id="coverage-areas"
            className="w-full py-1.5 px-3 placeholder:text-xs placeholder:text-[#9C9AA5] h-10"
          >
            <SelectValue placeholder="Select coverage areas" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Coverage Areas</SelectLabel>
              <SelectItem value="UAE→Oman">UAE→Oman</SelectItem>
              <SelectItem value="UAE→KSA">UAE→KSA</SelectItem>
              <SelectItem value="GCC-wide">GCC-wide</SelectItem>
              <SelectItem value="Local delivery">Local delivery</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label className="text-[13px] font-primary text-[#26203B]" required>
          Operational Days
        </Label>
        <Select>
          <SelectTrigger
            id="operational-days"
            className="w-full py-1.5 px-3 placeholder:text-xs placeholder:text-[#9C9AA5] h-10"
          >
            <SelectValue placeholder="Select operational days" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Days of Week</SelectLabel>
              <SelectItem value="Monday">Monday</SelectItem>
              <SelectItem value="Tuesday">Tuesday</SelectItem>
              <SelectItem value="Wednesday">Wednesday</SelectItem>
              <SelectItem value="Thursday">Thursday</SelectItem>
              <SelectItem value="Friday">Friday</SelectItem>
              <SelectItem value="Saturday">Saturday</SelectItem>
              <SelectItem value="Sunday">Sunday</SelectItem>
              <SelectItem value="24/7">24/7</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-1.5">
        <Input
          className="w-full py-1.5 px-3 placeholder:text-xs placeholder:text-[#9C9AA5] h-10"
          id="emergency-sla"
          name="emergency-sla"
          labelName="Emergency Response SLA (hours)"
          placeholder="Enter maximum response time in hours"
          type="number"
          min="0"
          required={false}
        />
      </div>
    </div>
  );
};

export default VendorFleet;

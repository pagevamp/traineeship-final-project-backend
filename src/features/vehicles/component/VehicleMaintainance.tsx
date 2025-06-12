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

const VehicleMaintenance = () => {
  const [gpsInstalled, setGpsInstalled] = React.useState<string>("no");

  return (
    <div className="text-[16px] max-w-[500px] grid grid-cols-2 w-full px-4 sm:px-6 md:px-8 lg:px-0 justify-items gap-4">
      <div className="flex flex-col gap-2 col-span-2">
        <Label
          className="text-[14px] font-primary text-[#26203B]"
          required={true}
        >
          Next Service Date
        </Label>
        <Input
          className="w-full py-2 px-4 placeholder:text-xs placeholder:text-[#9C9AA5] h-12"
          id="next-service-date"
          name="next-service-date"
          type="date"
          min={new Date().toISOString().split("T")[0]}
          required={true}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label
          className="text-[14px] font-primary text-[#26203B]"
          required={true}
        >
          Odometer Reading (KM)
        </Label>
        <Input
          className="w-full py-2 px-4 placeholder:text-xs placeholder:text-[#9C9AA5] h-12"
          id="odometer-reading"
          name="odometer-reading"
          placeholder="Enter current KM"
          type="number"
          min="0"
          step="1"
          required={true}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label
          className="text-[14px] font-primary text-[#26203B]"
          required={true}
        >
          Fuel Type
        </Label>
        <Select>
          <SelectTrigger className="w-full py-2 px-4 placeholder:text-sm placeholder:text-[#9C9AA5] h-12">
            <SelectValue placeholder="Select fuel type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Fuel Types</SelectLabel>
              <SelectItem value="diesel">Diesel</SelectItem>
              <SelectItem value="petrol">Petrol</SelectItem>
              <SelectItem value="electric">Electric</SelectItem>
              <SelectItem value="hybrid">Hybrid</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2 col-span-2">
        <Label
          className="text-[14px] font-primary text-[#26203B]"
          required={true}
        >
          GPS Tracker Installed
        </Label>
        <Select value={gpsInstalled} onValueChange={setGpsInstalled}>
          <SelectTrigger className="w-full py-2 px-4 placeholder:text-sm placeholder:text-[#9C9AA5] h-12">
            <SelectValue placeholder="Select option" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="yes">Yes</SelectItem>
              <SelectItem value="no">No</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {gpsInstalled === "yes" && (
        <div className="flex flex-col gap-2 col-span-2">
          <Label className="text-[14px] font-primary text-[#26203B]">
            Device ID
          </Label>
          <Input
            className="w-full py-2 px-4 placeholder:text-xs placeholder:text-[#9C9AA5] h-12"
            id="device-id"
            name="device-id"
            placeholder="Enter GPS device identifier"
            type="text"
          />
        </div>
      )}
    </div>
  );
};

export default VehicleMaintenance;

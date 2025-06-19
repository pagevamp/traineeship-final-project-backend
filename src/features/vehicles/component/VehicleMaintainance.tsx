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
    <div className="w-full max-w-3xl mx-auto px-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <Label className="text-sm font-medium text-[#26203B]" required>
            Next Service Date
          </Label>
          <Input
            className="w-full h-10 py-1.5 px-3 text-sm placeholder:text-xs placeholder:text-[#9C9AA5]"
            id="next-service-date"
            name="next-service-date"
            type="date"
            min={new Date().toISOString().split("T")[0]}
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label className="text-sm font-medium text-[#26203B]" required>
            Odometer Reading (KM)
          </Label>
          <Input
            className="w-full h-10 py-1.5 px-3 text-sm placeholder:text-xs placeholder:text-[#9C9AA5]"
            id="odometer-reading"
            name="odometer-reading"
            placeholder="Enter current KM"
            type="number"
            min="0"
            step="1"
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label className="text-sm font-medium text-[#26203B]" required>
            Fuel Type
          </Label>
          <Select>
            <SelectTrigger className="w-full h-10 py-1.5 px-3 text-sm placeholder:text-[#9C9AA5]">
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

        <div className="flex flex-col gap-1">
          <Label className="text-sm font-medium text-[#26203B]" required>
            GPS Tracker Installed
          </Label>
          <Select value={gpsInstalled} onValueChange={setGpsInstalled}>
            <SelectTrigger className="w-full h-10 py-1.5 px-3 text-sm placeholder:text-[#9C9AA5]">
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
          <div className="flex flex-col gap-1 col-span-2">
            <Label className="text-sm font-medium text-[#26203B]">
              Device ID
            </Label>
            <Input
              className="w-full h-10 py-1.5 px-3 text-sm placeholder:text-xs placeholder:text-[#9C9AA5]"
              id="device-id"
              name="device-id"
              placeholder="Enter GPS device identifier"
              type="text"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default VehicleMaintenance;

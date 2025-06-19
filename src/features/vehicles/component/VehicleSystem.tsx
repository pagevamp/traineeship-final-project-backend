import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

const VehicleSystem = () => {
  const [status, setStatus] = React.useState<string>("active");

  const vehicleId = "VEH-1001";
  const createdBy = "Admin User";
  const createdDate = new Date().toLocaleDateString();

  return (
    <div className="max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      <div className="flex flex-col gap-1">
        <Label className="text-sm font-medium text-[#26203B]" required>
          Vehicle ID
        </Label>
        <Input
          value={vehicleId}
          readOnly
          className="bg-gray-100 h-10 py-1.5 px-3 text-sm"
        />
      </div>

      <div className="flex flex-col gap-1">
        <Label className="text-sm font-medium text-[#26203B]" required>
          Status
        </Label>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="h-10 py-1.5 px-3 text-sm bg-white">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="under_maintenance">
                Under Maintenance
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-1">
        <Label className="text-sm font-medium text-[#26203B]" required>
          Created By
        </Label>
        <Input
          value={createdBy}
          readOnly
          className="bg-gray-100 h-10 py-1.5 px-3 text-sm"
        />
      </div>

      <div className="flex flex-col gap-1">
        <Label className="text-sm font-medium text-[#26203B]" required>
          Created Date
        </Label>
        <Input
          value={createdDate}
          readOnly
          className="bg-gray-100 h-10 py-1.5 px-3 text-sm"
        />
      </div>
    </div>
  );
};

export default VehicleSystem;

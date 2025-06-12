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
    <div className="max-w-md space-y-4">
      <div className="space-y-2">
        <Label className="text-sm font-medium" required>
          Vehicle ID
        </Label>
        <Input value={vehicleId} readOnly className="bg-gray-100" />
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium" required>
          Status
        </Label>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger>
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

      <div className="space-y-2">
        <Label className="text-sm font-medium" required>
          Created By
        </Label>
        <Input value={createdBy} readOnly className="bg-gray-100" />
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium" required>
          Created Date
        </Label>
        <Input value={createdDate} readOnly className="bg-gray-100" />
      </div>
    </div>
  );
};

export default VehicleSystem;

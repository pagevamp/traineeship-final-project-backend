import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

const DriverEmployment = () => {
  const [selectedVehicles, setSelectedVehicles] = React.useState<string[]>([]);
  const driverId = "ARC1001";

  const toggleVehicleSelection = (vehicleId: string) => {
    setSelectedVehicles((prev) =>
      prev.includes(vehicleId)
        ? prev.filter((id) => id !== vehicleId)
        : [...prev, vehicleId]
    );
  };

  return (
    <div className="w-full px-6 sm:px-8 md:px-10 lg:px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-between">
        <div className="space-y-6">
          <div className="space-y-2">
            <Label className="text-sm font-medium" required>
              Vehicle ID
            </Label>
            <Input value={driverId} readOnly className="bg-gray-100 h-12" />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium" required>
              Hiring Date
            </Label>
            <Input type="date" className="w-full h-12" required />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium" required>
              Contract Type
            </Label>
            <Select>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Select contract type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="permanent">Permanent</SelectItem>
                <SelectItem value="contract">Contract</SelectItem>
                <SelectItem value="temporary">Temporary</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label className="text-sm font-medium" required>
              Availability Status
            </Label>
            <Select>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="full_time">Full-time</SelectItem>
                <SelectItem value="part_time">Part-time</SelectItem>
                <SelectItem value="vendor_supplied">Vendor-supplied</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">Salary</Label>
            <Select>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Select option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">Yes</SelectItem>
                <SelectItem value="no">No</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">Notice Period</Label>
            <Select>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Select notice period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1_month">1 Month</SelectItem>
                <SelectItem value="2_months">2 Months</SelectItem>
                <SelectItem value="3_months">3 Months</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverEmployment;

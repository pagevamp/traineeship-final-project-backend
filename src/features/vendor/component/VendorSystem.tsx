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
import { format } from "date-fns";

const VendorSystem = ({ isAdmin = false }) => {
  const vendorId = `VEN-${Math.random()
    .toString(36)
    .substring(2, 10)
    .toUpperCase()}`;
  const createdBy = "admin.user";
  const dateCreated = new Date();

  const [status, setStatus] = React.useState("Active");

  return (
    <div className="text-[15px] w-full max-w-3xl px-4 sm:px-6 md:px-8 lg:px-0 grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div className="flex flex-col gap-1 w-full">
        <Label className="text-sm font-medium text-[#26203B]">Vendor ID</Label>
        <Input
          className="w-full h-9 px-3 bg-gray-100 text-gray-600 text-sm"
          id="vendor-id"
          name="vendor-id"
          value={vendorId}
          type="text"
          readOnly
        />
      </div>

      <div className="flex flex-col gap-1 w-full">
        <Label className="text-sm font-medium text-[#26203B]">Status</Label>
        {isAdmin ? (
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-full h-9 px-3 text-sm">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        ) : (
          <Input
            className="w-full h-9 px-3 bg-gray-100 text-gray-600 text-sm"
            value={status}
            type="text"
            readOnly
          />
        )}
      </div>

      <div className="flex flex-col gap-1 w-full">
        <Label className="text-sm font-medium text-[#26203B]">Created By</Label>
        <Input
          className="w-full h-9 px-3 bg-gray-100 text-gray-600 text-sm"
          id="created-by"
          name="created-by"
          value={createdBy}
          type="text"
          readOnly
        />
      </div>

      <div className="flex flex-col gap-1 w-full">
        <Label className="text-sm font-medium text-[#26203B]">
          Date Created
        </Label>
        <Input
          className="w-full h-9 px-3 bg-gray-100 text-gray-600 text-sm"
          id="date-created"
          name="date-created"
          value={format(dateCreated, "PPpp")}
          type="text"
          readOnly
        />
      </div>
    </div>
  );
};

export default VendorSystem;

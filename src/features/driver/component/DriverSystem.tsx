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

interface FormFieldProps {
  labelName: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}

const FormField = ({
  labelName,
  required = false,
  children,
  className = "",
}: FormFieldProps) => (
  <div className={`space-y-2 ${className}`}>
    <Label className="text-sm font-medium" required={required}>
      {labelName}
    </Label>
    {children}
  </div>
);

const DriverSystem = () => {
  const [status, setStatus] = React.useState<string>("active");

  const driverId = "ARC001";
  const createdBy = "User";
  const createdDate = new Date().toLocaleDateString();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:col-span-2">
        <FormField labelName="Driver ID">
          <Input value={driverId} readOnly className="bg-gray-100/50 h-10" />
        </FormField>

        <FormField labelName="Created By">
          <Input value={createdBy} readOnly className="bg-gray-100/50 h-10" />
        </FormField>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:col-span-2">
        <FormField labelName="Status" required>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="h-10">
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
        </FormField>

        <FormField labelName="Audit Logs">
          <Input value={createdDate} readOnly className="bg-gray-100/50 h-10" />
        </FormField>
      </div>
    </div>
  );
};

export default DriverSystem;

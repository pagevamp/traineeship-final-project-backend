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

interface FormFieldProps {
  labelName: string;
  required?: boolean;
  children: React.ReactNode;
  description?: string;
  className?: string;
}

const FormField = ({
  labelName,
  required = false,
  children,
  description,
  className = "",
}: FormFieldProps) => (
  <div className={`flex flex-col h-full ${className}`}>
    <Label className="text-sm font-medium mb-1" required={required}>
      {labelName}
    </Label>
    <div className="flex-1">
      {children}
      {description && (
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      )}
    </div>
  </div>
);

const DriverLicense = () => {
  const licenseTypes = [
    { id: "heavy", name: "Heavy" },
    { id: "medium", name: "Medium" },
    { id: "light", name: "Light" },
  ];

  const gccCountries = [
    { id: "uae", name: "United Arab Emirates" },
    { id: "saudi", name: "Saudi Arabia" },
    { id: "qatar", name: "Qatar" },
    { id: "kuwait", name: "Kuwait" },
    { id: "bahrain", name: "Bahrain" },
    { id: "oman", name: "Oman" },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4 w-full max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-card rounded-lg p-3 h-full">
          <FormField labelName="Driver's License Number" required>
            <Input
              type="text"
              placeholder="Enter license number"
              maxLength={50}
              required
              className="w-full h-10"
            />
          </FormField>
        </div>

        <div className="bg-card rounded-lg p-3 h-full">
          <FormField labelName="Upload License Copy" required>
            <Input
              type="file"
              accept=".pdf,.jpg,.png"
              required
              className="w-full h-10"
            />
          </FormField>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-card rounded-lg p-3 h-full">
          <FormField labelName="License Expiry Date" required>
            <Input
              type="date"
              required
              min={new Date().toISOString().split("T")[0]}
              className="w-full h-10"
            />
          </FormField>
        </div>

        <div className="bg-card rounded-lg p-3 h-full">
          <FormField labelName="Emirates ID / National ID" required>
            <Input
              type="file"
              accept=".pdf,.jpg,.png"
              required
              className="w-full h-10"
            />
          </FormField>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-card rounded-lg p-3 h-full">
          <FormField labelName="License Type" required>
            <Select>
              <SelectTrigger className="w-full h-10">
                <SelectValue placeholder="Select license type" />
              </SelectTrigger>
              <SelectContent>
                {licenseTypes.map((type) => (
                  <SelectItem key={type.id} value={type.id}>
                    {type.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>
        </div>

        <div className="bg-card rounded-lg p-3 h-full">
          <FormField labelName="Passport Copy" required>
            <Input
              type="file"
              accept=".pdf,.jpg,.png"
              required
              className="w-full h-10"
            />
          </FormField>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-card rounded-lg p-3 h-full">
          <FormField labelName="License Country" required>
            <Select>
              <SelectTrigger className="w-full h-10">
                <SelectValue placeholder="Select issuing country" />
              </SelectTrigger>
              <SelectContent>
                {gccCountries.map((country) => (
                  <SelectItem key={country.id} value={country.id}>
                    {country.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>
        </div>

        <div className="bg-card rounded-lg p-3 h-full">
          <FormField labelName="Visa / Work Permit" required>
            <Input
              type="file"
              accept=".pdf,.jpg,.png"
              required
              className="w-full h-10"
            />
          </FormField>
        </div>
      </div>

      <div className="col-span-1 md:col-span-2">
        <div className="bg-card rounded-lg p-3 h-full">
          <FormField
            labelName="Police Clearance Certificate"
            description="Recommended for security-sensitive shipments"
            className="md:w-1/2"
          >
            <Input
              type="file"
              accept=".pdf,.jpg,.png"
              className="w-full h-10"
            />
          </FormField>
        </div>
      </div>
    </div>
  );
};

export default DriverLicense;

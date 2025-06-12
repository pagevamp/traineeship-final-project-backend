import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UploadIcon } from "lucide-react";

interface FileInputProps {
  id: string;
  labelName: string;
  required?: boolean;
  accept?: string;
}

const FileInput: React.FC<FileInputProps> = ({
  id,
  labelName,
  required = false,
  accept = ".pdf,.jpg,.jpeg",
}) => {
  return (
    <div className="flex flex-col gap-2">
      <Label
        className="text-[14px] font-primary text-[#26203B]"
        required={required}
      >
        {labelName}
      </Label>
      <div className="flex items-center gap-2">
        <Input
          id={id}
          type="file"
          accept={accept}
          className="hidden"
          required={required}
        />
        <Label
          htmlFor={id}
          className="flex items-center gap-2 border rounded-md px-4 py-2 w-full h-12 cursor-pointer hover:bg-gray-50"
        >
          <UploadIcon className="h-4 w-4" />
          <span>Choose file (PDF/JPG)</span>
        </Label>
      </div>
    </div>
  );
};

const DriverDocuments = () => {
  return (
    <div className="text-[16px] w-full px-4 sm:px-6 md:px-8 lg:px-0">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-between">
        <div className="space-y-6">
          <FileInput
            id="emirates-id"
            labelName="Emirates ID or National ID"
            required={true}
          />

          <FileInput
            id="passport-copy"
            labelName="Passport Copy"
            required={true}
          />

          <FileInput
            id="visa-work-permit"
            labelName="Visa / Work Permit"
            required={true}
          />

          <FileInput id="driver-photo" labelName="Driver Photo (optional)" />
        </div>

        <div className="space-y-6">
          <FileInput
            id="police-clearance"
            labelName="Police Clearance Certificate"
          />

          <FileInput
            id="medical-fitness"
            labelName="Medical Fitness Certificate"
          />

          <FileInput
            id="training-certs"
            labelName="Any specialized training certs"
          />
        </div>
      </div>
    </div>
  );
};

export default DriverDocuments;

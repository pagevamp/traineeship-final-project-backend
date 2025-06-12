import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UploadIcon } from "lucide-react";

const VehicleRegistration = () => {
  return (
    <div className="w-full max-w-full grid grid-cols-3 gap-4 px-4 sm:px-6 md:px-8 lg:px-0 justify-items-stretch text-[14px]">
      {/* Registration Expiry Date */}
      <div className="flex flex-col gap-1">
        <Label className="font-primary text-[#26203B]" required>
          Registration Expiry Date
        </Label>
        <Input
          type="date"
          className="w-full py-1.5 px-3 h-9 text-sm"
          required
        />
      </div>

      {/* Insurance Expiry Date */}
      <div className="flex flex-col gap-1">
        <Label className="font-primary text-[#26203B]" required>
          Insurance Expiry Date
        </Label>
        <Input
          type="date"
          className="w-full py-1.5 px-3 h-9 text-sm"
          required
        />
      </div>

      {/* Fitness Certificate Expiry */}
      <div className="flex flex-col gap-1">
        <Label className="font-primary text-[#26203B]" required>
          Fitness Certificate Expiry
        </Label>
        <Input
          type="date"
          className="w-full py-1.5 px-3 h-9 text-sm"
          required
        />
      </div>

      {/* Upload Registration Document */}
      <div className="flex flex-col gap-1 col-span-1">
        <Label className="font-primary text-[#26203B]" required>
          Upload Registration Document
        </Label>
        <div className="flex items-center gap-2">
          <Input
            id="registration-doc"
            type="file"
            accept=".pdf,.jpg,.jpeg"
            className="hidden"
            required
          />
          <Label
            htmlFor="registration-doc"
            className="flex items-center gap-1 border rounded-md px-3 py-1.5 w-full h-9 cursor-pointer hover:bg-gray-50 text-sm"
          >
            <UploadIcon className="h-4 w-4" />
            <span>Choose file (PDF/JPG)</span>
          </Label>
        </div>
      </div>

      {/* Upload Insurance Document */}
      <div className="flex flex-col gap-1 col-span-1">
        <Label className="font-primary text-[#26203B]" required>
          Upload Insurance Document
        </Label>
        <div className="flex items-center gap-2">
          <Input
            id="insurance-doc"
            type="file"
            accept=".pdf,.jpg,.jpeg"
            className="hidden"
            required
          />
          <Label
            htmlFor="insurance-doc"
            className="flex items-center gap-1 border rounded-md px-3 py-1.5 w-full h-9 cursor-pointer hover:bg-gray-50 text-sm"
          >
            <UploadIcon className="h-4 w-4" />
            <span>Choose file (PDF/JPG)</span>
          </Label>
        </div>
      </div>

      {/* Upload Fitness Certificate */}
      <div className="flex flex-col gap-1 col-span-1">
        <Label className="font-primary text-[#26203B]" required>
          Upload Fitness Certificate
        </Label>
        <div className="flex items-center gap-2">
          <Input
            id="fitness-doc"
            type="file"
            accept=".pdf,.jpg,.jpeg"
            className="hidden"
            required
          />
          <Label
            htmlFor="fitness-doc"
            className="flex items-center gap-1 border rounded-md px-3 py-1.5 w-full h-9 cursor-pointer hover:bg-gray-50 text-sm"
          >
            <UploadIcon className="h-4 w-4" />
            <span>Choose file (PDF/JPG)</span>
          </Label>
        </div>
      </div>

      {/* Upload Reefer/GDP Cert */}
      <div className="flex flex-col gap-1 col-span-1">
        <Label className="font-primary text-[#26203B]">
          Upload Reefer/GDP Cert (if applicable)
        </Label>
        <div className="flex items-center gap-2">
          <Input
            id="reefer-doc"
            type="file"
            accept=".pdf,.jpg,.jpeg"
            className="hidden"
          />
          <Label
            htmlFor="reefer-doc"
            className="flex items-center gap-1 border rounded-md px-3 py-1.5 w-full h-9 cursor-pointer hover:bg-gray-50 text-sm"
          >
            <UploadIcon className="h-4 w-4" />
            <span>Choose file</span>
          </Label>
        </div>
      </div>

      {/* Upload DG Certificate */}
      <div className="flex flex-col gap-1 col-span-1">
        <Label className="font-primary text-[#26203B]">
          Upload DG Certificate (if applicable)
        </Label>
        <div className="flex items-center gap-2">
          <Input
            id="dg-doc"
            type="file"
            accept=".pdf,.jpg,.jpeg"
            className="hidden"
          />
          <Label
            htmlFor="dg-doc"
            className="flex items-center gap-1 border rounded-md px-3 py-1.5 w-full h-9 cursor-pointer hover:bg-gray-50 text-sm"
          >
            <UploadIcon className="h-4 w-4" />
            <span>Choose file</span>
          </Label>
        </div>
      </div>
    </div>
  );
};

export default VehicleRegistration;

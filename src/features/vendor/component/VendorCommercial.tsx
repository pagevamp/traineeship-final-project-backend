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

const VendorCommercial = () => {
  return (
    <div className="text-sm w-full px-4 sm:px-6 md:px-8 lg:px-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div className="flex flex-col gap-1">
        <Label htmlFor="billing-contact" className="text-sm text-[#26203B]">
          Billing Contact Name
        </Label>
        <Input
          className="w-full h-9 px-3 placeholder:text-xs placeholder:text-[#9C9AA5]"
          id="billing-contact"
          name="billing-contact"
          placeholder="Enter billing contact person's name"
          type="text"
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <Label htmlFor="billing-email" className="text-sm text-[#26203B]">
          Billing Email
        </Label>
        <Input
          className="w-full h-9 px-3 placeholder:text-xs placeholder:text-[#9C9AA5]"
          id="billing-email"
          name="billing-email"
          placeholder="Enter email for invoices"
          type="email"
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <Label htmlFor="bank-name" className="text-sm text-[#26203B]">
          Bank Name
        </Label>
        <Input
          className="w-full h-9 px-3 placeholder:text-xs placeholder:text-[#9C9AA5]"
          id="bank-name"
          name="bank-name"
          placeholder="Enter your bank name (GCC region)"
          type="text"
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <Label htmlFor="iban" className="text-sm text-[#26203B]">
          IBAN / Account Number
        </Label>
        <Input
          className="w-full h-9 px-3 placeholder:text-xs placeholder:text-[#9C9AA5]"
          id="iban"
          name="iban"
          placeholder="Enter valid bank account information"
          type="text"
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <Label htmlFor="swift" className="text-sm text-[#26203B]">
          SWIFT / BIC Code
        </Label>
        <Input
          className="w-full h-9 px-3 placeholder:text-xs placeholder:text-[#9C9AA5]"
          id="swift"
          name="swift"
          placeholder="Enter code for cross-border payments"
          type="text"
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <Label className="text-sm text-[#26203B]">Currency Accepted</Label>
        <Select>
          <SelectTrigger className="w-full h-9 px-3 text-sm">
            <SelectValue placeholder="Select accepted currency" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="AED">AED (UAE Dirham)</SelectItem>
              <SelectItem value="SAR">SAR (Saudi Riyal)</SelectItem>
              <SelectItem value="OMR">OMR (Omani Rial)</SelectItem>
              <SelectItem value="QAR">QAR (Qatari Riyal)</SelectItem>
              <SelectItem value="BHD">BHD (Bahraini Dinar)</SelectItem>
              <SelectItem value="USD">USD (US Dollar)</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-1">
        <Label className="text-sm text-[#26203B]">
          Preferred Payment Terms
        </Label>
        <Select>
          <SelectTrigger className="w-full h-9 px-3 text-sm">
            <SelectValue placeholder="Select payment terms" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="7">7 days</SelectItem>
              <SelectItem value="15">15 days</SelectItem>
              <SelectItem value="30">30 days</SelectItem>
              <SelectItem value="delivery">On delivery</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-1 sm:col-span-2 lg:col-span-1">
        <Label htmlFor="vat" className="text-sm text-[#26203B]">
          VAT / TRN Number
        </Label>
        <Input
          className="w-full h-9 px-3 placeholder:text-xs placeholder:text-[#9C9AA5]"
          id="vat"
          name="vat"
          placeholder="Enter VAT registration number (if applicable)"
          type="text"
        />
      </div>
    </div>
  );
};

export default VendorCommercial;

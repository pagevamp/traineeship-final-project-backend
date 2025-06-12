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

const DriverContact = () => {
  const [countryCode, setCountryCode] = React.useState("+1");
  const [emergencyCountryCode, setEmergencyCountryCode] = React.useState("+1");

  return (
    <div className="w-full px-4 sm:px-6 md:px-8 lg:px-0">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <Label className="text-sm font-medium" required>
              Phone Number
            </Label>
            <div className="flex items-center gap-2 w-full">
              <div className="w-[120px]">
                <Select value={countryCode} onValueChange={setCountryCode}>
                  <SelectTrigger className="w-full h-12">
                    <SelectValue placeholder="Code" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="+1">+1 (US)</SelectItem>
                    <SelectItem value="+44">+44 (UK)</SelectItem>
                    <SelectItem value="+91">+91 (IN)</SelectItem>
                    <SelectItem value="+61">+61 (AU)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1">
                <Input
                  type="tel"
                  placeholder="Phone number"
                  className="h-12 w-full"
                  required
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">Email Address</Label>
            <Input
              type="email"
              placeholder="example@domain.com"
              className="h-12 w-full"
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label className="text-sm font-medium" required>
              Emergency Contact Name
            </Label>
            <Input
              type="text"
              placeholder="Full name"
              className="h-12 w-full"
              required
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium" required>
              Emergency Contact Number
            </Label>
            <div className="flex items-center gap-2 w-full">
              <div className="w-[120px]">
                <Select
                  value={emergencyCountryCode}
                  onValueChange={setEmergencyCountryCode}
                >
                  <SelectTrigger className="w-full h-12">
                    <SelectValue placeholder="Code" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="+1">+1 (US)</SelectItem>
                    <SelectItem value="+44">+44 (UK)</SelectItem>
                    <SelectItem value="+91">+91 (IN)</SelectItem>
                    <SelectItem value="+61">+61 (AU)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1">
                <Input
                  type="tel"
                  placeholder="Phone number"
                  className="h-12 w-full"
                  required
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverContact;

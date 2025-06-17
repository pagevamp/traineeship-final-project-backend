import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import { MultiSelect } from "@/components/ui/multi-select";
import { companyType } from "../constant";
import { SelectedBadges } from "@/components/selected-badge/SelectedBadges";
import { DatePicker } from "@/components/ui/date-picker";

const Register1 = () => {
  const [selectedCompany, setSelectedCompany] = React.useState<string[]>([]);
  const [date, setDate] = React.useState<Date | undefined>(undefined);

  const handleRemoveFramework = (value: string) => {
    setSelectedCompany((prev) => prev.filter((item) => item !== value));
  };
  return (
    <motion.div
      className="text-[16px] max-w-[500px] w-full px-4 sm:px-6 md:px-8 lg:px-0 justify-items flex flex-col gap-4"
      initial={{ x: 50, opacity: 0.1 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
    >
      <div className="flex flex-col gap-2">
        <Input
          className="w-full py-2 px-4 placeholder:text-xs placeholder:text-[#9C9AA5] h-12"
          id="company-name"
          name="company-name"
          labelName="Company Name"
          placeholder="Enter your company name"
          type="text"
          required={true}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Input
          className="w-full py-2 px-4 placeholder:text-xs placeholder:text-[#9C9AA5] h-12"
          id="company-mail"
          name="company-mail"
          labelName=" Company Mail"
          placeholder="Enter your company mail"
          type="email"
          required={true}
        />
      </div>

      <div className="flex flex-col gap-2 w-full">
        {/* <Label
          className="text-[14px] font-primary text-[#26203B]"
          required={true}
        >
          Company Type
        </Label> */}
        {/* <Select>
          <SelectTrigger
            id="company-type"
            className="w-full py-2 px-4 placeholder:text-sm placeholder:text-[#9C9AA5] h-12"
          >
            <SelectValue placeholder="Select your company type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel
                required={true}
                className="text-[16px] font-primary text-[#26203B]"
              >
                Company Type
              </SelectLabel>
              <SelectLabel>Company Type</SelectLabel>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="blueberry">Blueberry</SelectItem>
              <SelectItem value="grapes">Grapes</SelectItem>
              <SelectItem value="pineapple">Pineapple</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select> */}
        <MultiSelect
          options={companyType}
          selected={selectedCompany}
          onChange={setSelectedCompany}
          placeholder="Select Company Type..."
          searchPlaceholder="Search..."
          label="Company Type"
        />
        <SelectedBadges
          selected={selectedCompany}
          options={companyType}
          onRemove={handleRemoveFramework}
        />
      </div>

      <div className="flex flex-col gap-2">
        {/* <Input
          className="w-full  bg-white py-2 px-4 placeholder:text-sm placeholder:text-[#9C9AA5]"
          id="years-incorporated"
          name="years-incorporated"
          labelName=" Years Since Incorporated"
          placeholder="Enter date"
          type="date"
          required={true}
        /> */}
        <DatePicker
          selected={date}
          onSelect={setDate}
          placeholder="Enter Date"
          label="Years Since Incorporated"
          className="w-full text-xs"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label
          className="text-[14px] font-primary text-[#26203B]"
          required={true}
        >
          Employee Size
        </Label>
        <Select>
          <SelectTrigger
            id="company-type"
            className="w-full py-2 px-4 placeholder:text-sm placeholder:text-[#9C9AA5] h-12"
          >
            <SelectValue placeholder="Select Team Strength" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel
                required={true}
                className="text-[16px] font-primary text-[#26203B]"
              >
                Employee Size
              </SelectLabel>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="blueberry">Blueberry</SelectItem>
              <SelectItem value="grapes">Grapes</SelectItem>
              <SelectItem value="pineapple">Pineapple</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </motion.div>
  );
};

export default Register1;

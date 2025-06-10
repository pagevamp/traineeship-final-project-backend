import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Image from "next/image";
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

const Register2 = () => {
  return (
    <motion.div
      className="text-[16px] w-full px-3 mt-[10px] flex justify-center"
      initial={{ x: 50, opacity: 0.1 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
    >
      <div className="grid grid-cols-1 gap-y-[18px] mb-8 w-full max-w-[500px]">
        <div className="flex flex-col gap-2">
          <Label
            className="text-[14px] font-primary text-[#26203B]"
            required={true}
          >
            Nature of Business
          </Label>
          <Select>
            <SelectTrigger
              id="company-type"
              className="w-full py-2 px-4 placeholder:text-xs placeholder:text-[#9C9AA5] placeholder:font-[300] h-12"
            >
              <SelectValue placeholder="Select Nature of Business" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Nature of Business</SelectLabel>
                <SelectItem value="manufacturing">Manufacturing</SelectItem>
                <SelectItem value="wholesale">Wholesale</SelectItem>
                <SelectItem value="retail">Retail</SelectItem>
                <SelectItem value="service">Service</SelectItem>
                <SelectItem value="import-export">Import / Export</SelectItem>
                <SelectItem value="technology">Technology</SelectItem>
                <SelectItem value="agriculture">Agriculture</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <Label
            className="text-[14px] font-primary text-[#26203B]"
            required={true}
          >
            Shipment Type
          </Label>
          <Select>
            <SelectTrigger
              id="company-type"
              className="w-full py-2 px-4 placeholder:text-xs placeholder:text-[#9C9AA5] placeholder:font-[300] h-12"
            >
              <SelectValue placeholder="Select Shipment Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Shipment Type</SelectLabel>
                <SelectItem value="air-freight">Air Freight</SelectItem>
                <SelectItem value="sea-freight">Sea Freight</SelectItem>
                <SelectItem value="road-freight">Road Freight</SelectItem>
                <SelectItem value="rail-freight">Rail Freight</SelectItem>
                <SelectItem value="express-courier">Express Courier</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <Label
            htmlFor="company-type"
            className="text-[14px] font-primary text-[#26203B]"
          >
            Type of Truck
          </Label>
          <Select>
            <SelectTrigger
              id="company-type"
              className="w-full py-2 px-4 placeholder:text-xs placeholder:text-[#9C9AA5] placeholder:font-[300] h-12"
            >
              <SelectValue placeholder="Select your Type of Truck" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Type of Truck</SelectLabel>
                <SelectItem value="apple">40FT Closed Box</SelectItem>
                <SelectItem value="banana">20FT Refrigerated</SelectItem>
                <SelectItem value="blueberry">40FT Flatbed</SelectItem>
                <SelectItem value="grapes">40FT Curtain Side</SelectItem>
                <SelectItem value="pineapple">20FT Closed Box</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <Label
            htmlFor="company-type"
            className="text-[14px] font-primary text-[#26203B]"
          >
            Destination Country
          </Label>
          <Select>
            <SelectTrigger
              id="company-type"
              className="w-full py-2 px-4 placeholder:text-xs placeholder:text-[#9C9AA5] placeholder:font-[300] h-12"
            >
              <SelectValue placeholder="Select Destination Country" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Destination Country</SelectLabel>
                <SelectItem value="apple">KUWAIT</SelectItem>
                <SelectItem value="banana">QATAR</SelectItem>
                <SelectItem value="blueberry">DMM</SelectItem>
                <SelectItem value="grapes">RUH</SelectItem>
                <SelectItem value="pineapple">BAHRAIN</SelectItem>
                <SelectItem value="pineapple">JED</SelectItem>
                <SelectItem value="pineapple">Oman</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </motion.div>
  );
};

export default Register2;

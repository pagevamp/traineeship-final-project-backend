"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { pickupDetails } from "../constant";
import { useRouter } from "next/navigation";

const ShipmentPickup = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-1 px-4 sm:px-6 lg:px-0">
      <div className="flex flex-row justify-between items-center px-0 sm:px-6 lg:px-0">
        <span className="font-primary text-black font-weight-1000 text-[16px]">
          Pickup Details
        </span>

        <Button
          variant="outline"
          onClick={() => router.push(`/shipment`)}
          className="flex items-center bg-white text-primary text-[13px] font-weight-200 border border-primary rounded-[37px] px-4"
        >
          Edit
          <Image
            src="/pencilorange.svg"
            alt="pencilorange"
            width={12}
            height={12}
          />
        </Button>
      </div>

      <div className="w-full bg-[#ffffff] rounded-[20px] p-6 mt-4">
        <div className="w-full flex flex-col gap-6">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-x-20">
            <div className="w-full md:w-[442px] p-[1px] rounded-[40px] bg-gradient-to-b from-[#E06518] to-[#E3802A]">
              <Input
                id="preferred_date"
                name="preferred_date"
                type="date"
                placeholder="Preferred Pickup Date"
                className="w-full h-full rounded-[40px] bg-white py-1.5 px-4 placeholder:text-sm placeholder:text-[#9C9AA5] text-sm focus:outline-none"
              />
            </div>

            <div className="w-full md:w-[442px] h-[40px] p-[1px] rounded-[40px] bg-gradient-to-b from-[#E06518] to-[#E3802A]">
              <Select>
                <SelectTrigger
                  id="net-term"
                  className="w-full h-full rounded-[40px] bg-white py-1.5 px-4 placeholder:text-sm placeholder:text-[#9C9AA5] text-sm focus:outline-none"
                >
                  <SelectValue placeholder="Preferred PickUp Address" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>PickUp Address</SelectLabel>
                    <SelectItem value="Oman">Oman</SelectItem>
                    <SelectItem value="Dubai">Dubai</SelectItem>
                    <SelectItem value="Qatar">Qatar</SelectItem>
                    <SelectItem value="Bahrain">Bahrain</SelectItem>
                    <SelectItem value="Kuwait">Kuwait</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="col-span-1 rounded-[25px] flex flex-col w-full h-full p-4 md:p-8 gap-6">
            {pickupDetails.map((item) => (
              <div
                key={item.pin_code}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-8 w-full"
              >
                <div className="col-span-1">
                  <p className="flex items-center gap-[7px] text-[14px] font-primary text-[#404040]">
                    Preferred Pickup Date:
                    <span className="font-secondary text-[#404040] font-light">
                      {item.preferred_date}
                    </span>
                  </p>
                </div>
                <div className="col-span-1">
                  <p className="flex items-center gap-[7px] text-[14px] font-primary text-[#404040]">
                    Street 1:
                    <span className="font-secondary text-[#404040] font-light">
                      {item.street_1}
                    </span>
                  </p>
                </div>
                <div className="col-span-1">
                  <p className="flex items-center gap-[7px] text-[14px] font-primary text-[#404040]">
                    Street 2:
                    <span className="font-secondary text-[#404040] font-light">
                      {item.street_2}
                    </span>
                  </p>
                </div>

                <div className="col-span-1">
                  <p className="flex items-center gap-[7px] text-[14px] font-primary text-[#404040]">
                    City:
                    <span className="font-secondary text-[#404040] font-light">
                      {item.city}
                    </span>
                  </p>
                </div>
                <div className="col-span-1">
                  <p className="flex items-center gap-[7px] text-[14px] font-primary text-[#404040]">
                    State:
                    <span className="font-secondary text-[#404040] font-light">
                      {item.state}
                    </span>
                  </p>
                </div>
                <div className="col-span-1">
                  <p className="flex items-center gap-[7px] text-[14px] font-primary text-[#404040]">
                    Country:
                    <span className="font-secondary text-[#404040] font-light">
                      {item.country}
                    </span>
                  </p>
                </div>

                <div className="col-span-1 sm:col-span-2 md:col-span-3">
                  <p className="flex items-center gap-[7px] text-[14px] font-primary text-[#404040]">
                    Pin Code:
                    <span className="font-secondary text-[#404040] font-light">
                      {item.pin_code}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShipmentPickup;

"use client";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import React, { useState } from "react";
import { addDetails } from "../constant";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ShipmentAdd = () => {
  const [selectVehicle, setSelectedVehicle] = useState("");
  const [selectType, setSelectedType] = useState("");
  const [selectDriver, setSelectedDriver] = useState("");

  return (
    <div className="flex flex-col">
      <Button className="font-primary text-lg bg-transparent text-[#FF6502] text-[16px] font-weight-300 shadow-none hover:bg-transparent flex items-center justify-start">
        <ChevronLeft className="mr-2" size={16} />
        Create Customer Shipments
      </Button>
      <div className="grid grid-cols-2 gap-x-10">
        <div className="col-span-1 bg-[#FFFFFF] rounded-[25px] flex flex-col items-start w-full h-full p-6 gap-2">
          {addDetails.map((item) => (
            <div key={item.bill_no} className="flex flex-col space-y-2">
              <p className="flex items-center gap-[7px] text-[14px] font-primary text-[#404040]">
                Bill no.:
                <span className="font-secondary text-[#404040] font-light">
                  {item.bill_no}
                </span>
              </p>
              <p className="flex items-center gap-[7px] text-[14px] font-primary text-[#404040]">
                Job ID:
                <span className="font-secondary text-[#404040] font-light">
                  {item.job_id}
                </span>
              </p>
              <p className="flex items-center gap-[7px] text-[14px] font-primary text-[#404040]">
                Date:
                <span className="font-secondary text-[#404040] font-light">
                  {item.date}
                </span>
              </p>
            </div>
          ))}
        </div>

        <div className="col-span-1 bg-[#FFFFFF] rounded-[25px] flex flex-col items-start place-content-start w-full p-4">
          <Select onValueChange={(value) => setSelectedType(value)}>
            <SelectTrigger
              id="net-term"
              className="w-full h-full rounded-[40px] border-none font-primary bg-white py-1.5 px-4 placeholder:text-[14px] placeholder:items-start focus:outline-none focus:ring-0 focus:ring-offset-0 placeholder:text-[#B7B7B7] text-sm shadow-none"
            >
              <span>
                {selectType ? (
                  <span className="text-sm text-black font-primary">
                    Select Type: {`${selectType}`}
                  </span>
                ) : (
                  <SelectValue placeholder="Select Vehicle: " />
                )}
              </span>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Shipment Type:</SelectLabel>
                <SelectItem value="Oman">Oman</SelectItem>
                <SelectItem value="Dubai">Dubai</SelectItem>
                <SelectItem value="Qatar">Qatar</SelectItem>
                <SelectItem value="Bahrain">Bahrain</SelectItem>
                <SelectItem value="Kuwait">Kuwait</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select onValueChange={(value) => setSelectedVehicle(value)}>
            <SelectTrigger
              id="net-term"
              className="w-full h-full rounded-[40px] border-none font-primary bg-white py-1.5 px-4 placeholder:text-[14px] focus:outline-none focus:ring-0 focus:ring-offset-0 placeholder:text-[#B7B7B7] text-sm shadow-none"
            >
              <span>
                {selectVehicle ? (
                  <span className="text-sm text-black font-primary">
                    Select Type: {`${selectVehicle}`}
                  </span>
                ) : (
                  <SelectValue placeholder="Select Vehicle: " />
                )}
              </span>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Select Vehicle: </SelectLabel>
                <SelectItem value="Oman">Oman</SelectItem>
                <SelectItem value="Dubai">Dubai</SelectItem>
                <SelectItem value="Qatar">Qatar</SelectItem>
                <SelectItem value="Bahrain">Bahrain</SelectItem>
                <SelectItem value="Kuwait">Kuwait</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select onValueChange={(value) => setSelectedDriver(value)}>
            <SelectTrigger
              id="net-term"
              className="w-full h-full rounded-[40px] border-none font-primary bg-white py-1.5 px-4 placeholder:text-[14px] focus:outline-none focus:ring-0 focus:ring-offset-0 placeholder:text-[#B7B7B7] text-sm shadow-none"
            >
              <span>
                {selectDriver ? (
                  <span className="text-sm text-black font-primary">
                    Select Type: {`${selectDriver}`}
                  </span>
                ) : (
                  <SelectValue placeholder="Select Vehicle: " />
                )}
              </span>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Select Driver: </SelectLabel>
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
    </div>
  );
};

export default ShipmentAdd;

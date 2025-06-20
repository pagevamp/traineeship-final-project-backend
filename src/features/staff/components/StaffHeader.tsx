import React from "react";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { details1, details2 } from "../constant";
import Image from "next/image";

const StaffHeader = () => {
  return (
    <div>
      <div className="flex justify-between mb-2 w-full ">
        <div className="flex flex-col  justify-start text-[16px]">
          <div className="flex items-center">
            <ChevronLeft />
            <p className="font-primary font-bold">User Detail Page</p>{" "}
          </div>
          <p className="font-extralight">
            Last Active: a month ago( 05-06-2025 )
          </p>
        </div>

        <div className="flex justify-start">
          <Button className=" bg-linear-to-b to-[#FF811A] rounded-[20px] font-light text-white mt-2 w-[150px] hover:bg-[#CF5406] p-6">
            Deactivate
          </Button>
        </div>
      </div>

      {/* header */}
      <div className="grid grid-cols-2 gap-x-2">
        <div className="w-full bg-[#ffffff] rounded-[25px] px-4 py-4 sm:px-6 sm:py-6 md:px-[24px] md:py-[20px] flex flex-col font-primary">
          <div className="flex flex-col sm:grid-cols-2 gap-y-2 sm:gap-x-8 md:gap-x-12">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="bg-[#cbcbcb] h-[35px] p-2 rounded-[5px] flex items-center justify-center">
                  <Image
                    src="/Profile.svg"
                    alt="profile"
                    width={18}
                    height={18}
                  />
                </div>

                <div className="flex flex-col justify-center">
                  <p>Prawin staff</p>
                  <p className="font-extralight text-muted-light text-sm">
                    ID:
                  </p>
                </div>
              </div>

              <div className="bg-green-500 text-white text-xs px-3 py-1 rounded-[5px]  flex items-center">
                Staff
              </div>
            </div>
            {details1.map((item, index) => (
              <div key={index} className="flex flex-row gap-2 ">
                <span className="lg:text-[14px] sm:text-[12px] md:text-[15px] text-[#808080] font-extralight">
                  {item.label}:
                </span>
                <span className="lg:text-[14px] sm:text-[12px] md:text-[15px]  text-[#404040] font-secondary">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full bg-[#ffffff] rounded-[25px] px-4 py-4 sm:px-6 sm:py-6 md:px-[24px] md:py-[20px] flex flex-col font-primary">
          <div className="flex flex-row gap-1">
            <div className="bg-[#cbcbcb] h-[35px] p-2 rounded-[5px] ">
              <Image
                src="/Location.svg"
                alt="location"
                width={18}
                height={18}
              />
            </div>
            <div className="flex flex-col">
              <span>Address</span>
            </div>
          </div>
          <div className="flex flex-col sm:grid-cols-2 gap-y-2 sm:gap-x-8 md:gap-x-12 p-4">
            {details2.map((item, index) => (
              <div key={index} className="flex flex-row gap-2 ">
                <span className="lg:text-[14px] sm:text-[12px] md:text-[15px] text-[#808080] font-extralight">
                  {item.label}:
                </span>
                <span className="lg:text-[14px] sm:text-[12px] md:text-[15px]  text-[#404040] font-secondary">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffHeader;

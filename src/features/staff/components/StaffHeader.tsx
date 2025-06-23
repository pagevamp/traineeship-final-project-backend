import React from "react";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { details1, details2 } from "../constant";
import Image from "next/image";
import { Icon } from "@iconify/react";

const StaffHeader = () => {
  return (
    <div>
      <div className="flex justify-between mb-2 w-full ">
        <div className="flex flex-col  justify-start text-[16px]">
          <div className="flex items-center">
            <ChevronLeft />
            <p className="font-secondary font-bold text-[12px] md:text-[16px]">
              User Detail Page
            </p>{" "}
          </div>
          <div className="flex font-extralight m-2 ml-6 text-[12px] md:text-[16px]">
            Last Active: a month ago( 05-06-2025 )
          </div>
        </div>

        <div className="flex justify-start">
          <Button className=" bg-linear-to-b to-[#FF811A] rounded-[20px] font-light text-white mt-2 w-[150px] hover:bg-[#CF5406] p-6">
            Deactivate
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 sm:grid-cols-1  gap-2">
        <div className="w-full bg-[#ffffff] rounded-[25px] px-4 py-4 sm:px-6 sm:py-6 md:px-[24px] md:py-[20px] flex flex-col font-secondary">
          <div className="flex flex-col sm:grid-cols-2 gap-y-2 sm:gap-x-8 md:gap-x-12">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="bg-[#e9e7e7] h-[35px] px-2 py-1 rounded-[5px] flex items-center justify-center">
                  <Icon
                    icon="iconamoon:profile-duotone"
                    width="26"
                    height="26"
                    className="font-bold fill-[#3c3a3a]"
                  />
                </div>

                <div className="flex flex-col justify-center">
                  <p>Prawin staff</p>
                  <p className="font-secondary  font-extralight text-muted-light text-sm">
                    ID:{" "}
                    <span className="font-secondary font-light text-black text-sm">
                      STF269
                    </span>
                  </p>
                </div>
              </div>

              <div className="bg-green-500 text-white text-xs px-3 py-1 rounded-[5px]  flex items-center">
                Staff
              </div>
            </div>
            {details1.map((item, index) => (
              <div key={index} className="flex flex-row gap-2 font-secondary ">
                <span className="lg:text-[14px] text-[12px] md:text-[15px] text-[#808080] font-extralight">
                  {item.label}:
                </span>
                <span className="lg:text-[14px] text-[12px] md:text-[15px]  text-[#404040] ">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full bg-[#ffffff] rounded-[25px] p-4 sm:px-6 sm:py-6 md:px-[24px] md:py-[20px] flex flex-col font-secondary">
          <div className="flex flex-row gap-2 items-center">
            <div className="bg-[#e9e7e7] h-[35px] px-2 py-1  rounded-[5px] ">
              <Icon
                icon="mynaui:location"
                width="26"
                height="26"
                className=" font-bold"
              />
            </div>
            <div className="flex flex-col">
              <span>Address</span>
            </div>
          </div>
          <div className="flex flex-col sm:grid-cols-2 gap-y-2 sm:gap-x-8 md:gap-x-12 pt-3">
            {details2.map((item, index) => (
              <div key={index} className="flex flex-row gap-2 font-secondary ">
                <span className="lg:text-[14px] text-[12px] md:text-[15px] text-[#808080] font-extralight">
                  {item.label}:
                </span>
                <span className="lg:text-[14px] text-[12px] md:text-[15px]  text-[#404040] ">
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

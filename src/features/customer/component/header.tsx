"use client";

import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { headerDetails } from "./constant";
import { motion } from "framer-motion";
import { useState } from "react";

const Header = () => {
  const [flip, setFlip] = useState(true);
  return (
    <div className="flex flex-col gap-6 px-4 md:px-0 w-full mx-auto">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0">
        <span className="font-primary text-[20px] text-[#1C2B38]">
          Company Information
        </span>

        <div className="flex gap-4 sm:gap-[24px] flex-wrap sm:flex-nowrap justify-center">
          <button className="flex items-center px-4 h-[40px] bg-[#00B69B] text-white rounded">
            Transfer To{" "}
            <ChevronDown size={14} className="ml-2 bg-transparent" />
          </button>
          <button className="w-[110px] h-[40px] bg-[#FF6502] text-white rounded">
            Reject
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-10 sm:gap-[24px]">
        <Image
          src="/Ellipse 67.svg"
          alt="Company Avatar"
          width={165}
          height={165}
          className="rounded-full object-cover"
          priority
        />

        <div className="w-full sm:max-w-[823px] grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
          {headerDetails.map((detail, index) => (
            <div key={index} className="flex items-center gap-2">
              <Image
                src={detail.img}
                alt={`${detail.label} icon`}
                width={14}
                height={22}
              />
              <p className="text-[14px]">
                <span className="font-primary">{detail.label}: </span>
                <span className="font-secondary">{detail.value}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header;

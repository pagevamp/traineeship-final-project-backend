"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useState } from "react";
import { Icon } from "@iconify/react";
import Maps from "./Maps";
import { Button } from "@/components/ui/button";
import Image from "next/image";

type StatusType = "Route" | "All Operation" | "Delivered";

const RouterMaps = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<StatusType>("Route");

  const tabs: StatusType[] = ["Route", "All Operation", "Delivered"];

  const [state, setState] = useState({
    pagination: {
      page: 1,
      recordsPerPage: 10,
    },
    search: "",
  });

  const actions = [
    {
      label: (
        <Icon
          icon="heroicons:eye-16-solid"
          width="22"
          height="22"
          color="#FF811A"
        />
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-[15px]">
      <div className="flex items-end justify-end md:justify-between w-full flex-wrap md:flex-nowrap">
        {/* <div className="flex flex-col w-full md:w-auto">
          <motion.div
            className="flex gap-[81px] w-full md:w-fit border-b-[1px] border-[#E5D5EF] overflow-x-auto no-scrollbar"
            initial={{ x: -20 }}
            animate={{ x: 0 }}
          >
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="relative whitespace-nowrap text-[14px] md:text-[16px] font-medium text-[#540F86] pb-3 transition-all duration-300 overflow-visible"
              >
                <span className="relative z-10">{tab}</span>

                {activeTab === tab && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[100%] h-[3px] bg-[#540F86] rounded-t-[10px] transition-all duration-300 z-0" />
                )}
              </button>
            ))}
          </motion.div>
        </div> */}
        <span className="text-base pb-2 font-secondary font-semibold">
          Setup A Route
        </span>

        <div className="pr-6">
          <Button
            variant="outline"
            className="flex items-center gap-3 bg-white text-primary text-[13px] font-secondary font-normal border border-primary rounded-[37px] p-2"
          >
            Add
            <Image src="/plus.svg" alt="plus" width={24} height={24} />
          </Button>
        </div>
      </div>

      <Maps />
    </div>
  );
};

export default RouterMaps;

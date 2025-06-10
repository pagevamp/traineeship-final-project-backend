"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import { ChevronDown } from "lucide-react";
import TableComponent from "@/components/table";
import { customerStatus, USER_COLUMN } from "./constant";

type StatusType = "Approved" | "Pending" | "Rejected";

const CustomerStatus = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<StatusType>("Pending");

  const tabs: StatusType[] = ["Pending", "Rejected", "Approved"];

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
      onClick: (row: any) => router.push(`/customer/1`),
    },
  ];

  const filteredData = customerStatus.filter(
    (item) => item.status === activeTab
  );

  return (
    <div className="flex flex-col gap-[15px]">
      <div className="flex items-end justify-end md:justify-between w-full flex-wrap md:flex-nowrap">
        <div className="flex flex-col w-full md:w-auto">
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
        </div>

        <div className="mt-4 md:mt-0 w-fit px-4 md:px-0 md:w-[104px] h-[28px] bg-white flex items-center justify-center gap-[6px] rounded-[10px]">
          <span className="text-[#540F86] text-[14px] font-medium whitespace-nowrap">
            See all
          </span>
          <ChevronDown size={18} color="#000000" />
        </div>
      </div>

      <div className="bg-[#ffffff] w-full rounded-[25px] overflow-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="min-w-[600px]"
          >
            <TableComponent
              currentPage={state.pagination.page}
              columns={USER_COLUMN}
              data={customerStatus}
              isLoading={false}
              actions={actions}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CustomerStatus;

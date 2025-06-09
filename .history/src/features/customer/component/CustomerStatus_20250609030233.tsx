"use client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EyeIcon, ChevronDown } from "lucide-react";
import { useState } from "react";
import { customerStatus, statusColors } from "./constant";

type StatusType = "Approved" | "Pending" | "Rejected" | "Department";

const CustomerStatus = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<StatusType>("Pending");

  const tabs = ["Pending", "Rejected", "Approved"] as const;

  const filteredData = customerStatus.filter(
    (item) => item.status === activeTab
  );

  return (
    <div className="flex flex-col gap-[15px]">
      <div className="flex items-end justify-between w-full flex-wrap md:flex-nowrap">
        <div className="flex flex-col w-full md:w-auto">
          <div className="flex gap-[24px] w-full md:w-fit border-b border-[#E5D5EF] overflow-x-auto no-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative whitespace-nowrap text-[14px] md:text-[16px] font-medium text-[#540F86] pb-2 transition-all duration-300 ${
                  activeTab === tab
                    ? "border-b-2 border-[#540F86]"
                    : "border-b-2 border-transparent"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 md:mt-0 w-full md:w-[104px] h-[28px] bg-white flex items-center justify-center gap-[6px] rounded-[10px]">
          <span className="text-[#540F86] text-[14px] font-medium whitespace-nowrap">
            See all
          </span>
          <ChevronDown size={18} color="#000000" />
        </div>
      </div>

      <motion.div
        className="bg-[#ffffff] w-full rounded-[25px] pl-[15px] pr-[15px] md:pl-[30px] md:pr-[57px] pt-[25px] overflow-auto"
        initial={{ x: 150, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ WebkitOverflowScrolling: "touch" }} // smooth scrolling on iOS
      >
        <Table className="min-w-[600px] md:min-w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="text-[#0B0704] text-[14px] md:text-[16px] font-primary">
                SN
              </TableHead>
              <TableHead className="text-[#0B0704] text-[14px] md:text-[16px] font-primary">
                Date
              </TableHead>
              <TableHead className="text-[#0B0704] text-[14px] md:text-[16px] font-primary">
                Company Name
              </TableHead>
              <TableHead className="text-[#0B0704] text-[14px] md:text-[16px] font-primary">
                Email
              </TableHead>
              <TableHead className="text-[#0B0704] text-[14px] md:text-[16px] font-primary">
                Phone
              </TableHead>
              <TableHead className="text-[#0B0704] text-[14px] md:text-[16px] font-primary">
                Status
              </TableHead>
              <TableHead className="text-[#0B0704] text-[14px] md:text-[16px] font-primary">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <TableRow
                  key={item.id}
                  className="text-[#0B0704] text-[12px] md:text-[13px] font-secondary"
                >
                  <TableCell className="py-[12px] md:py-[19px]">
                    {item.id}
                  </TableCell>
                  <TableCell className="py-[12px] md:py-[19px]">
                    {item.date}
                  </TableCell>
                  <TableCell className="py-[12px] md:py-[19px]">
                    {item.companyName}
                  </TableCell>
                  <TableCell className="py-[12px] md:py-[19px]">
                    {item.email}
                  </TableCell>
                  <TableCell className="py-[12px] md:py-[19px]">
                    {item.phone}
                  </TableCell>
                  <TableCell className="py-[12px] md:py-[19px]">
                    <div
                      className={`w-[93px] h-[27px] flex items-center justify-center rounded-[4.5px] text-[12px] font-medium ${
                        statusColors[item.status]
                      }`}
                    >
                      {item.status}
                    </div>
                  </TableCell>
                  <TableCell className="py-[12px] md:py-[19px]">
                    <div
                      className="h-[26px] w-[28px] cursor-pointer flex items-center justify-center"
                      role="button"
                      aria-label={`View details for ${item.companyName}`}
                      onClick={() => router.push(`/customer/${item.id}`)}
                    >
                      <EyeIcon
                        size={23}
                        className="text-[#ffffff]"
                        fill="#FF811A"
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-5 text-[#999]">
                  No {activeTab.toLowerCase()} customers found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </motion.div>
    </div>
  );
};

export default CustomerStatus;

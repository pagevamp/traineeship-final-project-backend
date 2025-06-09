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

type StatusType = "Approved" | "Pending" | "Rejected";

const CustomerStatus = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<StatusType>("Pending");

  const tabs = ["Pending", "Rejected", "Approved"] as const;

  const filteredData = customerStatus.filter(
    (item) => item.status === activeTab
  );

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between w-full gap-3">
        <div className="flex flex-col">
          <div className="flex gap-6 w-fit border-b border-[#E5D5EF] overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative text-[15px] md:text-[16px] font-medium text-[#540F86] pb-2 transition-all duration-300 ${
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

        <div className="bg-white flex items-center justify-center gap-2 px-3 py-1 rounded-[10px] w-fit cursor-pointer">
          <span className="text-[#540F86] text-[14px] font-medium">
            See all
          </span>
          <ChevronDown size={18} color="#000000" />
        </div>
      </div>

      <motion.div
        className="bg-white w-full px-4 md:px-6 lg:px-8 pt-5 pb-3 rounded-[25px] overflow-x-auto"
        initial={{ x: 150, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Table className="min-w-[700px]">
          <TableHeader>
            <TableRow>
              {[
                "SN",
                "Date",
                "Company Name",
                "Email",
                "Phone",
                "Status",
                "Action",
              ].map((head, idx) => (
                <TableHead
                  key={idx}
                  className="text-[#0B0704] text-[15px] font-primary whitespace-nowrap"
                >
                  {head}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <TableRow
                  key={item.id}
                  className="text-[#0B0704] text-[13px] font-secondary"
                >
                  <TableCell className="py-4">{item.id}</TableCell>
                  <TableCell className="py-4">{item.date}</TableCell>
                  <TableCell className="py-4">{item.companyName}</TableCell>
                  <TableCell className="py-4">{item.email}</TableCell>
                  <TableCell className="py-4">{item.phone}</TableCell>
                  <TableCell className="py-4">
                    <div
                      className={`min-w-[93px] h-[27px] flex items-center justify-center rounded-[4.5px] text-[12px] font-medium ${
                        statusColors[item.status]
                      }`}
                    >
                      {item.status}
                    </div>
                  </TableCell>
                  <TableCell className="py-4">
                    <div
                      className="h-[26px] w-[28px] cursor-pointer flex items-center justify-center"
                      role="button"
                      aria-label={`View details for ${item.companyName}`}
                      onClick={() => router.push(`/customer/${item.id}`)}
                    >
                      <EyeIcon
                        size={23}
                        className="text-white"
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

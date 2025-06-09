"use client";

import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
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
import { department, statusColors } from "../constant";

const DepartmentStatus = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"Users" | "Designation">("Users");

  const tabs = ["Users", "Designation"] as const;

  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 80, damping: 20, duration: 0.5 }}
      className="bg-[#F9F2FD] w-full px-2 sm:px-4 md:px-0"
    >
      <div className="w-full flex flex-col gap-4 md:gap-[15px]">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between w-full gap-2">
          <div className="flex flex-col">
            <div className="flex gap-[24px] w-full md:w-fit border-b-[3px] border-[#E5D5EF] overflow-x-auto no-scrollbar">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className="relative whitespace-nowrap text-[14px] md:text-[16px] font-medium text-[#540F86] pb-3 transition-all duration-300 overflow-visible"
                >
                  <span className="relative z-10">{tab}</span>

                  {activeTab === tab && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[100%] h-[4px] bg-[#540F86] rounded-t-[10px] transition-all duration-300 z-0" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="w-fit h-[28px] bg-white flex items-center justify-center px-3 gap-[6px] rounded-[10px]">
            <span className="text-[#540F86] text-[14px] font-medium">
              See all
            </span>
            <ChevronDown size={18} color="#000000" />
          </div>
        </div>

        <div className="bg-[#ffffff] w-full px-4 sm:pl-[20px] sm:pr-[30px] pt-[20px] sm:pt-[25px] rounded-[25px] overflow-x-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="min-w-[600px]"
            >
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-[#0B0704] text-[15px] sm:text-[16px] font-primary">
                      SN
                    </TableHead>
                    {activeTab === "Users" ? (
                      <>
                        <TableHead className="text-[#0B0704] text-[15px] sm:text-[16px] font-primary">
                          Employee Name
                        </TableHead>
                        <TableHead className="text-[#0B0704] text-[15px] sm:text-[16px] font-primary">
                          Email
                        </TableHead>
                        <TableHead className="text-[#0B0704] text-[15px] sm:text-[16px] font-primary">
                          Phone
                        </TableHead>
                        <TableHead className="text-[#0B0704] text-[15px] sm:text-[16px] font-primary">
                          Status
                        </TableHead>
                        <TableHead className="text-[#0B0704] text-[15px] sm:text-[16px] font-primary">
                          Action
                        </TableHead>
                      </>
                    ) : (
                      <TableHead className="text-[#0B0704] text-[15px] sm:text-[16px] font-primary">
                        Designation
                      </TableHead>
                    )}
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {department.map((item) => (
                    <TableRow
                      key={item.id}
                      className="text-[#0B0704] text-[13px] sm:text-[14px] font-secondary"
                    >
                      <TableCell className="py-[15px] sm:py-[19px]">
                        {item.id}
                      </TableCell>
                      {activeTab === "Users" ? (
                        <>
                          <TableCell className="py-[15px] sm:py-[19px]">
                            {item.name}
                          </TableCell>
                          <TableCell className="py-[15px] sm:py-[19px]">
                            {item.email}
                          </TableCell>
                          <TableCell className="py-[15px] sm:py-[19px]">
                            {item.phone}
                          </TableCell>
                          <TableCell className="py-[15px] sm:py-[19px]">
                            <div
                              className={`min-w-[80px] sm:w-[93px] h-[27px] flex items-center justify-center rounded-[4.5px] text-[11px] sm:text-[12px] font-medium ${
                                statusColors[item.status]
                              }`}
                            >
                              {item.status}
                            </div>
                          </TableCell>
                          <TableCell className="py-[15px] sm:py-[19px]">
                            <div
                              className="h-[26px] w-[28px] cursor-pointer flex items-center justify-center"
                              role="button"
                              onClick={() =>
                                router.push(`/department/${item.id}`)
                              }
                            >
                              <EyeIcon
                                size={20}
                                className="text-[#ffffff]"
                                fill="#FF811A"
                              />
                            </div>
                          </TableCell>
                        </>
                      ) : (
                        <TableCell className="py-[15px] sm:py-[19px]">
                          {item.designation || "—"}
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default DepartmentStatus;

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
import { EyeIcon } from "lucide-react";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

type StatusType = "Approved" | "Pending" | "Rejected" | "Department";

type DepartmentStatusItem = {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: StatusType;
  Action: string;
  designation?: string;
};

const department: DepartmentStatusItem[] = [
  {
    id: 1,
    name: "Rohan Kulkarni",
    email: "rahul@gmail.com",
    phone: "9824356541",
    status: "Approved",
    Action: "",
    designation: "HR Manager",
  },
  {
    id: 2,
    name: "Sandesh Mehra",
    email: "San@gmail.com",
    phone: "8197765113",
    status: "Pending",
    Action: "",
    designation: "Tech Lead",
  },
];

const statusColors: Record<StatusType, string> = {
  Approved: "text-[#007a6d] bg-[#b2f0e7]",
  Pending: "text-[#9a1a14] bg-[#f8d5d2]",
  Rejected: "text-[#3e1a99] bg-[#d7c7f7]",
  Department: "text-[#664600] bg-[#fff0cc]",
};

const DepartmentStatus = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"Users" | "Designation">("Users");

  const tabs = ["Users", "Designation"] as const;

  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 80, damping: 20, duration: 0.5 }}
      className="bf-[#F9F2FD]"
    >
      <div className="w-full flex flex-col gap-[15px]">
        <div className="flex items-end justify-between w-full ">
          <div className="flex flex-col">
            <div className="flex gap-[40px] w-fit border-b border-[#E5D5EF]">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative text-[16px] font-medium text-[#540F86] pb-2 transition-all duration-300 ${
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

          <div className="w-[104px] h-[28px] bg-white flex items-center justify-center gap-[6px]  rounded-[10px]">
            <span className="text-[#540F86] text-[14px] font-medium">
              See all
            </span>
            <ChevronDown size={18} color="#000000" />
          </div>
        </div>

        <div className="bg-[#ffffff] w-full pl-[30px] pr-[57px] pt-[25px] rounded-[25px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-[#0B0704] text-[16px] font-primary">
                  SN
                </TableHead>
                {activeTab === "Users" ? (
                  <>
                    <TableHead className="text-[#0B0704] text-[16px] font-primary">
                      Employee Name
                    </TableHead>
                    <TableHead className="text-[#0B0704] text-[16px] font-primary">
                      Email
                    </TableHead>
                    <TableHead className="text-[#0B0704] text-[16px] font-primary">
                      Phone
                    </TableHead>
                    <TableHead className="text-[#0B0704] text-[16px] font-primary">
                      Status
                    </TableHead>
                    <TableHead className="text-[#0B0704] text-[16px] font-primary">
                      Action
                    </TableHead>
                  </>
                ) : (
                  <TableHead className="text-[#0B0704] text-[16px] font-primary">
                    Designation
                  </TableHead>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {department.map((item) => (
                <TableRow
                  key={item.id}
                  className="text-[#0B0704] text-[13px] font-secondary"
                >
                  <TableCell className="py-[19px]">{item.id}</TableCell>
                  {activeTab === "Users" ? (
                    <>
                      <TableCell className="py-[19px]">{item.name}</TableCell>
                      <TableCell className="py-[19px]">{item.email}</TableCell>
                      <TableCell className="py-[19px]">{item.phone}</TableCell>
                      <TableCell className="py-[19px]">
                        <div
                          className={`w-[93px] h-[27px] flex items-center justify-center rounded-[4.5px] text-[12px] font-medium ${
                            statusColors[item.status]
                          }`}
                        >
                          {item.status}
                        </div>
                      </TableCell>
                      <TableCell className="py-[19px]">
                        <div
                          className="h-[26px] w-[28px] cursor-pointer flex items-center justify-center"
                          role="button"
                          onClick={() => router.push(`/department/${item.id}`)}
                        >
                          <EyeIcon
                            size={23}
                            className="text-[#ffffff]"
                            fill="#FF811A"
                          />
                        </div>
                      </TableCell>
                    </>
                  ) : (
                    <TableCell className="py-[19px]">
                      {item.designation || "—"}
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </motion.div>
  );
};

export default DepartmentStatus;

"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { EyeIcon } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { info } from "../constant";

const DepartmentInfo = () => {
  const router = useRouter();

  return (
    <div className="w-full overflow-x-auto">
      <div className="bg-white w-full min-w-[640px] sm:min-w-full p-4 sm:pl-[30px] sm:pr-[57px] rounded-[15px] sm:rounded-[25px]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-[#0B0704] text-[14px] sm:text-[16px] font-primary whitespace-nowrap">
                SN
              </TableHead>
              <TableHead className="text-[#0B0704] text-[14px] sm:text-[16px] font-primary whitespace-nowrap">
                Department Name
              </TableHead>
              <TableHead className="text-[#0B0704] text-[14px] sm:text-[16px] font-primary whitespace-nowrap">
                Contact Person
              </TableHead>
              <TableHead className="text-[#0B0704] text-[14px] sm:text-[16px] font-primary whitespace-nowrap">
                Email
              </TableHead>
              <TableHead className="text-[#0B0704] text-[14px] sm:text-[16px] font-primary whitespace-nowrap">
                Phone
              </TableHead>
              <TableHead className="text-[#0B0704] text-[14px] sm:text-[16px] font-primary whitespace-nowrap">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {info.map((item) => (
              <TableRow
                key={item.id}
                className="text-[#0B0704] text-[12px] sm:text-[13px] font-secondary"
              >
                <TableCell className="py-[12px] sm:py-[19px] whitespace-nowrap">
                  {item.id}
                </TableCell>
                <TableCell className="py-[12px] sm:py-[19px] whitespace-nowrap">
                  {item.department}
                </TableCell>
                <TableCell className="py-[12px] sm:py-[19px] whitespace-nowrap">
                  {item.name}
                </TableCell>
                <TableCell className="py-[12px] sm:py-[19px] whitespace-nowrap">
                  {item.email}
                </TableCell>
                <TableCell className="py-[12px] sm:py-[19px] whitespace-nowrap">
                  {item.phone}
                </TableCell>
                <TableCell className="py-[12px] sm:py-[19px] whitespace-nowrap">
                  <div
                    className="h-[26px] w-[28px] cursor-pointer flex items-center justify-center"
                    role="button"
                    onClick={() => router.push(`/department/${item.id}`)}
                  >
                    <EyeIcon size={20} className="text-white" fill="#FF811A" />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DepartmentInfo;

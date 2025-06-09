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
    <div>
      <div className="bg-[#ffffff] w-full pl-[30px] pr-[57px] rounded-[25px]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-[#0B0704] text-[16px] font-primary ">
                SN
              </TableHead>
              <TableHead className="text-[#0B0704] text-[16px] font-primary ">
                Department Name{" "}
              </TableHead>
              <TableHead className="text-[#0B0704] text-[16px] font-primary ">
                Contact Person{" "}
              </TableHead>
              <TableHead className="text-[#0B0704] text-[16px] font-primary ">
                Email
              </TableHead>
              <TableHead className="text-[#0B0704] text-[16px] font-primary ">
                Phone
              </TableHead>
              <TableHead className="text-[#0B0704] text-[16px] font-primary">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {info.map((item) => (
              <TableRow
                key={item.id}
                className="text-[#0B0704] text-[13px] font-secondary pb-[25px] pt-[19px]"
              >
                <TableCell className="text-[13px] font-secondary pb-[25px] pt-[19px]">
                  {item.id}
                </TableCell>
                <TableCell className="text-[13px] font-secondary pb-[25px] pt-[19px]">
                  {item.department}
                </TableCell>
                <TableCell className="text-[13px] font-secondary pb-[25px] pt-[19px]">
                  {item.name}
                </TableCell>
                <TableCell className="text-[13px] font-secondary pb-[25px] pt-[19px]">
                  {item.email}
                </TableCell>
                <TableCell className="text-[13px] font-secondary pb-[25px] pt-[19px]">
                  {item.phone}
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DepartmentInfo;

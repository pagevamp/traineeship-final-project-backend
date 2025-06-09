import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { financialDetails } from "./constant";

const Referral = () => {
  return (
    <div className="overflow-x-auto px-4 sm:px-6 md:px-8">
      {/* Use overflow-x-auto to enable horizontal scroll on small screens */}
      <div
        className="
          bg-white 
          max-w-full 
          md:max-w-[1110px] 
          mx-auto 
          rounded-[25px] 
          pl-[30px] 
          pr-[57px] 
          py-4
          "
      >
        <Table className="min-w-[700px] md:min-w-full">
          {/* min-w on table to prevent squishing */}
          <TableHeader>
            <TableRow>
              <TableHead className="text-[#0B0704] text-[16px] font-primary whitespace-nowrap">
                SN
              </TableHead>
              <TableHead className="text-[#0B0704] text-[16px] font-primary whitespace-nowrap">
                Finance Manager Name
              </TableHead>
              <TableHead className="text-[#0B0704] text-[16px] font-primary whitespace-nowrap">
                Business Associate
              </TableHead>
              <TableHead className="text-[#0B0704] text-[16px] font-primary whitespace-nowrap">
                Email
              </TableHead>
              <TableHead className="text-[#0B0704] text-[16px] font-primary whitespace-nowrap">
                Phone
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {financialDetails.map((item) => (
              <TableRow
                key={item.id}
                className="text-[#0B0704] text-[13px] font-secondary"
              >
                <TableCell className="text-[13px] font-secondary whitespace-nowrap">
                  {item.id}
                </TableCell>
                <TableCell className="text-[13px] font-secondary whitespace-nowrap">
                  {item.name}
                </TableCell>
                <TableCell className="text-[13px] font-secondary whitespace-nowrap">
                  {item.associate}
                </TableCell>
                <TableCell className="text-[13px] font-secondary whitespace-nowrap">
                  {item.email}
                </TableCell>
                <TableCell className="text-[13px] font-secondary whitespace-nowrap">
                  {item.phone}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Referral;

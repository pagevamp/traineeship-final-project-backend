import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { financeDetails } from "./constant";

const FinanceManager = () => {
  return (
    <div className="w-full overflow-x-auto px-4 md:px-6 lg:px-10">
      <div className="min-w-[600px] bg-white rounded-[25px] px-4 py-6 md:px-8 md:py-8">
        <Table className="min-w-[600px] md:min-w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="text-[#0B0704] text-[14px] md:text-[16px] font-primary whitespace-nowrap">
                SN
              </TableHead>
              <TableHead className="text-[#0B0704] text-[14px] md:text-[16px] font-primary whitespace-nowrap">
                Finance Manager Name
              </TableHead>
              <TableHead className="text-[#0B0704] text-[14px] md:text-[16px] font-primary whitespace-nowrap">
                Email
              </TableHead>
              <TableHead className="text-[#0B0704] text-[14px] md:text-[16px] font-primary whitespace-nowrap">
                Phone
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {financeDetails.map((item) => (
              <TableRow
                key={item.id}
                className="text-[#0B0704] text-[12px] md:text-[13px] font-secondary"
              >
                <TableCell className="py-3 whitespace-nowrap">
                  {item.id}
                </TableCell>
                <TableCell className="py-3 whitespace-nowrap">
                  {item.name}
                </TableCell>
                <TableCell className="py-3 whitespace-nowrap">
                  {item.email}
                </TableCell>
                <TableCell className="py-3 whitespace-nowrap">
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

export default FinanceManager;

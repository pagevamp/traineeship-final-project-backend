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
    <div>
      <div className="w-full bg-[#ffffff] w-[1110px] pl-[30px] pr-[57px] rounded-[25px]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-[#0B0704] text-[16px] font-primary ">
                SN
              </TableHead>
              <TableHead className="text-[#0B0704] text-[16px] font-primary ">
                Finance Manager Name
              </TableHead>
              <TableHead className="text-[#0B0704] text-[16px] font-primary ">
                Email
              </TableHead>
              <TableHead className="text-[#0B0704] text-[16px] font-primary ">
                Phone
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {financeDetails.map((item) => (
              <TableRow
                key={item.id}
                className="text-[#0B0704] text-[13px] font-secondary pb-[25px] pt-[19px]"
              >
                <TableCell className="text-[13px] font-secondary pb-[25px] pt-[19px]">
                  {item.id}
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default FinanceManager;

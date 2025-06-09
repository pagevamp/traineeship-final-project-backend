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
    <div>
      <div className="bg-[#ffffff] w-[1110px] pl-[30px] pr-[57px] rounded-[25px]">
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
                Business Associate
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
            {financialDetails.map((item) => (
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
                  {item.associate}
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

export default Referral;

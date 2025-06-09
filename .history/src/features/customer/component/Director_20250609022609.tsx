import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { directorDetails } from "./constant";

const Director = () => {
  return (
    <div className="px-4 md:px-6 lg:px-10 w-full p-4 md:p-6">
      <div className="bg-white rounded-[25px] overflow-x-auto">
        <div className="min-w-[600px] w-full">
          <Table className="min-w-[600px] md:min-w-full">
            <TableHeader>
              <TableRow>
                <TableHead className="text-[#0B0704] text-[14px] md:text-[16px] font-primary">
                  SN
                </TableHead>
                <TableHead className="text-[#0B0704] text-[14px] md:text-[16px] font-primary">
                  Director's Name
                </TableHead>
                <TableHead className="text-[#0B0704] text-[14px] md:text-[16px] font-primary">
                  Email
                </TableHead>
                <TableHead className="text-[#0B0704] text-[14px] md:text-[16px] font-primary">
                  Phone
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {directorDetails.map((item) => (
                <TableRow
                  key={item.id}
                  className="text-[#0B0704] text-[12px] md:text-[13px] font-secondary"
                >
                  <TableCell className="py-[15px]">{item.id}</TableCell>
                  <TableCell className="py-[15px]">{item.name}</TableCell>
                  <TableCell className="py-[15px]">{item.email}</TableCell>
                  <TableCell className="py-[15px]">{item.phone}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Director;

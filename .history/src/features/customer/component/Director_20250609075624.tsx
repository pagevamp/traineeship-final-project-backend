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
    <div className="px-4 md:px-6 lg:px-6 w-full">
      <div className="bg-white rounded-[25px] overflow-x-auto md:mx-6">
        <div className="w-full min-w-full md:min-w-[600px] lg:min-w-[600px]">
          <Table className="w-full min-w-full md:min-w-[600px]">
            <TableHeader>
              <TableRow>
                <TableHead className="text-[#0B0704] text-[12px] md:text-[16px] font-primary px-2 md:px-4 py-2">
                  SN
                </TableHead>
                <TableHead className="text-[#0B0704] text-[12px] md:text-[16px] font-primary px-2 md:px-4 py-2">
                  Director's Name
                </TableHead>
                <TableHead className="text-[#0B0704] text-[12px] md:text-[16px] font-primary px-2 md:px-4 py-2">
                  Email
                </TableHead>
                <TableHead className="text-[#0B0704] text-[12px] md:text-[16px] font-primary px-2 md:px-4 py-2">
                  Phone
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {directorDetails.map((item) => (
                <TableRow
                  key={item.id}
                  className="text-[#0B0704] text-[10px] md:text-[13px] font-secondary"
                >
                  <TableCell className="py-2 px-2 md:py-4 md:px-4">
                    {item.id}
                  </TableCell>
                  <TableCell className="py-2 px-2 md:py-4 md:px-4">
                    {item.name}
                  </TableCell>
                  <TableCell className="py-2 px-2 md:py-4 md:px-4">
                    {item.email}
                  </TableCell>
                  <TableCell className="py-2 px-2 md:py-4 md:px-4">
                    {item.phone}
                  </TableCell>
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

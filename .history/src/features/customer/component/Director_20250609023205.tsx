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
    <div className=" lg:px-10  px-4 md:px-[22px] pb-6 md:pb-[18px]">
      <div className="bg-white rounded-[25px] overflow-x-auto">
        <div className="min-w-[600px] w-full">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-[#0B0704] text-[16px] font-primary">
                  SN
                </TableHead>
                <TableHead className="text-[#0B0704] text-[16px] font-primary">
                  Directors Name
                </TableHead>
                <TableHead className="text-[#0B0704] text-[16px] font-primary">
                  Email
                </TableHead>
                <TableHead className="text-[#0B0704] text-[16px] font-primary">
                  Phone
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {directorDetails.map((item) => (
                <TableRow
                  key={item.id}
                  className="text-[#0B0704] text-[13px] font-secondary"
                >
                  <TableCell className="py-[19px]">{item.id}</TableCell>
                  <TableCell className="py-[19px]">{item.name}</TableCell>
                  <TableCell className="py-[19px]">{item.email}</TableCell>
                  <TableCell className="py-[19px]">{item.phone}</TableCell>
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

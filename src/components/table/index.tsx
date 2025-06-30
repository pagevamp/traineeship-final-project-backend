"use client";

import React, { ReactNode } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { get } from "lodash";
import { PageLoader } from "../loaders/page-loader";
import { NoDataFound } from "@/components/Nodatafound/NoDataFound";
import { cn } from "@/lib/utils";
import { MoreVertical } from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

type Column = {
  key: string;
  label: string | ReactNode;
  type?: string;
};

type Action = {
  label: React.JSX.Element;
  onClick?: (row: any) => void;
  disabled?: boolean;
  variant?: "default" | "destructive";
  title?: string;
};

type Props = {
  columns: Column[];
  data: any[];
  isLoading: boolean;
  currentPage: number;
  actions?: Action[];
  className?: string;
  showSN?: boolean;
};

const TableComponent: React.FC<Props> = ({
  columns,
  data,
  actions,
  isLoading,
  currentPage,
  className,
  showSN = true,
}) => {
  const getData = (row: any, key: string, type?: string) => {
    if (type == "status") {
      return <div className="">Pending</div>;
    }
    return get(row, key) || "N/A";
  };
  return (
    <div
      className={cn(
        "bg-[#ffffff] border shadow rounded-3xl px-4 hover:shadow-md transition-shadow duration-300",
        className && className
      )}
    >
      <div className="w-full overflow-x-auto ">
        <Table className="min-w-full rounded-lg">
          <TableHeader>
            <TableRow className="">
              {/* Fixed SN Column */}
              {showSN && (
                <TableHead className="px-4 py-4 text-left w-12 text-[#0B0704] font-medium text-sm font-primary">
                  SN
                </TableHead>
              )}
              {columns.map((col) => (
                <TableHead
                  key={col.key}
                  className="px-4 py-2 whitespace-nowrap text-left text-sm font-primary text-[#0B0704] font-medium"
                >
                  {col.label}
                </TableHead>
              ))}
              {actions && (
                <TableHead className="px-4 py-2 text-center text-[#0B0704] font-medium text-sm">
                  Actions
                </TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading && (
              <TableRow className="hover:!bg-transparent">
                <TableCell colSpan={100}>
                  <div className="py-14">
                    <PageLoader />
                  </div>
                </TableCell>
              </TableRow>
            )}
            {!isLoading &&
              data &&
              data.length > 0 &&
              data.map((row, rowIndex) => (
                <TableRow key={rowIndex} className="">
                  {/* Auto-Generated Serial Number */}
                  {showSN && (
                    <TableCell className="px-4 py-3 text-[#0B0704] font-secondary font-[300] text-[13px]">
                      {(Number(currentPage) - 1) * 10 + rowIndex + 1}
                    </TableCell>
                  )}
                  {columns.map((col) => (
                    <TableCell
                      key={col.key}
                      className="px-4 py-3 truncate max-w-48 font-secondary font-[300] text-[13px]"
                    >
                      {getData(row, col.key, col.type)}
                    </TableCell>
                  ))}
                  {actions && (
                    <TableCell className="px-4 py-3 flex justify-center">
                      <Popover>
                        <PopoverTrigger asChild>
                          <MoreVertical className="text-muted-foreground cursor-pointer" />
                        </PopoverTrigger>
                        <PopoverContent>
                          <div className="w-40 p-2 bg-white outline-none border shadow-md rounded-md flex flex-col items-center">
                            {actions.map((action, index) => (
                              <div
                                key={index}
                                onClick={() => action.onClick?.(row)}
                                className="flex w-full items-center gap-2 p-2 hover:bg-gray-100 rounded cursor-pointer"
                              >
                                <button
                                  disabled={action.disabled}
                                  className="w-fit text-left text-sm outline-none text-gray-700 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  {action.label}
                                </button>
                                {action?.title && (
                                  <p className="font-secondary font-[400] text-sm">
                                    {action?.title}
                                  </p>
                                )}
                              </div>
                            ))}
                          </div>
                        </PopoverContent>
                      </Popover>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            {!isLoading && data && data.length == 0 && (
              <TableRow>
                <TableCell
                  colSpan={columns.length + 2}
                  className="text-center py-4"
                >
                  <NoDataFound />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TableComponent;

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
    if (type === "fullName") {
      const firstName = get(row, "firstName");
      const lastName = get(row, "lastName");
      const fullName = `${firstName ?? ""} ${lastName ?? ""}`.trim();
      return <div className="truncate max-w-40">{fullName || "N/A"}</div>;
    }
    return get(row, key) ?? "N/A";
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
                      className="px-4 py-3 truncate max-w-40 font-secondary font-[300] text-[13px]"
                    >
                      {getData(row, col.key, col.type)}
                    </TableCell>
                  ))}
                  {actions && (
                    <TableCell className="px-4 py-3 flex gap-3 justify-center">
                      {actions.map((action, index) => (
                        <button
                          key={index}
                          onClick={() => action.onClick && action.onClick(row)}
                          disabled={action.disabled}
                          className="text-sm bg-transparent cursor-pointer"
                        >
                          {action.label}
                        </button>
                      ))}
                    </TableCell>
                  )}
                </TableRow>
              ))}
            {((!isLoading && data?.length === 0) || !data) && (
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

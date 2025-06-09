"use client";

import React from "react";
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

type Column = {
  key: string;
  label: string;
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
};

const TableComponent: React.FC<Props> = ({
  columns,
  data,
  actions,
  isLoading,
  currentPage,
}) => {
  const getData = (row: any, key: string, type?: string) => {
    if (type == "status") {
      return <div className="">Pending</div>;
    }
    return get(row, key) ?? "N/A";
  };
  return (
    <div className="bg-[#ffffff] rounded-3xl px-5">
      <div className="w-full overflow-x-auto ">
        <Table className="min-w-full rounded-lg">
          <TableHeader>
            <TableRow className="">
              {/* Fixed SN Column */}
              <TableHead className="px-4 py-4 text-left w-12 text-[#0B0704] font-medium text-sm font-primary">
                SN
              </TableHead>
              {columns.map((col) => (
                <TableHead
                  key={col.key}
                  className="px-4 py-2 text-left text-sm font-primary text-[#0B0704] font-medium"
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
                  <TableCell className="px-4 py-2 text-[#0B0704] font-secondary font-[300] text-[13px]">
                    {(Number(currentPage) - 1) * 10 + rowIndex + 1}
                  </TableCell>
                  {columns.map((col) => (
                    <TableCell
                      key={col.key}
                      className="px-4 py-4 truncate max-w-48 font-secondary font-[300] text-[13px]"
                    >
                      {getData(row, col.key, col.type)}
                    </TableCell>
                  ))}
                  {actions && (
                    <TableCell className="px-4 py-4 flex gap-8 justify-center">
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

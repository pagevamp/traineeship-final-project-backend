"use client";

import { NoDataFound } from "@/components/Nodatafound/NoDataFound";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn, getStatusStyle } from "@/lib/utils";
import { capitalize, get } from "lodash";
import { MoreVertical } from "lucide-react";
import { PageLoader } from "../loaders/page-loader";

import { Icon } from "@iconify/react/dist/iconify.js";
import { formatDate } from "date-fns";
import Link from "next/link";
import React, { ReactNode } from "react";

type Column = {
  key: string;
  label: string | ReactNode;
  type?: string;
  subkey?: string;
};

export type Action = {
  label: React.JSX.Element;
  onClick?: (row: any) => void;
  disabled?: boolean;
  variant?: "default" | "destructive";
  title?: string;
};

type Props = {
  columns: Column[];
  data: any[];
  isLoading?: boolean;
  currentPage?: number;
  actions?: Action[];
  className?: string;
  showSN?: boolean;
  showHeader?: boolean;
};

const TableComponent: React.FC<Props> = ({
  columns,
  data,
  actions,
  isLoading,
  currentPage,
  className,
  showHeader = true,
  showSN = true,
}) => {
  const getData = (row: any, col: any) => {
    const { key, type, subkey, buttons } = col;

    if (type == "date") {
      const date = get(row, key, "-");
      return <div className="">{formatDate(date, "MM-dd-yyyy")}</div>;
    }

    if (type == "orderStatus") {
      const status = get(row, key, "-");
      return (
        <div
          className="rounded-full px-2 py-1 text-xs font-semibold w-fit"
          style={getStatusStyle(status)}
        >
          {status}
        </div>
      );
    } else if (type && type == "multiple") {
      const data = row?.[`${key}`].map((it: any) => get(it, subkey || "", "-"));
      if (data?.length === 0) return "-";
      return (
        <td className="pr-6 whitespace-nowrap">
          {data?.map((deta: any, index: number) => (
            <div className="my-3 " key={index}>
              {deta ? deta : "-"}
            </div>
          ))}
        </td>
      );
    } else if (type && type == "multiple_inventory_button") {
      const data = row?.[`${key}`];
      if (data?.length === 0) return "-";
      return (
        <td className="pr-6 whitespace-nowrap">
          {data?.map((deta: any, index: number) => (
            <div
              className="my-3 text-[#090000] font-normal text-[14px] space-x-1"
              key={index}
            >
              {buttons?.map((button: any, i: number) => {
                if (button.type === "view") {
                  return (
                    <Link href={`/inventory/variation/${deta.id}`} key={i}>
                      <span
                        className={`text-gray-400 text-xs  cursor-pointer`}
                        title="View"
                      >
                        <Icon
                          icon="heroicons:eye-16-solid"
                          width="22"
                          height="22"
                          color="#FF811A"
                        />
                      </span>
                    </Link>
                  );
                }
              })}
            </div>
          ))}
        </td>
      );
    }
    if (type === "fullName") {
      const firstName = get(row, "firstName");
      const lastName = get(row, "lastName");
      const fullName = `${firstName ?? ""} ${lastName ?? ""}`.trim();
      return <div className="truncate max-w-40">{fullName || "N/A"}</div>;
    }
    if (type === "importerFullName") {
      const firstName = get(row, "user.firstName");
      const lastName = get(row, "user.lastName");
      const fullName = `${firstName ?? ""} ${lastName ?? ""}`.trim();
      return <div className="truncate max-w-40">{fullName || "N/A"}</div>;
    }
    if (type === "NetTerms") {
      const netTerms = get(row, "netTerm.days");
      const netTermDays = `${netTerms ?? ""} Days`.trim();
      return <div className="truncate max-w-40">{netTermDays || "N/A"}</div>;
    }
    if (type === "companyType") {
      const cType = get(row, "companyType");
      const type = `${capitalize(cType?.split("_")?.join(" ")) ?? ""}`;
      return (
        <div className="truncate max-w-40 capitalize">{type || "N/A"}</div>
      );
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
                <TableHead className="px-4 py-2 text-end text-[#0B0704] font-medium text-sm">
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
                <TableRow key={rowIndex} className="relative">
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
                      {getData(row, col)}
                    </TableCell>
                  ))}
                  {actions && (
                    <TableCell className="flex justify-center items-center absolute right-0 px-6 top-1/2 -translate-y-1/2 ">
                      <Popover>
                        <PopoverTrigger asChild>
                          <MoreVertical className="text-muted-foreground cursor-pointer" />
                        </PopoverTrigger>
                        <PopoverContent side="left">
                          <div className="w-fit p-2 bg-white outline-none border shadow-md rounded-md flex flex-col items-center">
                            {actions.map((action, index) => (
                              <div
                                key={index}
                                onClick={() => action.onClick?.(row)}
                                className="flex w-full items-center gap-3 px-4 py-2 hover:bg-gray-100 rounded cursor-pointer"
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

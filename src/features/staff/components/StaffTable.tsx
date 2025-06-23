"use client";
import React, { useState } from "react";
import { STAFF_COLUMN, StaffData } from "../constant";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import TableComponent from "@/components/table";
import { Controller } from "react-hook-form";
import { ChevronLeft } from "lucide-react";
import { Selectbox } from "@/components/ui/select-box";
import Image from "next/image";

const StaffTable = ({ control }: { control: any }) => {
  const router = useRouter();
  const [state, setState] = useState({
    pagination: {
      page: 1,
      recordsPerPage: 10,
    },
    search: "",
  });

  const actions = [
    {
      label: (
        <Icon
          icon="heroicons:eye-16-solid"
          width="22"
          height="22"
          color="#FF811A"
        />
      ),
      onClick: (row: any) => router.push(`/orders/${row.id}`),
    },
    {
      label: (
        <Icon
          icon="material-symbols:edit-outline-rounded"
          width="22"
          height="22"
          color="#FF811A"
        />
      ),
      onClick: (row: any) => router.push(`/orders/${row.id}`),
    },
  ];
  return (
    <div className="rounded-t-[25px] bg-white p-4">
      <div className="flex justify-between items-center mb-2 w-full">
        <div className="text-[16px]">
          <span className="font-primary font-bold text-[14px] md:text-[16px]">
            Verification Request
          </span>
        </div>

        <div className="flex items-center gap-2 sm:flex-row-2">
          <Controller
            name="contactType"
            control={control}
            render={({ field }) => (
              <Selectbox
                options={[
                  { label: "Stuti Upreti", value: "Stuti Upreti" },
                  { label: "Suchi Gurung", value: "Suchi Gurung" },
                  { label: "Binayak Chhettri", value: "Binayak Chhettri" },
                ]}
                value={field.value || ""}
                onChange={(selected) => field.onChange(selected.value)}
                placeholder="Select A Customer"
                emptyText="No data found."
                className="min-w-[100px] md:min-w-[200px] lg:min-w-[300px] bg-white h-12 p-4 border border-orange-400"
              />
            )}
          />

          <div>
            <div
              className={`bg-white hover:bg-primary-light gradient-border w-10 h-10 m-auto flex items-center justify-center rounded-full  cursor-pointer`}
            >
              <Icon
                icon="ion:filter-outline"
                width="22"
                height="22"
                className="text-primary"
              />
            </div>
          </div>

          <div>
            <div
              className={`bg-white hover:bg-primary-light gradient-border w-10 h-10 m-auto flex items-center justify-center rounded-full p-3 cursor-pointer`}
            >
              <Image
                src="/Download.svg"
                alt="Download Icon"
                width={18}
                height={21}
              />
            </div>
          </div>
        </div>
      </div>

      <TableComponent
        currentPage={state.pagination.page}
        columns={STAFF_COLUMN}
        data={StaffData}
        isLoading={false}
        actions={actions}
        className="border-none shadow-none hover:shadow-none"
      />
    </div>
  );
};

export default StaffTable;

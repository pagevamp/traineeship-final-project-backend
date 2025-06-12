"use client";
import React from "react";
import TableComponent from "@/components/table";
import { DETAIL_COLUMN, shipmentDetail } from "../constant";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

const ShipmentDetail = () => {
  const router = useRouter();

  const [state, setState] = useState({
    pagination: {
      page: 1,
      recordsPerPage: 10,
    },
    search: "",
  });

  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between items-center px-6 pb-1">
        <span className="font-primary text-black font-normal text-[16px]">
          Details
        </span>
      </div>
      <div className="bg-[#ffffff] w-full rounded-[25px] relative">
        <div className="absolute right-1 -top-4">
          <Button
            variant="outline"
            className="flex items-center bg-white text-primary text-[13px] font-weight-200 border border-primary rounded-[37px] px-4"
          >
            Edit
            <Image
              src="/pencilorange.svg"
              alt="pencilorange"
              width={12}
              height={12}
            />
          </Button>
        </div>
        <TableComponent
          currentPage={state.pagination.page}
          columns={DETAIL_COLUMN}
          data={shipmentDetail}
          isLoading={false}
        />
      </div>
    </div>
  );
};

export default ShipmentDetail;

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
    <div className="flex flex-col gap-1">
      <div className="flex flex-row justify-between items-center px-6">
        <span className="font-primary text-black font-weight-1000 text-[16px]">
          Details
        </span>

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
      <div className="bg-[#ffffff] w-full p-4 rounded-[25px] overflow-x-auto">
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

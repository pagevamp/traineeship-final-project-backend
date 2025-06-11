"use client";
import React from "react";
import TableComponent from "@/components/table";
import { SHIPMENT_COLUMN, shipmentData } from "../constant";
import { useState } from "react";

import { useRouter } from "next/navigation";

const ShipmentTable = () => {
  const router = useRouter();

  const [state, setState] = useState({
    pagination: {
      page: 1,
      recordsPerPage: 10,
    },
    search: "",
  });

  return (
    <div className="flex flex-col gap-[15px]">
      <div className="bg-[#ffffff] w-full p-4 rounded-[25px] overflow-x-auto">
        <TableComponent
          currentPage={state.pagination.page}
          columns={SHIPMENT_COLUMN}
          data={shipmentData}
          isLoading={false}
        />
      </div>
    </div>
  );
};

export default ShipmentTable;

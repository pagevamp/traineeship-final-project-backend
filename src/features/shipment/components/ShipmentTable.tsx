"use client";
import React from "react";
import TableComponent from "@/components/table";
import { SHIPMENT_COLUMN, shipmentData } from "../constant";
import { useState } from "react";

import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react/dist/iconify.js";

const ShipmentTable = () => {
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
      onClick: (row: any) => router.push(`/shipment/${row.id}`),
    },
    {
      label: (
        <Icon
          icon="proicons:arrow-download"
          width="22"
          height="22"
          color="#FF811A"
        />
      ),
      onClick: (row: any) => ({}),
    },
  ];

  return (
    <div className="flex flex-col gap-[15px]">
      <div
      // className="bg-[#ffffff] w-full rounded-[25px] overflow-x-auto"
      >
        <TableComponent
          currentPage={state.pagination.page}
          columns={SHIPMENT_COLUMN}
          data={shipmentData}
          isLoading={false}
          actions={actions}
        />
      </div>
    </div>
  );
};

export default ShipmentTable;

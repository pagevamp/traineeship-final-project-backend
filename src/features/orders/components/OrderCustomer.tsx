"use client";

import React, { useState } from "react";
import { basicDetails, CUSTOMER_COLUMN, CustomerData } from "../constant";
import TableComponent from "@/components/table";

const OrderCustomer = () => {
  const [state, setState] = useState({
    pagination: {
      page: 1,
      recordsPerPage: 10,
    },
    search: "",
  });
  return (
    <div className="flex flex-col gap-2 my-2">
      <span className="text-start text-[14px] md:text-[16px] font-secondary ">
        Customer details
      </span>
      <div className="bg-[#F9F3FF] p-3 rounded-[5px]">
        <div className="bg-[#FFFFFF] flex flex-col gap-2 p-4">
          <span className="font-secondary text-[14px] md:text-[16px] font-weight-200">
            Basic Information{" "}
          </span>
          <div className="w-full sm:max-w-[823px] grid grid-cols-2 sm:grid-cols-2 gap-x-8 gap-y-4">
            {basicDetails.map((detail, index) => (
              <div key={index} className="flex items-center gap-2">
                <p>
                  <span className="font-secondary text-[12px] md:text-[14px] mr-[2px] text-muted-light font-light">
                    {detail.label}:{" "}
                  </span>
                  <span className="font-secondary text-[12px] md:text-[14px] font-normal font-weight-200">
                    {detail.value}
                  </span>
                </p>
              </div>
            ))}
          </div>
        </div>
        <TableComponent
          currentPage={state.pagination.page}
          columns={CUSTOMER_COLUMN}
          data={CustomerData}
          isLoading={false}
          showSN={false}
          className="border-b-transparent rounded-[0px] shadow-none border-transparent"
        />
      </div>
    </div>
  );
};

export default OrderCustomer;

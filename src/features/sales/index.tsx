"use client";
import React, { useState } from "react";
import SearchComponent from "@/components/SearchComponent/SearchComponent";
import Image from "next/image";
import DownloadIcon from "../../../public/images/download-icon.svg";
import TableComponent from "@/components/table";
import { SALES_COLUMN, SalesData } from "./constant";

const Index = () => {
  // managing states
  const [state, setState] = useState({
    pagination: {
      page: 1,
      recordsPerPage: 10,
    },
    search: "",
  });
  return (
    <div>
      <div className="flex items-center gap-4">
        <SearchComponent
          state={state}
          setState={setState}
          placeholder="Search for user"
          className="w-[80%]"
        />
        <div>
          <div
            className={`bg-white gradient-border w-10 h-10 m-auto flex items-center justify-center rounded-full p-2 cursor-pointer`}
          >
            <Image
              src={DownloadIcon}
              alt="Download Icon"
              width={18}
              height={21}
            />
          </div>
        </div>
      </div>

      <div className="pt-4">
        <TableComponent
          currentPage={state.pagination.page}
          columns={SALES_COLUMN}
          data={SalesData}
          isLoading={false}
        />
      </div>
    </div>
  );
};

export default Index;

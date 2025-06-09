"use client";
import React, { useState } from "react";
import Image from "next/image";
import SearchComponent from "@/components/SearchComponent/SearchComponent";
import DepartmentStatus from "./DepartmentStatus";
import DepartmentInfoCard from "./DepartmentInfoCard";

const DepartmentId = () => {
  const [state, setState] = useState({
    pagination: {
      page: 1,
      recordsPerPage: 10,
    },
    search: "",
  });

  return (
    <>
      <div className="mb-[43px]">
        <DepartmentInfoCard />
      </div>
      <div>
        <div className="flex items-center gap-4">
          <SearchComponent
            state={state}
            setState={setState}
            placeholder="Search for user"
            className="w-[80%]"
          />
          <div>
            <div className="bg-white gradient-border w-10 h-10 m-auto flex items-center justify-center rounded-full p-2 cursor-pointer">
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
      <div className="mt-[25px]">
        <DepartmentStatus />
      </div>
    </>
  );
};

export default DepartmentId;

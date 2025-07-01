import React from "react";
import TableComponent from "@/components/table";
import { DIRECTOR_COLUMN } from "./constant";

const Director = ({ directorDetails }: { directorDetails?: any }) => {
  return (
    <div className="bg-white rounded-[25px] px-4 md:px-6 lg:px-10 pb-6 md:pb-8 w-full mx-auto">
      <h2 className="text-[12px] md:text-[14px] font-semibold text-[#1A1A1A] mb-4">
        Directors
      </h2>

      <div className="overflow-x-auto">
        <TableComponent
          currentPage={1}
          columns={DIRECTOR_COLUMN}
          data={directorDetails}
          isLoading={false}
          className="border-none shadow-none hover:shadow-none px-0"
        />
      </div>
    </div>
  );
};

export default Director;

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const DashboardModuleLoading = () => {
  return (
    <div className="flex h-full  flex-col overflow-hidden bg-white w-[223px]">
      <div className="p-4 flex items-center justify-center">
        <Skeleton className="h-[64px] w-[95px] bg-gray-200" />
      </div>
      {Array.from({ length: 6 }).map((_, index) => (
        <div className="flex items-center gap-2 p-2 mt-4" key={index}>
          <div>
            <Skeleton className="h-[24px] w-[24px] bg-gray-200" />
          </div>
          <div>
            <Skeleton className="w-[150px] h-[20px] bg-gray-200" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardModuleLoading;

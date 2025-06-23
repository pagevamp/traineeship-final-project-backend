import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const ModuleLoader = () => {
  return (
    <div className="flex h-full  flex-col overflow-hidden bg-white w-full">
      <div className="flex items-center justify-between gap-2 p-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index}>
            <Skeleton className="h-4 w-32 bg-gray-200" />
          </div>
        ))}
      </div>
      {Array.from({ length: 4 }).map((_, index) => (
        <div className="p-4" key={index}>
          <Skeleton className="h-14 bg-gray-200 rounded" />
        </div>
      ))}
    </div>
  );
};

export default ModuleLoader;

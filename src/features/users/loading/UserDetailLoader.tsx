import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const UserDetailLoader = () => {
  const data = Array.from({ length: 8 });

  return (
    <div>
      <Skeleton className="h-4 w-40 bg-gray-200 mb-6" />
      <div className="w-full sm:max-w-[823px] grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
        {data.map((_, index) => (
          <div className="flex items-center gap-2" key={index}>
            <Skeleton className="h-4 w-4 rounded-full bg-gray-200" />
            <Skeleton className="h-4 w-24 bg-gray-200" />
            <Skeleton className="h-4 w-24 bg-gray-200" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserDetailLoader;

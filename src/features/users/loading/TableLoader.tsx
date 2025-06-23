import { Skeleton } from "@/components/ui/skeleton";

export function TableLoader() {
  const rows = Array.from({ length: 10 });

  return (
    <div className="rounded-md border border-gray-200 overflow-hidden">
      <div className="grid grid-cols-6 bg-gray-50 p-3 font-medium text-sm text-gray-700">
        <Skeleton className="h-4 w-5 bg-gray-200" />
        <Skeleton className="h-4 w-24 bg-gray-200" />
        <Skeleton className="h-4 w-32 bg-gray-200" />
        <Skeleton className="h-4 w-40 bg-gray-200" />
        <Skeleton className="h-4 w-28 bg-gray-200" />
        <Skeleton className="h-6 w-6 rounded-full bg-gray-200" />
      </div>

      {rows.map((_, index) => (
        <div
          key={index}
          className="grid grid-cols-6 gap-2 items-center px-3 py-4 border-t bg-white"
        >
          <Skeleton className="h-4 w-5 bg-gray-200" />
          <Skeleton className="h-4 w-24 bg-gray-200" />
          <Skeleton className="h-4 w-32 bg-gray-200" />
          <Skeleton className="h-4 w-40 bg-gray-200" />
          <Skeleton className="h-4 w-28 bg-gray-200" />
          <Skeleton className="h-6 w-6 rounded-full bg-gray-200" />
        </div>
      ))}
    </div>
  );
}

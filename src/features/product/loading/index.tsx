export default function LoadingCard() {
  return (
    <div className="overflow-hidden border bg-white shadow-sm rounded-lg animate-pulse">
      <div className="aspect-[4/5] bg-gray-200"></div>
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="space-y-2">
          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          <div className="flex gap-2">
            <div className="h-6 bg-gray-200 rounded w-12"></div>
            <div className="h-6 bg-gray-200 rounded w-12"></div>
            <div className="h-6 bg-gray-200 rounded w-12"></div>
          </div>
        </div>
        <div className="h-5 bg-gray-200 rounded w-1/4"></div>
      </div>
    </div>
  );
}

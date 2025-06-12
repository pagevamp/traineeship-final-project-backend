"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Download,
  Package,
  Clock,
  AlertCircle,
  ChevronLeft,
  Calendar,
  Hash,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Pagination from "@/components/pagination";
import { useRouter } from "next/navigation";

interface InventoryItem {
  id: string;
  poNumber: string;
  expectedQuantity: string | number;
  receivedQuantity: number;
  receivedAt: string;
}

export default function SingleInventoryDetail() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [sortOrder, setSortOrder] = useState("descending");
  const [pageSize, setPageSize] = useState("10");
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  // managing states
  const [state, setState] = useState({
    pagination: {
      page: 1,
      recordsPerPage: 10,
    },
    search: "",
  });

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const inventoryData = {
    productId: "5",
    productName: "pookie",
    stats: {
      inStock: 0,
      expected: "N/A",
      reorderPoint: 50,
    },
    items: [
      {
        id: "1",
        poNumber: "MANUAL",
        expectedQuantity: "N/A",
        receivedQuantity: 1,
        receivedAt: "05-12-2025",
      },
    ] as InventoryItem[],
  };

  const totalPages = Math.ceil(
    inventoryData.items.length / Number.parseInt(pageSize)
  );

  return (
    <div className="rounded-3xl bg-white">
      <div className="p-4">
        {/* Header Section */}
        <div
          className={cn(
            "mb-6 transition-all duration-500 ease-out",
            isLoaded ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
          )}
        >
          <div className="flex gap-3 mb-2">
            <ChevronLeft
              className="h-6 w-6 mt-1 cursor-pointer"
              onClick={() => router.back()}
            />
            <div>
              <h1 className="text-xl font-secondary text-gray-900">
                {inventoryData.productId}
              </h1>
              <p className="text-gray-500 text-sm">
                ( {inventoryData.productName} )
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div
          className={cn(
            "grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-6 transition-all duration-500 ease-out",
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          )}
          style={{ transitionDelay: "100ms" }}
        >
          <Card className="bg-emerald-600 text-white border-0 shadow-sm hover:shadow-md transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-100 text-sm mb-1">In Stock</p>
                  <p className="text-xl font-bold">
                    {inventoryData.stats.inStock}
                  </p>
                </div>
                <Package className="h-5 w-5 text-emerald-100" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-blue-600 text-white border-0 shadow-sm hover:shadow-md transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm mb-1">Expected</p>
                  <p className="text-xl font-bold">
                    {inventoryData.stats.expected}
                  </p>
                </div>
                <Clock className="h-5 w-5 text-blue-100" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-amber-600 text-white border-0 shadow-sm hover:shadow-md transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-amber-100 text-sm mb-1">Reorder Point</p>
                  <p className="text-xl font-bold">
                    {inventoryData.stats.reorderPoint}
                  </p>
                </div>
                <AlertCircle className="h-5 w-5 text-amber-100" />
              </div>
            </CardContent>
          </Card>

          <div className="flex items-center justify-center">
            <Button
              variant="outline"
              className="bg-white hover:bg-gray-50 border border-gray-200 transition-all duration-200 h-full w-full flex items-center justify-center gap-2"
            >
              <Download className="h-4 w-4" />
              <span>Export</span>
            </Button>
          </div>
        </div>

        {/* Data Table */}
        <Card
          className={cn(
            "border border-gray-200 shadow-sm transition-all duration-500 ease-out rounded-md",
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          )}
          style={{ transitionDelay: "200ms" }}
        >
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50 rounded-md">
                    <th className="text-left p-2 font-secondary font-[400]">
                      <div className="flex items-center gap-2 text-sm">
                        PO #
                      </div>
                    </th>
                    <th className="text-left p-2 font-secondary font-[400] text-sm">
                      Expected Quantity
                    </th>
                    <th className="text-left p-2 font-secondary font-[400] text-sm">
                      Received Quantity
                    </th>
                    <th className="text-left p-2 font-secondary font-[400] text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        Received At
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {inventoryData.items.map((item, index) => (
                    <tr
                      key={item.id}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-all duration-200"
                      style={{
                        animation: isLoaded
                          ? "fadeIn 0.5s ease-out forwards"
                          : "none",
                        animationDelay: `${300 + index * 100}ms`,
                        opacity: 0,
                      }}
                    >
                      <td className="p-2">
                        <Badge
                          variant="outline"
                          className="font-secondary font-[300]"
                        >
                          {item.poNumber}
                        </Badge>
                      </td>
                      <td className="p-2 font-[300]">
                        <span className="font-[300] font-secondary text-xs">
                          {item.expectedQuantity === "N/A" ? (
                            <Badge
                              variant="secondary"
                              className="bg-gray-100 font-[300]"
                            >
                              N/A
                            </Badge>
                          ) : (
                            item.expectedQuantity
                          )}
                        </span>
                      </td>
                      <td className="p-2">
                        <div className="flex items-center gap-2 font-[300]">
                          <span className="font-secondary text-sm">
                            {item.receivedQuantity}
                          </span>
                        </div>
                      </td>
                      <td className="p-2">
                        <span className="font-secondary text-sm font-[300]">
                          {item.receivedAt}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Footer Controls */}
        <div className="mt-4">
          <Pagination
            currentPage={state.pagination.page}
            totalPages={4}
            onPageChange={(page: number) => {
              setState((prevState) => ({
                ...prevState,
                pagination: {
                  ...prevState.pagination,
                  page,
                },
              }));
            }}
          />
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

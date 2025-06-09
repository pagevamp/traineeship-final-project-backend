"use client";

import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Package, ChevronDown, ImageOff } from "lucide-react";
import AnimatedCard from "@/components/animated-card";

export default function TopSellingCard() {
  return (
    <AnimatedCard delay={300}>
      <CardHeader className="flex flex-row flex-wrap items-center gap-2 justify-between space-y-0 pb-4">
        <CardTitle className="flex items-center gap-2 text-base font-secondary font-semibold">
          <div className="p-2 bg-green-100 rounded-lg">
            <Package className="h-5 w-5 text-green-600" />
          </div>
          Top Selling
        </CardTitle>
        <Button
          variant="outline"
          size="xs"
          className="gap-2 font-secondary font-[400]"
        >
          This Month <ChevronDown className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product Name</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Quantity</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell colSpan={3}>
                <div className="flex flex-col items-center justify-center py-8 text-gray-500">
                  <div className="p-3 bg-gray-100 rounded-full mb-3">
                    <ImageOff className="h-8 w-8 text-gray-400" />
                  </div>
                  <p className="text-sm">No data found</p>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </AnimatedCard>
  );
}

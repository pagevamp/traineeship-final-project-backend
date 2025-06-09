"use client";

import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DollarSign, ChevronDown, Search, Download } from "lucide-react";
import AnimatedCard from "@/components/animated-card";

const commissionsData = [
  {
    user: "Nisha sales person",
    totalAmount: 200.0,
    received: 200.0,
    pending: "N/A",
  },
];

export default function SalesCommissionsCard() {
  return (
    <AnimatedCard delay={400}>
      <CardHeader className="flex flex-row flex-wrap items-center gap-2 justify-between space-y-0 pb-4">
        <CardTitle className="flex items-center gap-2 text-base font-secondary font-semibold">
          <div className="p-2 bg-purple-100 rounded-lg">
            <DollarSign className="h-5 w-5 text-purple-600" />
          </div>
          Sales Commissions
        </CardTitle>
        <div className="flex items-center flex-wrap gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input placeholder="Search" className="pl-9 w-48 h-[30px] text-muted-foreground" />
          </div>
          <Button
            variant="outline"
            size="xs"
            className="gap-2 font-secondary font-[400]"
          >
            All time <ChevronDown className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Users</TableHead>
              <TableHead>Total amount</TableHead>
              <TableHead>Received</TableHead>
              <TableHead>Pending</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {commissionsData.map((item, index) => (
              <TableRow
                key={index}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <TableCell className="font-medium">{item.user}</TableCell>
                <TableCell>${item.totalAmount.toFixed(2)}</TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-700"
                  >
                    ${item.received.toFixed(2)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{item.pending}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </AnimatedCard>
  );
}

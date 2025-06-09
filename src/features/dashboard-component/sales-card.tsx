"use client";

import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, ChevronDown } from "lucide-react";
import { useCounterAnimation } from "@/hooks/use-counter-animation";
import AnimatedCard from "@/components/animated-card";

export default function SalesCard() {
  const { count: totalSales, elementRef: totalRef } = useCounterAnimation(
    14700,
    2000
  );
  const { count: dailySales, elementRef: dailyRef } = useCounterAnimation(
    0,
    1000
  );

  return (
    <AnimatedCard delay={100}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="flex items-center gap-2 text-base font-secondary font-semibold">
          <div className="p-2 bg-blue-100 rounded-lg">
            <TrendingUp className="h-5 w-5 text-blue-600" />
          </div>
          Sales
        </CardTitle>
        <Button variant="outline" size="xs" className="gap-2">
          All time <ChevronDown className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <div className="text-sm text-gray-500 mb-1">Total Sales</div>
            <div ref={totalRef} className="text-3xl font-bold text-primary">
              ${totalSales.toLocaleString()}.00
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-500 mb-1">Daily Sales</div>
            <div
              ref={dailyRef}
              className="text-2xl font-semibold text-gray-900"
            >
              ${dailySales.toLocaleString()}.00
            </div>
          </div>
        </div>
      </CardContent>
    </AnimatedCard>
  );
}

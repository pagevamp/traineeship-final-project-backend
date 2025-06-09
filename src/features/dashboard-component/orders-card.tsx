"use client";

import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, ChevronDown } from "lucide-react";
import { useCounterAnimation } from "@/hooks/use-counter-animation";
import AnimatedCard from "@/components/animated-card";
// import DonutChart from "./donut-chart";

const orderData = [
  { label: "Completed", value: 4, color: "#3b82f6" },
  { label: "Processing", value: 2, color: "#f59e0b" },
  { label: "Cancelled", value: 0, color: "#ef4444" },
];

export default function OrdersCard() {
  const { count: totalOrders, elementRef } = useCounterAnimation(6, 1500);

  return (
    <AnimatedCard delay={200}>
      <CardHeader className="flex flex-row flex-wrap items-center gap-2 justify-between space-y-0 pb-4">
        <CardTitle className="flex items-center gap-2 text-base font-secondary font-semibold">
          <div className="p-2 bg-orange-100 rounded-lg">
            <ShoppingCart className="h-5 w-5 text-orange-600" />
          </div>
          Orders
        </CardTitle>
        <Button
          variant="outline"
          size="xs"
          className="gap-2 font-secondary font-[400]"
        >
          All time <ChevronDown className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <div className="text-sm text-gray-500 mb-1">Total Orders</div>
          <div ref={elementRef} className="text-3xl font-bold text-blue-600">
            {totalOrders}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-3">
            {orderData.map((item, index) => (
              <div key={item.label} className="flex items-center gap-3">
                <div
                  className="w-3 h-3 rounded-full animate-pulse"
                  style={{
                    backgroundColor: item.color,
                    animationDelay: `${index * 200}ms`,
                  }}
                />
                <span className="text-sm text-gray-600">{item.label}</span>
                <Badge
                  variant="outline"
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  {item.value}
                </Badge>
              </div>
            ))}
          </div>
          {/* <DonutChart data={orderData} size={120} /> */}
        </div>
      </CardContent>
    </AnimatedCard>
  );
}

"use client";

import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, ChevronDown } from "lucide-react";
import { useCounterAnimation } from "@/hooks/use-counter-animation";
import AnimatedCard from "@/components/animated-card";
import { userRoles } from "./constant";

export default function UserDetailsCard() {
  const { count: totalUsers, elementRef } = useCounterAnimation(8, 1500);

  return (
    <AnimatedCard delay={0}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="flex items-center gap-2 text-base font-secondary font-semibold">
          <div className="p-2 bg-gray-100 rounded-lg">
            <Users className="h-5 w-5 text-gray-600" />
          </div>
          User details
        </CardTitle>
        <Button variant="outline" size="xs" className="gap-2 font-secondary font-[400]">
          All time <ChevronDown className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center flex-wrap gap-4">
          <div>
            <div className="text-sm text-gray-500 mb-1">Total Users</div>
            <div ref={elementRef} className="text-3xl font-bold text-primary">
              {totalUsers}
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          {userRoles.map((role, index) => (
            <div key={role.label} className="flex justify-between items-center">
              <span className="text-sm text-gray-600">{role.label}</span>
              <Badge
                variant="default"
                className="animate-fade-in bg-transparent text-muted-foreground"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {role.count}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </AnimatedCard>
  );
}

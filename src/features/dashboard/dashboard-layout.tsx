"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { DashboardSidebar } from "./dashboard-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Breadcrumb, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { UserNav } from "./UserNav";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [userRole, setUserRole] = useState<string>("admin");
  const pathname = usePathname();
  const router = useRouter();

  // Get current page title from pathname
  const getCurrentPageTitle = () => {
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length === 0) return "Home";
    const lastSegment = segments[segments.length - 1];
    if (/^\d+$/.test(lastSegment) && segments.length >= 2) {
      // If last segment is numeric, use the previous one
      return segments[segments.length - 2]
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    }
    return lastSegment
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  useEffect(() => {
    if (pathname === "/") {
      router.push("/dashboard");
    }
  }, [pathname]);

  return (
    <SidebarProvider defaultOpen={true}>
      <DashboardSidebar userRole={userRole} />
      <SidebarInset>
        <header className="flex min-h-16 py-5 shrink-0 items-center gap-2 sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbPage className="text-primary font-primary capitalize text-lg">
                {getCurrentPageTitle()}
              </BreadcrumbPage>
            </Breadcrumb>
          </div>
          <div className="ml-auto flex items-center gap-2 px-4">
            <UserNav />
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-3 sm:p-4 bg-sidebar-background">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

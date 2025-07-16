"use client";

import React, { useMemo } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { DashboardSidebar } from "./dashboard-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { UserNav } from "./UserNav";
import { useProfileInformation } from "./hooks/useProfileInformation";
import Link from "next/link";
import { moduleRoutes } from "@/routes";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryId = searchParams.get("id");

  const { data: profileInformationData } = useProfileInformation();
  const modules = useMemo(
    () =>
      profileInformationData?.data?.data?.user?.modules ??
      profileInformationData?.data?.data?.modules,
    [
      profileInformationData?.data?.data?.modules,
      profileInformationData?.data?.data?.user?.modules,
    ]
  );

  const isUUID = (segment: string): boolean => {
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
      segment
    );
  };

  // Get current page title from pathname

  const isValidBreadcrumbPath = (href: string): boolean => {
    return Object.values(moduleRoutes).some((patterns) =>
      patterns.some((pattern) => {
        if (pattern.endsWith("/*")) {
          const base = pattern.replace("/*", "");
          return href.startsWith(base);
        }
        return href === pattern;
      })
    );
  };

  const getBreadcrumbs = (pathname: string) => {
    const segments = pathname.split("/").filter(Boolean);
    return segments.map((segment, index) => {
      const href = "/" + segments.slice(0, index + 1).join("/");
      let label = isUUID(segment)
        ? "Detail"
        : segment
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
      const clickable = isValidBreadcrumbPath(href);
      return { href, label, clickable };
    });
  };

  const breadcrumbs = getBreadcrumbs(pathname);
  // Replace "Create" with "Update" if id exists in query
  if (
    breadcrumbs.length &&
    breadcrumbs[breadcrumbs.length - 1].label.toLowerCase() === "create" &&
    queryId
  ) {
    breadcrumbs[breadcrumbs.length - 1].label = "Update";
  }
  if (
    breadcrumbs.length &&
    breadcrumbs[breadcrumbs.length - 1].label.toLowerCase() ===
      "add importer" &&
    queryId
  ) {
    breadcrumbs[breadcrumbs.length - 1].label = "Update Importer";
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full">
        <DashboardSidebar modules={modules} />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="flex min-h-16 py-5 shrink-0 items-center gap-2 sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  {breadcrumbs.map((crumb, idx) => (
                    <React.Fragment key={crumb.href}>
                      <BreadcrumbItem>
                        {idx !== breadcrumbs.length - 1 ? (
                          crumb.clickable ? (
                            <BreadcrumbLink asChild>
                              <Link
                                href={crumb.href}
                                className="font-primary text-base"
                              >
                                {crumb.label}
                              </Link>
                            </BreadcrumbLink>
                          ) : (
                            <span className="font-primary text-base text-gray-500">
                              {crumb.label}
                            </span>
                          )
                        ) : (
                          <BreadcrumbPage className="text-primary font-primary text-base">
                            {crumb.label}
                          </BreadcrumbPage>
                        )}
                      </BreadcrumbItem>
                      {idx !== breadcrumbs.length - 1 && (
                        <BreadcrumbSeparator />
                      )}
                    </React.Fragment>
                  ))}
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <div className="ml-auto flex items-center gap-2 px-4">
              <UserNav profileData={profileInformationData?.data?.data} />
            </div>
          </header>
          <main className="flex-1 overflow-auto gap-4 p-3 sm:p-4 bg-sidebar-background">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

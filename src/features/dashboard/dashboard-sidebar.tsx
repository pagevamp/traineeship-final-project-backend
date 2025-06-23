"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import ArcTernLogo from "../../../public/images/arctern-logo.svg";
import { ChevronRight } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import Image from "next/image";
import { LINKS } from "./constant";
import { Icon } from "@iconify/react/dist/iconify.js";
import DashboardModuleLoading from "./loading";
import { MODULE_ICON } from "@/constant";
import { MODULE_LINK } from "@/routes";

function generateOpenGroups(modulesArray: any[] = []) {
  const groups: Record<string, boolean> = {};
  let isFirstGroupFound = false;

  modulesArray.forEach((mod) => {
    if (mod.isGroup) {
      if (!isFirstGroupFound) {
        groups[mod.name] = true; // open only the first group
        isFirstGroupFound = true;
      } else {
        groups[mod.name] = false;
      }
    }
  });

  return groups;
}

export function DashboardSidebar({ modules }: any) {
  const pathname = usePathname();
  const { state } = useSidebar();
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (Array.isArray(modules)) {
      setOpenGroups(generateOpenGroups(modules));
    }
  }, [modules]);

  const toggleGroup = (title: string) => {
    setOpenGroups((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const isCollapsed = state === "collapsed";

  function generateNavItems(modulesArray: any[]) {
    const navigationItems: any[] = [];

    modulesArray?.forEach((mod) => {
      if (mod.isGroup && Array.isArray(mod.children)) {
        const subItems = mod.children
          .map((child: any) => {
            const link = MODULE_LINK[child.key];
            if (!link) return null;

            return {
              title: child.name,
              href: link.href,
            };
          })
          .filter(Boolean);

        const groupIcon = MODULE_ICON[mod.key];

        if (subItems.length > 0 && groupIcon) {
          navigationItems.push({
            title: mod.name,
            icon: (props: any) => (
              <Icon icon={groupIcon} width="25" height="24" {...props} />
            ),
            subItems,
          });
        }
      } else {
        const link = MODULE_LINK[mod.key];
        const icon = MODULE_ICON[mod.key];
        if (!link || !icon) return;

        navigationItems.push({
          title: mod.name,
          href: link.href,
          icon: (props: any) => (
            <Icon icon={icon} width="25" height="24" {...props} />
          ),
        });
      }
    });

    return navigationItems;
  }

  const dynamicModules = useMemo(() => generateNavItems(modules), [modules]);

  if (!modules) {
    return <DashboardModuleLoading />;
  }

  return (
    <Sidebar
      collapsible="icon"
      className="overflow-hidden [&>[data-sidebar=sidebar]]:flex-row"
    >
      {/* This is the main sidebar */}
      <div className="flex h-full  flex-col overflow-hidden bg-white w-full">
        <SidebarHeader
          className={cn(
            "gap-3 p-4 transition-all duration-200",
            isCollapsed ? "px-2" : "px-4"
          )}
        >
          <div
            className={cn(
              "flex items-center justify-center transition-all duration-200",
              isCollapsed ? "px-0" : "px-12"
            )}
          >
            {isCollapsed ? (
              <div className="w-8 h-8 overflow-hidden relative flex items-center justify-center">
                <Image
                  src={ArcTernLogo}
                  alt="logo"
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>
            ) : (
              <div className="w-[7rem] h-[4rem] overflow-hidden relative">
                <Image
                  src={ArcTernLogo}
                  alt="logo"
                  fill
                  className="object-contain"
                />
              </div>
            )}
          </div>
        </SidebarHeader>

        <SidebarContent className="overflow-x-hidden scroll-bar">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu className="">
                {dynamicModules?.length === 0 ? (
                  isCollapsed ? (
                    <div>
                      <div className="text-4xl mb-3">📭</div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center text-center p-8 rounded-xl border border-dashed border-gray-300 bg-muted/40 shadow-inner animate-fade-in">
                      <div className="text-4xl mb-3">📭</div>

                      <p className="text-xl font-semibold text-muted-foreground font-secondary mb-1">
                        Nothing to view
                      </p>

                      <p className="text-sm text-gray-500 font-secondary font-[300]">
                        You haven’t added any modules yet. Try enabling one to
                        get started!
                      </p>
                    </div>
                  )
                ) : (
                  dynamicModules?.map((item: any) => {
                    const isActive =
                      pathname === item.href ||
                      pathname.includes(item.href) ||
                      item?.subItems?.some(
                        (sub: any) =>
                          pathname === sub.href || pathname.includes(sub.href)
                      );

                    // If item has subitems
                    if (item?.subItems) {
                      const filteredSubItems = item?.subItems;
                      if (filteredSubItems.length === 0) return null;

                      const isGroupOpen = openGroups[item.title];
                      return (
                        <Collapsible
                          key={item.title}
                          asChild
                          open={isGroupOpen}
                          onOpenChange={() => toggleGroup(item.title)}
                          className="group/collapsible"
                        >
                          <SidebarMenuItem
                            className={`relative py-1 font-[400] ${
                              isActive
                                ? "text-primary font-medium"
                                : "text-[#B1B1B1]"
                            }`}
                          >
                            <CollapsibleTrigger asChild>
                              <SidebarMenuButton
                                tooltip={item.title}
                                className={`group/menu-button m-auto gap-2 ${
                                  isActive
                                    ? "text-primary font-medium"
                                    : "text-[#B1B1B1]"
                                }`}
                              >
                                <item.icon className="!size-[22px]" />
                                <span className="text-sm">{item.title}</span>
                                <ChevronRight
                                  className={cn(
                                    "ml-auto size-4 transition-transform duration-200 ease-in-out",
                                    isGroupOpen && "rotate-90"
                                  )}
                                />
                              </SidebarMenuButton>
                            </CollapsibleTrigger>
                            <CollapsibleContent className="transition-all duration-200 ease-in-out data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
                              <SidebarMenuSub className="pl-6">
                                {filteredSubItems.map((subItem: any) => {
                                  const isSubActive = Boolean(
                                    subItem.href && pathname === subItem.href
                                  );

                                  return (
                                    <SidebarMenuSubItem key={subItem.title}>
                                      <SidebarMenuSubButton
                                        asChild
                                        isActive={isSubActive}
                                        className="text-muted-light"
                                      >
                                        <Link href={subItem.href}>
                                          <span>{subItem.title}</span>
                                        </Link>
                                      </SidebarMenuSubButton>
                                    </SidebarMenuSubItem>
                                  );
                                })}
                              </SidebarMenuSub>
                            </CollapsibleContent>
                          </SidebarMenuItem>
                        </Collapsible>
                      );
                    }

                    // Regular item without subitems
                    return (
                      <SidebarMenuItem
                        key={item.title}
                        className={`relative py-1 flex items-center font-[400] ${
                          isActive
                            ? "text-primary font-medium"
                            : "text-[#B1B1B1]"
                        }`}
                      >
                        {isActive && (
                          <div className="absolute -left-2 w-[6px] h-full bg-primary rounded-r-2xl"></div>
                        )}
                        <SidebarMenuButton
                          asChild
                          // isActive={isActive}
                          tooltip={item.title}
                          className=""
                        >
                          <Link
                            href={item.href || "#"}
                            className="flex gap-2 items-center py-1 font-secondary tracking-wide"
                          >
                            <item.icon className="!size-[22px]" />
                            <span className="text-sm">{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })
                )}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        {!isCollapsed && (
          <SidebarFooter className="p-2">
            <div className="flex items-center gap-2 justify-center">
              {LINKS?.map((link, idx) => (
                <a
                  href={link?.href}
                  key={idx}
                  className="font-secondary text-muted font-[300] text-xs hover:underline duration-500 transition ease-in-out"
                >
                  {link?.title}
                </a>
              ))}
            </div>
            <div>
              <p className="text-xs font-secondary text-muted font-[200] text-center">
                Copyright @Arctern 2025
              </p>
            </div>
            <div className="text-center pt-2 font-secondary leading-2 -space-y-1 flex flex-col">
              <p className="font-semibold text-sm">Contact Support:</p>
              <a
                href="mailto:support@arcternexpress.com"
                className="text-xs text-secondary"
              >
                support@arcternexpress.com
              </a>
            </div>
          </SidebarFooter>
        )}
      </div>
      <SidebarRail />
    </Sidebar>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import ArcTernLogo from "../../../public/images/arctern-logo.svg";
import {
  BarChart3,
  Users,
  Settings,
  Package,
  FileText,
  ShoppingCart,
  MessageSquare,
  LayoutDashboard,
  ChevronDown,
  ChevronRight,
  Building2,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { Icon } from "@iconify/react/dist/iconify.js";

const LINKS = [
  {
    title: "Terms & Conditions",
    href: "/termsandconditions",
  },
  {
    title: "Privacy Policy",
    href: "/privacypolicy",
  },
];

// Define navigation items with role-based access
const navigationItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: (props: any) => (
      <Icon icon="garden:home-fill-16" width="12" height="12" {...props} />
    ),
    roles: ["admin", "manager", "user"],
  },
  {
    title: "Customer",
    href: "/dashboard/analytics",
    icon: (props: any) => (
      <Icon icon="raphael:customer" width="32" height="32" {...props} />
    ),
    roles: ["admin", "manager"],
  },
  // {
  //   title: "User Management",
  //   icon: Users,
  //   roles: ["admin"],
  //   subItems: [
  //     {
  //       title: "All Users",
  //       href: "/dashboard/users",
  //       roles: ["admin"],
  //     },
  //     {
  //       title: "Roles",
  //       href: "/dashboard/users/roles",
  //       roles: ["admin"],
  //     },
  //     {
  //       title: "Permissions",
  //       href: "/dashboard/users/permissions",
  //       roles: ["admin"],
  //     },
  //   ],
  // },
  {
    title: "Departments",
    href: "/dashboard/orders",
    icon: (props: any) => (
      <Icon icon="tabler:user-filled" width="24" height="24" {...props} />
    ),
    roles: ["admin", "manager", "user"],
  },
  {
    title: "Shipments",
    href: "/dashboard/reports",
    icon: (props: any) => (
      <Icon
        icon="fluent:vehicle-ship-20-filled"
        width="20"
        height="20"
        {...props}
      />
    ),
    roles: ["admin", "manager"],
  },
  {
    title: "Account",
    href: "/dashboard/messages",
    icon: (props: any) => (
      <Icon icon="streamline:payment-10" width="14" height="14" {...props} />
    ),
    roles: ["admin", "manager", "user"],
  },
  {
    title: "Report",
    href: "/dashboard/settings",
    icon: (props: any) => (
      <Icon
        icon="streamline-plump:file-report"
        width="48"
        height="48"
        {...props}
      />
    ),
    roles: ["admin", "manager", "user"],
  },
  {
    title: "Activities",
    href: "/dashboard/settings",
    icon: (props: any) => (
      <Icon icon="carbon:user-activity" width="32" height="32" {...props} />
    ),
    roles: ["admin", "manager", "user"],
  },
  {
    title: "Setting",
    href: "/dashboard/settings",
    icon: (props: any) => (
      <Icon icon="lets-icons:setting-fill" width="24" height="24" {...props} />
    ),
    roles: ["admin", "manager", "user"],
  },
];

interface DashboardSidebarProps {
  userRole: string;
}

export function DashboardSidebar({ userRole }: DashboardSidebarProps) {
  const pathname = usePathname();
  const { state } = useSidebar();
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    "User Management": true,
    Products: false,
  });

  // Filter navigation items based on user role
  const filteredNavigation = navigationItems.filter((item) =>
    item.roles.includes(userRole)
  );

  const toggleGroup = (title: string) => {
    setOpenGroups((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const isCollapsed = state === "collapsed";

  return (
    <Sidebar
      collapsible="icon"
      className="overflow-hidden [&>[data-sidebar=sidebar]]:flex-row"
    >
      {/* This is the main sidebar */}
      <div className="flex h-full w-full flex-col overflow-hidden bg-white">
        {/* <SidebarHeader className="gap-3 p-4">
          <div className="px-12">
            <div className="w-[7rem] h-[4rem] overflow-hidden relative">
              <Image src={ArcTernLogo} alt="logo" fill />
            </div>
          </div>
        </SidebarHeader> */}
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
              // Small logo for collapsed state
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
              // Full logo for expanded state
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

        <SidebarContent className="overflow-x-hidden m-auto">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu className="gap-3">
                {filteredNavigation.map((item: any) => {
                  const isActive = Boolean(item.href && pathname === item.href);

                  // If item has subitems
                  if (item?.subItems) {
                    const filteredSubItems = item?.subItems.filter(
                      (subItem: any) => subItem.roles.includes(userRole)
                    );

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
                        <SidebarMenuItem className="font-secondary">
                          <CollapsibleTrigger asChild>
                            <SidebarMenuButton
                              tooltip={item.title}
                              className="group/menu-button text-muted"
                            >
                              <item.icon className="size-4" />
                              <span>{item.title}</span>
                              <ChevronRight
                                className={cn(
                                  "ml-auto size-4 transition-transform duration-200 ease-in-out",
                                  isGroupOpen && "rotate-90"
                                )}
                              />
                            </SidebarMenuButton>
                          </CollapsibleTrigger>
                          <CollapsibleContent className="transition-all duration-200 ease-in-out data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
                            <SidebarMenuSub>
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
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        tooltip={item.title}
                        className="font-secondary text-muted text-base font-[300]"
                      >
                        <Link
                          href={item.href || "#"}
                          className="flex gap-4 items-center"
                        >
                          <item.icon className="size-6" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="border-t border-muted-light p-2">
          <div className="flex items-center justify-center gap-4">
            <Icon
              icon="streamline:logout-1-solid"
              width="14"
              height="14"
              className="text-muted"
            />
            <p className="text-base font-secondary text-muted">Logout</p>
          </div>
          <div className="flex items-center gap-2 justify-center">
            {LINKS?.map((link, idx) => (
              <a
                href={link?.href}
                key={idx}
                className="font-secondary text-muted font-[300] text-xs"
              >
                {link?.title}
              </a>
            ))}
          </div>
          <div>
            <p className="text-xs font-secondary text-muted font-[200] text-center">Copyright @Arctern 2025</p>
          </div>
          <div className="text-center pt-2 font-secondary leading-2 -space-y-1 flex flex-col">
            <p className="font-semibold text-sm">Contact Support:</p>
            <a href="mailto:support@arcternexpress.com" className="text-xs text-secondary">support@arcternexpress.com</a>
          </div>
        </SidebarFooter>
      </div>
      <SidebarRail />
    </Sidebar>
  );
}

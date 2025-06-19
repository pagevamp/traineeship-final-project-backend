export const moduleRoutes: Record<string, string[]> = {
  DASHBOARD_FINANCE: ["/dashboard/finance", "/dashboard/finance/*"],
  DASHBOARD_OPERATIONAL: ["/dashboard/operational", "/dashboard/operational/*"],
  DASHBOARD: ["/dashboard/sales", "/dashboard/sales/*"],
  CUSTOMER: ["/customer", "/customer/*"],
  DEPARTMENT: ["/department", "/department/*", "/users/*"],
  REPORT_ADMIN: ["/report/admin", "/report/admin/*"],
  REPORT_OPERATIONAL: ["/report/operational", "/report/operational/*"],
  REPORT_FINANCE: ["/report/finance", "/report/finance/*"],
  USER: ["/users", "/users/*"],
};

export const MODULE_LINK: Record<string, { title: string; href: string }> = {
  DASHBOARD_FINANCE: { title: "Dashboard Finance", href: "/dashboard/finance" },
  DASHBOARD_OPERATIONAL: {
    title: "Dashboard Operational",
    href: "/dashboard/operational",
  },
  DASHBOARD: { title: "Dashboard Sales", href: "/dashboard/sales" },
  USER: { title: "User", href: "/users" },
  CUSTOMER: { title: "Customer", href: "/customer" },
  DEPARTMENT: { title: "Department", href: "/department" },
  REPORT_ADMIN: { title: "Report Admin", href: "/report/admin" },
  REPORT_FINANCE: { title: "Report Finance", href: "/report/finance" },
  REPORT_OPERATIONAL: {
    title: "Report Operational",
    href: "/report/operational",
  },
};
export const MODULE_ICON: Record<string, string> = {
  USER: "mdi:users",
  CUSTOMER: "ix:customer-filled",
  DEPARTMENT: "mingcute:department-fill",
  REPORT: "mdi:file-chart",
  REPORT_FINANCE: "mdi:file-chart",
  DASHBOARD_FINANCE: "lineicons:dashboard-square-1",
  DASHBOARD: "lineicons:dashboard-square-1",
};

export const PUBLIC_PATH = [
  "/login",
  "/register",
  "/unauthorized",
  "/error",
  "/forgot-password",
];
export const enum DASHBOARD_MODULES {
  DASHBOARD = "DASHBOARD",
  DASHBOARD_FINANCE = "DASHBOARD_FINANCE",
  DASHBOARD_OPERATIONAL = "DASHBOARD_OPERATIONAL",

  USER = "USER",
  CUSTOMER = "CUSTOMER",
  DEPARTMENT = "DEPARTMENT",

  REPORT = "REPORT",
  REPORT_OPERATIONAL = "REPORT_OPERATIONAL",
  REPORT_FINANCE = "REPORT_FINANCE",
  REPORT_ADMIN = "REPORT_ADMIN",
}

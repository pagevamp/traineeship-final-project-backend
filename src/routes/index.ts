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

export const PUBLIC_PATH = [
  "/login",
  "/register",
  "/unauthorized",
  "/error",
  "/forgot-password",
];

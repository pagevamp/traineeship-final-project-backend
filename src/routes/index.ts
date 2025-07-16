export const moduleRoutes: Record<string, string[]> = {
  DASHBOARD_FINANCE: ["/dashboard/finance", "/dashboard/finance/*"],
  DASHBOARD_OPERATIONAL: ["/dashboard/operational", "/dashboard/operational/*"],
  DASHBOARD: ["/dashboard/sales", "/dashboard/sales/*"],
  CUSTOMER: ["/customer", "/customer/*"],
  DEPARTMENT: ["/departments", "/departments/*", "/users/*"],
  CUSTOMER_DASHBOARD: [
    "/dashboard/customer",
    "/dashboard/customer/*",
    "/re-apply",
  ],
  REPORT_ADMIN: ["/report/admin", "/report/admin/*"],
  REPORT_OPERATIONAL: ["/report/operational", "/report/operational/*"],
  REPORT_FINANCE: ["/report/finance", "/report/finance/*"],
  USER: ["/users", "/users/*"],
  CUSTOMER_SALES: ["/sales", "/sales/*"],
  CUSTOMER_SHIPMENTS: ["/shipment", "/shipment/*"],
  CUSTOMER_IMPORTERS: ["/importers", "/importers/add-importer", "/importers/*"],
  CUSTOMER_INVENTORY: [
    "/inventory",
    "/inventory/add-inventory",
    "/inventory/*",
  ],
  CUSTOMER_ORDERS: ["/orders", "/order/*"],
  CUSTOMER_PRODUCTS: ["/products", "/products/*"],
};

export const MODULE_LINK: Record<string, { title: string; href: string }> = {
  DASHBOARD_FINANCE: { title: "Dashboard Finance", href: "/dashboard/finance" },
  DASHBOARD_OPERATIONAL: {
    title: "Dashboard Operational",
    href: "/dashboard/operational",
  },
  DASHBOARD: { title: "Dashboard Sales", href: "/dashboard/sales" },
  CUSTOMER_DASHBOARD: {
    title: "Dashboard Customer",
    href: "/dashboard/customer",
  },
  USER: { title: "User", href: "/users" },
  CUSTOMER_SALES: { title: "Sales", href: "/sales" },
  CUSTOMER_SHIPMENTS: { title: "Customer Shipments", href: "/shipment" },
  CUSTOMER_IMPORTERS: { title: "Customer Importers", href: "/importers" },
  CUSTOMER_INVENTORY: { title: "Customer Inventory", href: "/inventory" },
  CUSTOMER_ORDERS: { title: "Customer Orders", href: "/orders" },
  CUSTOMER_PRODUCTS: { title: "Customer Products", href: "/products" },
  CUSTOMER: { title: "Customer", href: "/customer" },
  DEPARTMENT: { title: "Department", href: "/departments" },
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
  "/success",
];

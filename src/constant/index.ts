export const MODULE_ICON: Record<string, string> = {
  USER: "mdi:users",
  CUSTOMER: "ix:customer-filled",
  DEPARTMENT: "mingcute:department-fill",
  REPORT: "mdi:file-chart",
  REPORT_FINANCE: "mdi:file-chart",
  DASHBOARD_FINANCE: "lineicons:dashboard-square-1",
  DASHBOARD: "lineicons:dashboard-square-1",
  CUSTOMER_SALES: "carbon:sales-ops",
  CUSTOMER_DASHBOARD: "lineicons:dashboard-square-1",
  CUSTOMER_SHIPMENTS: "mdi:truck-check",
  CUSTOMER_IMPORTERS: "ix:customer-filled",
  CUSTOMER_INVENTORY: "ic:outline-inventory-2",
  CUSTOMER_ORDERS: "fluent-mdl2:activate-orders",
  CUSTOMER_PRODUCTS: "mdi:cart",

  IMPORTER_DASHBOARD: "lineicons:dashboard-square-1",
  IMPORTER_SHIPMENTS: "mdi:truck-check",
  IMPORTER_ORDERS: "fluent-mdl2:activate-orders",
  IMPORTER_PRODUCTS: "mdi:cart",
};

export const enum DASHBOARD_MODULES {
  DASHBOARD = "DASHBOARD",
  CUSTOMER_DASHBOARD = "CUSTOMER_DASHBOARD",
  DASHBOARD_FINANCE = "DASHBOARD_FINANCE",
  DASHBOARD_OPERATIONAL = "DASHBOARD_OPERATIONAL",

  USER = "USER",
  CUSTOMER = "CUSTOMER",
  DEPARTMENT = "DEPARTMENT",

  REPORT = "REPORT",
  REPORT_OPERATIONAL = "REPORT_OPERATIONAL",
  REPORT_FINANCE = "REPORT_FINANCE",
  REPORT_ADMIN = "REPORT_ADMIN",

  SALES = "SALES",
  CUSTOMER_SHIPMENTS = "CUSTOMER_SHIPMENTS",
  CUSTOMER_IMPORTERS = "CUSTOMER_IMPORTERS",
  CUSTOMER_INVENTORY = "CUSTOMER_INVENTORY",
  CUSTOMER_ORDERS = "CUSTOMER_ORDERS",
  CUSTOMER_PRODUCTS = "CUSTOMER_PRODUCTS",

  IMPORTER_DASHBOARD = "IMPORTER_DASHBOARD",
  IMPORTER_SHIPMENTS = "IMPORTER_SHIPMENTS",
  IMPORTER_ORDERS = "IMPORTER_ORDERS",
  IMPORTER_PRODUCTS = "IMPORTER_PRODUCTS",
}

export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export function isFileList(object: any): object is FileList {
  return typeof FileList !== "undefined" && object instanceof FileList;
}

// export function isFile(object: any): object is File {
//   return object instanceof File;
// }
export function getFileExtensionFromS3Url(url: string): string | null {
  const pathname = new URL(url).pathname; // Get the path part
  const filename = pathname.split("/").pop(); // Get the last segment
  const match = filename?.match(/\.(\w+)(?=\?|$)/); // Match `.jpg`, `.png`, etc.
  return match ? match[1] : null;
}
export const isFile = (value: any): value is File => value instanceof File;

export const allowedImageExtensions = [
  "jpg",
  "jpeg",
  "png",
  "JPG",
  "JPEG",
  "PNG",
];

export const allowedPdfExtensions = ["pdf", "PDF"];

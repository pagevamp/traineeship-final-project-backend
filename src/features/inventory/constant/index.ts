export const INVENTORY_COLUMN = [
  { key: "commodityName", label: "Product Name" },
  { key: "hsCode", label: "HS Codes" },
  {
    key: "productVariations",
    subkey: "productSizeName",
    type: "multiple",
    label: "Sizes",
  },
  {
    key: "productVariations",
    subkey: "inStock",
    type: "multiple",
    label: "In Stock",
  },
  {
    key: "productVariations",
    subkey: "reOrderPoint",
    type: "multiple",
    label: "Reorder Point",
  },
  {
    key: "productVariations",
    type: "multiple_inventory_button",
    label: "View",
    buttons: [
      {
        type: "view",
        link: (id: string) => `/inventory/variation/${id}`,
      },
    ],
  },
];
export const InventoryData = [
  {
    name: "John Doe",
    mobileNo: "9876543212",
    email: "test@gmail.com",
  },
];
export const INVENTORY_COUNTS = [
  {
    icon: "icon-park-outline:ad-product",
    counts: [
      {
        label: "All Products",
        count: 4,
      },
      {
        label: "Active",
        count: 4,
      },
    ],
  },
  {
    icon: "mdi:truck-alert-outline",
    counts: [
      {
        label: "Low Stock Alert",
        count: 4,
      },
      {
        label: "Expired",
        count: 101,
      },
    ],
  },
];

export const REORDER_POINT = [
  {
    label: "5 units",
    value: "5",
  },
  {
    label: "10 units",
    value: "10",
  },
  {
    label: "15 units",
    value: "15",
  },
  {
    label: "20 units",
    value: "20",
  },
  {
    label: "25 units",
    value: "25",
  },
  {
    label: "50 units",
    value: "50",
  },
  {
    label: "100 units",
    value: "100",
  },
];

export enum INVENTORY_STATUS {
  UNPUBLISHED = "UNPUBLISHED",
  PUBLISHED = "PUBLISHED",
}

export const images = [
  "/image.svg",
  "/image-2.svg",
  "/image-3.svg",
  "/image.svg",
  "/image-2.svg",
  "/image-3.svg",
];

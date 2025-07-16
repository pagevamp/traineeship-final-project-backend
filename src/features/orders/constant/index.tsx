import { ReactNode } from "react";

interface HeaderDetail {
  label: string | ReactNode;
  value: string | ReactNode;
}

interface CustomerColumn {
  key: string;
  label: string | ReactNode;
}
interface CustomerDetail {
  address: string | ReactNode;
  billing_address: string;
  shipping_address: string;
}

export const INVENTORY_COLUMN = [
  { key: "name", label: "User Name" },
  { key: "mobileNo", label: "Phone" },
  { key: "email", label: "Email" },
];
export const ORDER_COLUMN = [
  { key: "orderId", label: "Order ID" },
  { key: "createdAt", label: "Order Date", type: "date" },
  { key: "totalAmount", label: "Total Amount" },
  { key: "email", label: "Due Day" },
  { key: "importer.name", label: "Customer Name" },
  { key: "latestStatus.status", label: "Order Status", type: "orderStatus" },
];

export const CUSTOMER_COLUMN: CustomerColumn[] = [
  {
    key: "address",
    label: <span className="text-muted-light font-extralight">Address</span>,
  },
  {
    key: "billing_address",
    label: (
      <span className="text-muted-light font-extralight">Billing Address</span>
    ),
  },
  {
    key: "shipping_address",
    label: (
      <span className="text-muted-light font-extralight">Shipping Address</span>
    ),
  },
];

export const CustomerData: CustomerDetail[] = [
  {
    address: (
      <span className="text-muted-light font-extralight">
        Street 1 Address:
      </span>
    ),
    billing_address: "Thapa Complex",
    shipping_address: "Thapa Complex",
  },
  {
    address: (
      <span className="text-muted-light font-extralight">
        Street 2 Address:
      </span>
    ),
    billing_address: "-",
    shipping_address: "-",
  },
  {
    address: <span className="text-muted-light font-extralight">City:</span>,
    billing_address: "Kathmandu",
    shipping_address: "Kathmandu",
  },
  {
    address: <span className="text-muted-light font-extralight">State:</span>,
    billing_address: "Bagmati",
    shipping_address: "Bagmati",
  },
  {
    address: <span className="text-muted-light font-extralight">Country:</span>,
    billing_address: "Nepal",
    shipping_address: "Nepal",
  },
  {
    address: (
      <span className="text-muted-light font-extralight">Zip Code:</span>
    ),
    billing_address: "44600",
    shipping_address: "44600",
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

export const headerDetails: HeaderDetail[] = [
  {
    label: "Order Status",
    value: (
      <button className="px-3 h-[28px] rounded-[5px] text-white font-extralight bg-[#FF6502]">
        Completed
      </button>
    ),
  },
  {
    label: "Tracking Id",
    value: (
      <span className="font-secondary text-muted-light">Order Completed</span>
    ),
  },
  {
    label: "Comments",
    value: <span className="font-secondary">123432222</span>,
  },
  {
    label: "Delivery Option",
    value: <span className="font-secondary">Fast Delivery</span>,
  },
];

export const basicDetails: HeaderDetail[] = [
  {
    label: "Customer type",
    value: <span className="text-[#FF6502]">Retailer</span>,
  },
  {
    label: "Name",
    value: <span>Alam Dai Dai</span>,
  },
  {
    label: "Contact",
    value: <span>+977 (986) 083-1708</span>,
  },
  {
    label: "Email id",
    value: <span>aalam.bkag@gmail.com</span>,
  },
];

export const productDetails: HeaderDetail[] = [
  {
    label: (
      <span className="font-secondary font-light text-muted-light">
        Order Id:
      </span>
    ),
    value: <span>1002</span>,
  },
  {
    label: (
      <span className="font-secondary font-light text-muted-light">Name: </span>
    ),
    value: <span>Hoodie</span>,
  },
  {
    label: (
      <span className="font-secondary font-light text-muted-light">
        Total Qty:{" "}
      </span>
    ),
    value: <span className="text-[#FF6502]">3</span>,
  },
];

export const images = ["/image.svg", "/image-2.svg", "/image-3.svg"];

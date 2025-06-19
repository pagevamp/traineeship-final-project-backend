export const vendorInfoData = [
  {
    imgSrc: "/Group 299.svg",
    title: "Total Number of Vendors ",
    number: 100,
  },
  {
    imgSrc: "/Group 290.svg",
    title: "Current Suppliers",
    number: 60,
  },
  {
    imgSrc: "/Group 293.svg",
    title: "Current At Hold",
    number: 40,
  },
];

export const VENDOR_USER_COLUMN = [
  { key: "vendor_name", label: "Vendor Name" },
  { key: "vendor_id", label: "Vendor ID" },
  { key: "contact_person", label: "Contact Person" },
  { key: "phone", label: "Phone" },
  { key: "total_vehicle_number", label: "Total Vehicle Number" },
];

export const VendorUserData = [
  {
    vendor_name: "TransLogistics Pvt. Ltd.",
    vendor_id: "VND001",
    contact_person: "Rajesh Shrestha",
    phone: "+977-9812345678",
    total_vehicle_number: "BA 5 KHA 1234",
  },
  {
    vendor_name: "Everest Cargo Services",
    vendor_id: "VND002",
    contact_person: "Sita Gurung",
    phone: "+977-9808765432",
    total_vehicle_number: "GA 2 PA 5678",
  },
];

export const vendorHeaderDetails = [
  {
    img: "/pencil.svg",
    label: "Vendor Number ",
    value: "TransLogistics Pvt. Ltd.",
  },
  {
    img: "/system_security_update.svg",
    label: "Vendor ID ",
    value: "VND001",
  },
  {
    img: "/share_location.svg",
    label: "Contact Person ",
    value: "Rajesh Shrestha",
  },
  {
    img: "/transgender.svg",
    label: "Phone ",
    value: "+977-9812345678",
  },
  {
    img: "/document_scanner.svg",
    label: "Plate Number ",
    value: "5D5T9",
  },
  {
    img: "/pencil.svg",
    label: "Total Vehicle Numbern ",
    value: "BA 5 KHA 1234",
  },
];

export const steps = [
  { id: 1, title: "Information" },
  { id: 2, title: "Capability Details" },
  { id: 3, title: "Document Uploads" },
  { id: 4, title: "Billing Info" },
  { id: 5, title: "System Fields" },
];

type HeadingsType = {
  id: number;
  title: string | React.ReactElement;
  description: string;
};
export const headings: HeadingsType[] = [
  {
    id: 1,
    title: "Information",
    description: "Enter the vendor information.",
  },
  {
    id: 2,
    title: "Fleet & Capability Details",
    description: "Enter the vendor information.",
  },

  {
    id: 3,
    title: "Compliance & Document Uploads",
    description: "Enter the vendor information.",
  },
  {
    id: 4,
    title: "Commercial & Billing Info",
    description: "Enter the vendor information.",
  },
  {
    id: 5,
    title: "System Fields",
    description: "Enter the vendor information.",
  },
];

export const companyType = [
  { label: "Company", value: "Company" },
  { label: "Company 1", value: "Company 1" },
  { label: "Company 2", value: "Company 2" },
];

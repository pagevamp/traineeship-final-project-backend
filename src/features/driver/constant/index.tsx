export const driverInfoData = [
  {
    imgSrc: "/Group 299.svg",
    title: "Total Number of Drivers ",
    number: 40,
  },
  {
    imgSrc: "/Group 290.svg",
    title: "Current At Work",
    number: 20,
  },
  {
    imgSrc: "/Group 293.svg",
    title: "Current At Still",
    number: 20,
  },
];

export const DRIVER_USER_COLUMN = [
  { key: "driver_name", label: "Driver Name" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone" },
  { key: "nationality", label: "Nationality" },
  { key: "license_number", label: "License Number" },
  { key: "license_type", label: "License Type" },
];

export const DriverUserData = [
  {
    driver_name: "Ahmed Al-Farsi",
    email: "ahmed.alfarsi@fleetoman.com",
    phone: "+96891234567",
    nationality: "Omani",
    license_number: "OMN452789",
    license_type: "Heavy Vehicle",
  },
  {
    driver_name: "Rajiv Kumar",
    email: "rajiv.kumar@fleetoman.com",
    phone: "+96892345678",
    nationality: "Indian",
    license_number: "IND876543",
    license_type: "Medium Vehicle",
  },
];

export const driverHeaderDetails = [
  {
    img: "/pencil.svg",
    label: "Driver Name:",
    value: "Ahmed Al-Farsi",
  },
  {
    img: "/system_security_update.svg",
    label: "Email:",
    value: "ahmed.alfarsi@fleetoman.com",
  },
  {
    img: "/share_location.svg",
    label: "Phone: ",
    value: "+96891234567",
  },
  {
    img: "/transgender.svg",
    label: "Nationality:",
    value: "Omani",
  },
  {
    img: "/document_scanner.svg",
    label: "License Number:",
    value: "OMN452789",
  },
  {
    img: "/pencil.svg",
    label: "License Type:",
    value: "Heavy Vehicle",
  },
];

export const steps = [
  { id: 1, title: "Personal Information" },
  { id: 2, title: "Contact Details" },
  { id: 3, title: "Legal Documentation" },
  { id: 4, title: "Registration" },
  { id: 5, title: "Employment & HR Info" },
  { id: 6, title: "Documents Upload" },
  { id: 7, title: "System Fields" },
  { id: 8, title: "Driver Creation Fields" },
];

type HeadingsType = {
  id: number;
  title: string | React.ReactElement;
  description: string;
};
export const headings: HeadingsType[] = [
  {
    id: 1,
    title: "Personal Information",
    description: "Enter the driver information.",
  },
  {
    id: 2,
    title: "Contact Details",
    description: "Enter the driver information.",
  },

  {
    id: 3,
    title: "Legal Documentation",
    description: "Enter the driver information.",
  },
  {
    id: 4,
    title: "Operational Details",
    description: "Enter the driver information.",
  },
  {
    id: 5,
    title: "Employment & HR Inf",
    description: "Enter the driver information.",
  },
  {
    id: 6,
    title: "Documents Upload",
    description: "Enter the driver information.",
  },
  {
    id: 7,
    title: "System Fields",
    description: "Enter the driver information.",
  },
  {
    id: 8,
    title: " Driver Creation Fields",
    description: "Enter the driver information.",
  },
];

export const companyType = [
  { label: "Company", value: "Company" },
  { label: "Company 1", value: "Company 1" },
  { label: "Company 2", value: "Company 2" },
];

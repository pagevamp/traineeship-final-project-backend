export const vehicleInfoData = [
  {
    imgSrc: "/Group 299.svg",
    title: "Total Number of Vehicles ",
    number: 140,
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

export const VEHICLE_USER_COLUMN = [
  { key: "vehicle_name", label: "Vehicle Number" },
  { key: "vehicle_type", label: "Vehicle Type" },
  { key: "model", label: "Model" },
  { key: "year_of_manufacture", label: "Year of Manufacture" },
  { key: "plate_number", label: "Plate Number" },
  { key: "country_of_registration", label: "Country of Registration" },
];

export const VehicleUserData = [
  {
    vehicle_name: "13.5M Reefer #1",
    vehicle_type: "3 Ton",
    model: "test@MAN TGS 26.440",
    year_of_manufacture: "2019",
    plate_number: "5D5T9",
    country_of_registration: "Oman",
  },
  {
    vehicle_name: "13.5M Reefer #2",
    vehicle_type: "3 Ton",
    model: "MAN TGS 26.440",
    year_of_manufacture: "2021",
    plate_number: "3TH67",
    country_of_registration: "UAE",
  },
];

export const vehicleHeaderDetails = [
  {
    img: "/pencil.svg",
    label: "Vehicle Number:",
    value: "13.5M Reefer #1.",
  },
  {
    img: "/system_security_update.svg",
    label: "Vehicle Type:",
    value: " 3 Ton",
  },
  {
    img: "/share_location.svg",
    label: "Model: ",
    value: "test@MAN TGS 26.440",
  },
  {
    img: "/transgender.svg",
    label: "Year of Manufacture:",
    value: "2019",
  },
  {
    img: "/document_scanner.svg",
    label: "Plate Number:",
    value: "5D5T9",
  },
  {
    img: "/pencil.svg",
    label: "Country of Registration:",
    value: "Oman",
  },
];

export const steps = [
  { id: 1, title: "Information" },
  { id: 2, title: "Ownership Details" },
  { id: 3, title: "Classification & Capabilities" },
  { id: 4, title: "Registration" },
  { id: 5, title: "System Fields" },
  { id: 6, title: "System Fields" },
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
    description: "Enter the vehicle information.",
  },
  {
    id: 2,
    title: "Ownership Details",
    description: "Enter the vehicle information.",
  },

  {
    id: 3,
    title: "Classification & Capabilities",
    description: "Enter the vehicle information.",
  },
  {
    id: 4,
    title: "Registration and Compliance",
    description: "Enter the vehicle information.",
  },
  {
    id: 5,
    title: " Maintenance & Tracking",
    description: "Enter the vehicle information.",
  },
  {
    id: 6,
    title: "System Information",
    description: "Enter the vehicle information.",
  },
];

export const companyType = [
  { label: "Company", value: "Company" },
  { label: "Company 1", value: "Company 1" },
  { label: "Company 2", value: "Company 2" },
];

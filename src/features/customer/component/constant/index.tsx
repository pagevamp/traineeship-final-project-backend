import BankDetails from "../BankDetails";
import Director from "../Director";
import Documents from "../Document";
import FinanceManager from "../FinanceManger";
import Referral from "../referral";

export const bankDetails = [
  { label: "Reference from Bank", value: "Shaan Roy" },
  { label: "Account Holder Name", value: "Rahul Sah" },
  { label: "Bank Name", value: "HDFC Bank" },
  { label: "Branch & Location", value: "HSR Layout, Bangalore" },
  { label: "Account Number", value: "000987655543211" },
  {
    label: "IBAN",
    fullForm: "International Bank Account Number",
    value: "09876544321234",
  },
  { label: "Swift/BIC Code", value: "Swift00675" },
  { label: "Currency", value: "Indian Rupees" },
  { label: "Bank Country", value: "India" },
  { label: "Beneficiary Address", value: "HSR Layout, Bangalore" },
  { label: "Bank Address", value: "HSR Layout, Bangalore" },
  { label: "VAT/TRN Number", value: "09876544321234" },
];

export const tabs = ["Pending", "Rejected", "Approved"] as const;

export const customerStatus = [
  {
    name: "John Doe",
    phone: "9876543212",
    email: "test@gmail.com",
    status: "Pending",
  },
  {
    name: "John Doe",
    phone: "9876543212",
    email: "test@gmail.com",
    status: "Approved",
  },
];

type StatusType = "Approved" | "Pending" | "Rejected";

export const statusColors: Record<StatusType, string> = {
  Approved: "text-[#007a6d] bg-[#b2f0e7]",
  Pending: "text-[#9a1a14] bg-[#f8d5d2]",
  Rejected: "text-[#3e1a99] bg-[#d7c7f7]",
};

export const actions = [
  {
    label: "Upload Contract",
    image: "/uploadgrey.svg",
    color: "#D0D0D0",
  },
  {
    label: "Sign Contract",
    image: "/penorange.svg",
    color: "#FF6502",
  },
  {
    label: "Download Contract",
    image: "/greendown.svg",
    color: "#00B69B",
  },
];

export const directorDetails = [
  {
    id: 1,
    name: "Rohan Kulkarni",
    email: "rahul@gmail.com",
    phone: "9824356541",
  },
  {
    id: 2,
    name: "Manoj Ashish",
    email: "San@gmail.com",
    phone: "8197765113",
  },
];
export const NID = [
  {
    id: 1,
    idCard: "/Card.svg",
    alt: "id card",
  },
  {
    id: 2,
    idCard: "/Card.svg",
    alt: "id card",
  },
];

export const utility = [
  {
    id: 1,
    idCard: "/Utility.svg",
    alt: "utility card",
  },
  {
    id: 2,
    idCard: "/Utility.svg",
    alt: "utility card",
  },
];

export const financeDetails = [
  {
    id: 1,
    name: "Rohan Kulkarni",
    email: "rahul@gmail.com",
    phone: "9824356541",
  },
  {
    id: 2,
    name: "Manoj Ashish",
    email: "San@gmail.com",
    phone: "8197765113",
  },
];

export const headerDetails = [
  {
    img: "/pencil.svg",
    label: "Company Name:",
    value: "Everestwalk Groups Pvt. Ltd.",
  },
  {
    img: "/system_security_update.svg",
    label: "Employee Size:",
    value: " 50+",
  },
  {
    img: "/share_location.svg",
    label: "Company Type: ",
    value: "Private Limited",
  },
  {
    img: "/transgender.svg",
    label: "Nature of Business:",
    value: " Software Development",
  },
  { img: "/share_location.svg", label: "Estd. Year:", value: " 2020" },

  {
    img: "/document_scanner.svg",
    label: "Shipment Type:",
    value: " LTL, FTL, Both",
  },
  {
    img: "/pencil.svg",
    label: "Email ID:",
    value: "info@everetswalk.com",
  },
  {
    img: "/system_security_update.svg",
    label: "Phone Number:  ",
    value: "+91 9296654332",
  },
];

export const infoData = [
  {
    imgSrc: "/Group 299.svg",
    title: "Total Customer ",
    number: 5750,
  },
  {
    imgSrc: "/Group 292.svg",
    title: "Pending",
    number: 130,
  },
  {
    imgSrc: "/Group 293.svg",
    title: "Rejected",
    number: 750,
  },
  {
    imgSrc: "/Group 296.svg",
    title: "Approved",
    number: 5000,
  },
];

export const financialDetails = [
  {
    id: 1,
    name: "Rohan Kulkarni",
    associate: "rahul@gmail.com",
    email: "rahul@gmail.com",
    phone: "9824356541",
  },
  {
    id: 2,
    name: "Manoj Ashish",
    associate: "rahul@gmail.com",
    email: "San@gmail.com",
    phone: "8197765113",
  },
];

export const LtlRateData = [
  {
    destination: "QATAR",
    truckType: "40FT Closed Box",
    charges: 3400,
  },
  {
    destination: "BAHRAIN",
    truckType: "40FT Closed Box",
    charges: 3500,
  },
  {
    destination: "KUWAIT",
    truckType: "40FT Closed Box",
    charges: 4200,
  },
  {
    destination: "DMM",
    truckType: "40FT Closed Box",
    charges: 3200,
  },
  {
    destination: "RUH",
    truckType: "40FT Closed Box",
    charges: 3300,
  },
  {
    destination: "JED",
    truckType: "40FT Closed Box",
    charges: 4900,
  },
  {
    destination: "Muscat, Oman",
    truckType: "40FT Closed Box",
    charges: 2750,
  },
];

export const FtlRateData = [
  {
    destination: "Amman, Jordan",
    truckType: "40FT Closed Box",
    charges: 4100,
  },
  {
    destination: "Beirut, Lebanon",
    truckType: "20FT Refrigerated",
    charges: 3900,
  },
  {
    destination: "Cairo, Egypt",
    truckType: "40FT Flatbed",
    charges: 4500,
  },
  {
    destination: "Baghdad, Iraq",
    truckType: "40FT Curtain Side",
    charges: 4700,
  },
  {
    destination: "Doha, Qatar",
    truckType: "20FT Closed Box",
    charges: 3250,
  },
  {
    destination: "Manama, Bahrain",
    truckType: "40FT Flatbed",
    charges: 3400,
  },
  {
    destination: "Salalah, Oman",
    truckType: "20FT Curtain Side",
    charges: 3100,
  },
];

export const USER_COLUMN = [
  { key: "name", label: "Company Name" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone" },
  { key: "status", label: "Status", type: "status" },
];

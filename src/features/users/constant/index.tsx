import { useState } from "react";

type UserStatusItem = {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: StatusType;
};

export const user: UserStatusItem[] = [
  {
    id: 1,
    name: "Rohan Kulkarni",
    email: "rahul@gmail.com",
    phone: "9824356541",
    status: "Approved",
  },
  {
    id: 2,
    name: "Sandesh Mehra",
    email: "San@gmail.com",
    phone: "8197765113",
    status: "Pending",
  },
];

type StatusType = "Approved" | "Pending" | "Rejected" | "Department";

export const statusColors: Record<StatusType, string> = {
  Approved: "text-[#007a6d] bg-[#b2f0e7]",
  Pending: "text-[#9a1a14] bg-[#f8d5d2]",
  Rejected: "text-[#3e1a99] bg-[#d7c7f7]",
  Department: "text-[#664600] bg-[#fff0cc]",
};

export const tabs = ["Pending", "Rejected", "Approved"] as const;

export const USER_COLUMN = [
  { key: "id", label: "Employee Id" },
  { key: "name", label: "Employee Name" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone" },
  // { key: "status", label: "Status", type: "status" },
];

export const UserData = [
  {
    name: "John Doe",
    phone: "9876543212",
    email: "test@gmail.com",
  },
  {
    name: "John Doe",
    phone: "9876543212",
    email: "test@gmail.com",
  },
];

export const infoData = [
  {
    imgSrc: "/Group 299.svg",
    title: "Total Employees ",
    number: 150,
  },
  {
    imgSrc: "/Group 290.svg",
    title: "Total Departments",
    number: 130,
  },
  {
    imgSrc: "/Group 293.svg",
    title: "Rejected",
    number: 750,
  },
];

export const accessItems = [
  { title: "Customer Creation " },
  { title: "Customer Approval" },
  { title: "Shipment Creation" },
  { title: "Shipment Approval" },
  { title: "Customer Services" },
  { title: "Customer Services" },
];
export const headerDetails = [
  {
    img: "/pencil.svg",
    label: "Full Name:",
    value: "Everestwalk Groups Pvt. Ltd.",
  },
  {
    img: "/system_security_update.svg",
    label: "Employee Id:",
    value: "1234",
  },
  {
    img: "/share_location.svg",
    label: "Email: ",
    value: "test@gmail.com",
  },
  {
    img: "/transgender.svg",
    label: "Phone Number:",
    value: " Software Development",
  },
  { img: "/share_location.svg", label: "Estd. Year:", value: " 2020" },

  {
    img: "/document_scanner.svg",
    label: "Department:",
    value: " LTL, FTL, Both",
  },
  {
    img: "/pencil.svg",
    label: "Designation:",
    value: "info@everetswalk.com",
  },
];

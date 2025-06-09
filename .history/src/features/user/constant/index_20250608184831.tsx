import { useState } from "react";

type StatusType = "Approved" | "Pending" | "Rejected" | "Department";

type UserStatusItem = {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: StatusType;
  Action: string;
};

export const user: UserStatusItem[] = [
  {
    id: 1,
    name: "Rohan Kulkarni",
    email: "rahul@gmail.com",
    phone: "9824356541",
    status: "Approved",
    Action: "",
  },
  {
    id: 2,
    name: "Sandesh Mehra",
    email: "San@gmail.com",
    phone: "8197765113",
    status: "Pending",
    Action: "",
  },
];

export const statusColors: Record<StatusType, string> = {
  Approved: "text-[#007a6d] bg-[#b2f0e7]",
  Pending: "text-[#9a1a14] bg-[#f8d5d2]",
  Rejected: "text-[#3e1a99] bg-[#d7c7f7]",
  Department: "text-[#664600] bg-[#fff0cc]",
};

export const tabs = ["Pending", "Rejected", "Approved"] as const;

export const USER_COLUMN = [
  { key: "name", label: "User Name" },
  { key: "phone", label: "Phone" },
  { key: "email", label: "Email" },
  { key: "status", label: "Status" },
];

export const UserData = [
  {
    name: "John Doe",
    mobileNo: "9876543212",
    email: "test@gmail.com",
  },
  {
    name: "John Doe",
    mobileNo: "9876543212",
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

export const info = [
  {
    id: 1,
    department: "It Department",
    name: "Rohan Kulkarni",
    email: "rahul@gmail.com",
    phone: "9824356541",
  },
  {
    id: 2,
    department: "Marketing",
    name: "Sandesh Mehra",
    email: "San@gmail.com",
    phone: "8197765113",
  },
];

export const details = [
  { label: "Department Name ", value: "IT Department " },
  { label: "Contact Person Name", value: "Rahul Sah" },
  { label: "Email Id ", value: "rahul@gmail.com" },
  { label: "Phone Number ", value: "+91 - 7196674113" },
];

type FieldType = {
  name: string;
  label: string;
  type: string;
  placeholder: string;
};

export const fields: FieldType[] = [
  {
    name: "departmentName",
    label: "Department Name",
    type: "text",
    placeholder: "Enter department name",
  },
  {
    name: "contactPerson",
    label: "Contact Person",
    type: "text",
    placeholder: "Enter contact person",
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "Enter email address",
  },
  {
    name: "phoneNumber",
    label: "Phone Number",
    type: "tel",
    placeholder: "Enter phone number",
  },
];

type StatusType = "Approved" | "Pending" | "Rejected" | "Department";

export const statusColors: Record<StatusType, string> = {
  Approved: "text-[#007a6d] bg-[#b2f0e7]",
  Pending: "text-[#9a1a14] bg-[#f8d5d2]",
  Rejected: "text-[#3e1a99] bg-[#d7c7f7]",
  Department: "text-[#664600] bg-[#fff0cc]",
};

type DepartmentStatusItem = {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: StatusType;
  designation?: string;
};

export const department: DepartmentStatusItem[] = [
  {
    id: 1,
    name: "Rohan Kulkarni",
    email: "rahul@gmail.com",
    phone: "9824356541",
    status: "Approved",
    designation: "HR Manager",
  },
  {
    id: 2,
    name: "Sandesh Mehra",
    email: "San@gmail.com",
    phone: "8197765113",
    status: "Pending",
    designation: "Tech Lead",
  },
];

export const USER_COLUMN = [
  { key: "id", label: "Employee Id" },
  { key: "name", label: "Employee Name" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone" },
  // { key: "status", label: "Status", type: "status" },
];

export const DEPARTMENT_COLUMN = [
  { key: "department", label: "Department Name" },
  { key: "name", label: "Contact Person" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone" },
];

export const DESIGNATION_COLUMN = [
  { key: "designation", label: "Designation" },
];

export const designationInfo = [
  {
    id: 1,
    designation: "HOD ",
  },
  {
    id: 2,
    designation: "Manager ",
  },
  {
    id: 3,
    designation: "General Manager ",
  },
  {
    id: 4,
    designation: "Director ",
  },
];

export type DepartmentTab = "Users" | "Designation";

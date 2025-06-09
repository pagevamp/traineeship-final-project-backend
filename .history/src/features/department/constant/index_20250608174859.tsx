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
  { label: "Department Name: ", value: "IT Department " },
  { label: "Contact Person Name:", value: "Rahul Sah" },
  { label: "Email Id: ", value: "rahul@gmail.com" },
  { label: "Phone Number: ", value: "+91 - 7196674113" },
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

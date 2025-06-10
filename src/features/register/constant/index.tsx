import { ReactNode } from "react";

export const steps = [
  { id: 1, title: "Company Details" },
  { id: 2, title: "Nature of Business" },
  { id: 3, title: "Directors" },
  { id: 4, title: "Referrals" },
  { id: 5, title: "Bank Details" },
  { id: 6, title: "Documents" },
  { id: 7, title: "Products" },
];

type HeadingsType = {
  id: number;
  title: string | React.ReactElement;
  description: string;
};
export const headings: HeadingsType[] = [
  {
    id: 1,
    title: "Enter your Organization Details",
    description: "Enter accurate details to verify your company.",
  },
  {
    id: 2,
    title: "Enter your Directors Details",
    description: "Enter accurate details to verify your company.",
  },

  {
    id: 3,
    title: "Enter your Directors Details",
    description: "Enter accurate details to verify your company.",
  },
  {
    id: 4,
    title: "Enter your Trade References Details",
    description: "Enter accurate details to verify your company.",
  },
  {
    id: 5,
    title: "Enter your Bank Details",
    description: "Enter accurate details to verify your company.",
  },
  {
    id: 6,
    title: "Upload your Documents",
    description: "Upload Valid Documents to verify your company ",
  },
  {
    id: 7,
    title: (
      <span>
        Enter your Products -{" "}
        <span className="text-[#FF811A] text-[22px]"> (Optional)</span>
      </span>
    ),
    description: "Add product details now or skip for later.",
  },
];

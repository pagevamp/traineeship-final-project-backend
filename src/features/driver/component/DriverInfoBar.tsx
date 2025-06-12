"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import BankDetails from "@/features/customer/component/BankDetails";
import Director from "@/features/customer/component/Director";
import Documents from "@/features/customer/component/Document";
import FinanceManager from "@/features/customer/component/FinanceManger";
import Referral from "@/features/customer/component/referral";
import { cn } from "@/lib/utils";

import { motion } from "framer-motion";
import DriverOperational from "./DriverOperational";
import DriverContact from "./DriverContact";
import DriverLicense from "./DriverLisence";
import DriverSystem from "./DriverSystem";
import DriverDocuments from "./DriverDocuments";
import DriverEmployment from "./DriverEmployement";

const accordionData = [
  {
    title: "Driver Contact",
    content: <DriverContact />,
  },
  {
    title: "Driver License",
    content: <DriverLicense />,
  },
  {
    title: "Driver Operational",
    content: <DriverOperational />,
  },
  {
    title: "Driver Employment",
    content: <DriverEmployment />,
  },
  {
    title: "Driver Documents",
    content: <DriverDocuments />,
  },
  {
    title: "Driver System",
    content: <DriverSystem />,
  },
];

const DriverInfoBar = () => {
  return (
    <div
      className="
        flex flex-col justify-center items-center
        w-full
        max-w-full
        sm:max-w-[750px]
        lg:max-w-none
        mx-0
      "
    >
      {accordionData.map((item, index) => (
        <motion.div
          key={index}
          className="w-full"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: index * 0.3, ease: "easeOut" }}
        >
          <Accordion
            type="single"
            collapsible
            className={cn(
              "bg-white rounded-[20px] w-full",
              index !== 0 ? "mt-4" : ""
            )}
          >
            <AccordionItem value={`item-${index}`} className="w-full">
              <AccordionTrigger className="w-full font-primary text-[14px] sm:text-[16px] text-[#232323] p-4">
                {item.title}
              </AccordionTrigger>
              <AccordionContent className="w-full text-[#232323] px-4 pt-2 pb-4 text-[12px] sm:text-[14px]">
                {item.content}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </motion.div>
      ))}
    </div>
  );
};

export default DriverInfoBar;

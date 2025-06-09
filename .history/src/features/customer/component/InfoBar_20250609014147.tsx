import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import Director from "./Director";
import BankDetails from "./BankDetails";
import Documents from "./Document";
import FinanceManager from "./FinanceManger";
import Referral from "./referral";

const accordionData = [
  {
    title: "Directors Details",
    content: <Director />,
  },
  {
    title: "Finance Manager Information",
    content: <FinanceManager />,
  },
  {
    title: "Referral Details",
    content: <Referral />,
  },
  {
    title: "Bank Details",
    content: <BankDetails />,
  },
  {
    title: "Documents",
    content: <Documents />,
  },
  {
    title: "Product List",
    content:
      "This section contains a detailed list of the products or services offered by the company, including product names, categories, and brief descriptions for each item.",
  },
];

const InfoBar = () => {
  return (
    <div className="flex flex-col items-center px-4 sm:px-0">
      {accordionData.map((item, index) => (
        <Accordion
          key={index}
          type="single"
          collapsible
          className={cn(
            "bg-white rounded-[20px] lg:w-[100%] sm:max-w-[600px] md:max-w-[800px] ",
            index !== 0 ? "mt-4" : ""
          )}
        >
          <AccordionItem value={`item-${index}`}>
            <AccordionTrigger className="font-primary text-[18px] sm:text-[20px] text-[#232323] px-4 py-4">
              {item.title}
            </AccordionTrigger>
            <AccordionContent className="text-[#232323] px-4 pt-2 pb-4 text-[14px] sm:text-[15px]">
              {item.content}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </div>
  );
};

export default InfoBar;

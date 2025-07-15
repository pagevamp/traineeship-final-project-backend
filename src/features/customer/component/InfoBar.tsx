"use client";
import { useMemo } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert } from "@/components/ui/alert";
import { cn } from "@/lib/utils";
import Director from "./Director";
import BankDetails from "./BankDetails";
import Documents from "./Document";
import FinanceManager from "./FinanceManger";
import Referral from "./referral";
import { motion } from "framer-motion";
import { UserPayload } from "@/features/register/types";
import ProductsList from "./ProductsList";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertTriangle, CheckCircle, StickyNote } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { CUSTOMER_STATUS } from "@/utils/handlers/roles";

const InfoBar = ({ profileDetail }: { profileDetail?: UserPayload }) => {
  const userId = useMemo(() => profileDetail?.user?.id, [profileDetail]);
  const directorDetails = useMemo(
    () => profileDetail?.directorDetails,
    [profileDetail?.directorDetails]
  );
  const financeManagerDetails = useMemo(
    () => profileDetail?.financialDirectorDetails,
    [profileDetail?.financialDirectorDetails]
  );
  const tradeReferenceDetails = useMemo(
    () => profileDetail?.tradeReferenceDetails,
    [profileDetail?.tradeReferenceDetails]
  );
  const bankDetails = useMemo(
    () => profileDetail?.bankDetails?.[0],
    [profileDetail?.bankDetails]
  );
  const documentsDetail = useMemo(
    () => profileDetail?.documents?.[0],
    [profileDetail?.documents]
  );

  const rejectionReasons = profileDetail?.transfers
    .filter(
      (item: any) =>
        item.status === CUSTOMER_STATUS.REJECTED && item.rejectedNotes
    )
    .map((item: any) => ({
      id: item.id,
      description: item.rejectedNotes,
    }));

  const approvalNotes = profileDetail?.transfers
    .filter(
      (item: any) =>
        item.status === CUSTOMER_STATUS.APPROVED && item.approvalNotes
    )
    .map((item: any) => ({
      id: item.id,
      description: item.approvalNotes,
    }));

  const internalNotes = profileDetail?.transfers
    .filter(
      (item: any) =>
        item.status === CUSTOMER_STATUS.APPROVED && item.internalNotes
    )
    .map((item: any) => ({
      id: item.id,
      description: item.internalNotes,
    }));

  const accordionData = [
    {
      title: "Directors Details",
      content: <Director directorDetails={directorDetails} />,
    },
    {
      title: "Finance Manager Information",
      content: <FinanceManager financeManagerDetails={financeManagerDetails} />,
    },
    {
      title: "Referral Details",
      content: <Referral tradeReferenceDetails={tradeReferenceDetails} />,
    },
    {
      title: "Bank Details",
      content: <BankDetails bankDetails={bankDetails} />,
    },
    {
      title: "Documents",
      content: <Documents documentsDetail={documentsDetail} />,
    },
    {
      title: "Product List",
      content: <ProductsList userId={userId} />,
    },
  ];
  return (
    <>
      <div
        className="
        flex flex-col justify-center items-center
        w-full
        max-w-full
        lg:max-w-none
        mx-0
      "
      >
        {accordionData.map((item, index) => (
          <motion.div
            key={index}
            className="w-full"
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 60, damping: 12 }}
            // transition={{ duration: 0.6, delay: index * 0.3, ease: "easeOut" }}
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

      <div className="mt-4">
        {/* Approval Notes - Show only if user is approved */}
        {approvalNotes?.length > 0 && (
          <Card className="hover:shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                Approval Notes
              </CardTitle>
              <CardDescription>
                Review notes from the approval process.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {approvalNotes?.map((note: any, index: number) => (
                <div key={note.id}>
                  <Alert className="border-l-4 border-l-green-500">
                    <div className="flex items-start gap-3">
                      <div className="max-h-[600px] overflow-auto scroll-bar">
                        <div
                          className="text-sm text-muted-foreground text-editor [&_ul]:pl-10 [&_ol]:pl-10 font-secondary font-[300] break-all"
                          dangerouslySetInnerHTML={{
                            __html: note?.description,
                          }}
                        />
                      </div>
                    </div>
                  </Alert>
                  {index < approvalNotes.length - 1 && (
                    <Separator className="my-4" />
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>

      <div className="mt-4">
        {/* Internal Notes - Show only if there are internal notes */}
        {internalNotes?.length > 0 && (
          <Card className="hover:shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <StickyNote className="h-5 w-5 text-blue-600" />
                Internal Notes
              </CardTitle>
              <CardDescription>
                Internal administrative notes and observations.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {internalNotes?.map((note: any, index: number) => (
                <div key={note.id}>
                  <Alert className="border-l-4 border-l-blue-500">
                    <div className="flex items-start gap-3">
                      <div className="max-h-[600px] overflow-auto scroll-bar">
                        <div
                          className="text-sm text-muted-foreground text-editor [&_ul]:pl-10 [&_ol]:pl-10 font-secondary font-[300] break-all"
                          dangerouslySetInnerHTML={{
                            __html: note?.description,
                          }}
                        />
                      </div>
                    </div>
                  </Alert>
                  {index < internalNotes?.length - 1 && (
                    <Separator className="my-4" />
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>
      <div className="mt-4">
        {rejectionReasons?.length > 0 && (
          <Card className="hover:shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-primary tracking-wide">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                Rejection Reasons
              </CardTitle>
              <CardDescription className="font-secondary font-[300] text-sm">
                Your detail was rejected for the following reasons. Please
                address these issues before reapplying.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {rejectionReasons?.map((rejection: any, index: number) => (
                <div key={rejection.id}>
                  <Alert className="border-l-4 border-l-destructive">
                    <div className="flex gap-3 ">
                      <div className="max-h-[600px] overflow-auto scroll-bar">
                        <div
                          className="text-sm text-muted-foreground text-editor [&_ul]:pl-10 [&_ol]:pl-10 font-secondary font-[300] break-all"
                          dangerouslySetInnerHTML={{
                            __html: rejection?.description,
                          }}
                        />
                      </div>
                    </div>
                  </Alert>
                  {index < rejectionReasons.length - 1 && (
                    <Separator className="my-4" />
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
};

export default InfoBar;

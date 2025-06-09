"use client";

import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/Heading";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Stepper } from "@/components/ui/stepper";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState, useCallback } from "react";
import { steps, headings } from "../constant";
import { useRouter } from "next/navigation";

const RegisterComponent = () => {
  const router = useRouter();
  const [currStep, setCurrStep] = useState<number>(1);
  const totalSteps = steps.length;

  const stepperContainerRef = useRef<HTMLDivElement>(null);

  const stepsInnerRef = useRef<HTMLDivElement>(null);

  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  useEffect(() => {
    const container = stepperContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      setShowLeftArrow(container.scrollLeft > 0);
      setShowRightArrow(
        container.scrollLeft + container.clientWidth < container.scrollWidth
      );
    };

    handleScroll();
    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const container = stepperContainerRef.current;
    const inner = stepsInnerRef.current;

    if (!container || !inner) return;

    const stepElements = inner.children;
    const currentStepElement = stepElements[currStep - 1] as HTMLElement;

    if (currentStepElement) {
      const containerRect = container.getBoundingClientRect();
      const stepRect = currentStepElement.getBoundingClientRect();

      const offset =
        stepRect.left -
        containerRect.left -
        container.clientWidth / 2 +
        stepRect.width / 2;

      container.scrollBy({ left: offset, behavior: "smooth" });
    }
  }, [currStep]);

  const nextStep = useCallback(() => {
    if (currStep < totalSteps) {
      setCurrStep((prev) => prev + 1);
    } else {
      router.push("/success");
    }
  }, [currStep, totalSteps, router]);

  const prevStep = useCallback(() => {
    setCurrStep((prev) => (prev > 1 ? prev - 1 : prev));
  }, []);

  const renderStep = () => {
    const StepComponents = [
      <RegisterStep1 key="step-1" />,
      <RegisterStep2 key="step-2" />,
      <RegisterStep3 key="step-3" />,
      <RegisterStep4 key="step-4" />,
      <RegisterStep5 key="step-5" />,
      <RegisterStep6 key="step-6" />,
    ];

    return StepComponents[currStep - 1] || <RegisterStep1 />;
  };

  const currHeading = headings.find((h) => h.id === currStep);

  return (
    <section className="font-secondary max-w-[960px] mx-auto h-full flex flex-col items-center pt-[34px] relative">
      <Image
        src="/arctern-logo.svg"
        width={142}
        height={81}
        alt="Company Logo"
        className="mb-[22px]"
      />

      <div className="w-full flex justify-between items-center px-10 mb-2">
        {showLeftArrow ? (
          <ScrollArrow
            direction="left"
            onClick={() =>
              stepperContainerRef.current?.scrollBy({
                left: -200,
                behavior: "smooth",
              })
            }
          />
        ) : (
          <div style={{ width: 34 }} />
        )}

        {showRightArrow ? (
          <ScrollArrow
            direction="right"
            onClick={() =>
              stepperContainerRef.current?.scrollBy({
                left: 200,
                behavior: "smooth",
              })
            }
          />
        ) : (
          <div style={{ width: 34 }} />
        )}
      </div>

      <div
        ref={stepperContainerRef}
        className="overflow-x-auto scrollbar-hide w-full px-5 mb-6"
        style={{ scrollBehavior: "smooth" }}
      >
        <div className="flex gap-4 min-w-max" ref={stepsInnerRef}>
          <Stepper steps={steps} currentStep={currStep} />
        </div>
      </div>

      <Heading
        title={currHeading?.title}
        description={currHeading?.description}
      />
      {renderStep()}

      <ChangeStep
        nextStep={nextStep}
        prevStep={prevStep}
        currStep={currStep}
        totalSteps={totalSteps}
      />
    </section>
  );
};

export default RegisterComponent;

const ScrollArrow = ({
  direction,
  onClick,
}: {
  direction: "left" | "right";
  onClick: () => void;
}) => {
  const Icon = direction === "left" ? ChevronLeft : ChevronRight;
  return (
    <button
      onClick={onClick}
      aria-label={`Scroll ${direction}`}
      className="bg-gradient-to-b from-[#CF5406] to-[#F87B18] text-white p-1.5 rounded-full shadow"
    >
      <Icon size={10} />
    </button>
  );
};

const ChangeStep = ({
  nextStep,
  prevStep,
  currStep,
  totalSteps,
}: {
  nextStep: () => void;
  prevStep: () => void;
  currStep: number;
  totalSteps: number;
}) => {
  return (
    <div className="font-primary flex flex-col items-center gap-[31px] mb-[47px] mt-[70px]">
      <Button
        onClick={nextStep}
        className="rounded-[8px] w-[210px] h-[48px] py-[10px] px-5 bg-gradient-to-b from-[#CF5406] to-[#F87B18]"
      >
        {currStep === totalSteps ? "Finish" : "Continue"}
      </Button>

      {currStep > 1 && (
        <Button
          onClick={prevStep}
          className="font-primary text-lg bg-transparent text-[#CF5406] shadow-none hover:bg-transparent flex items-center justify-center"
        >
          <ChevronLeft className="mr-2" size={18} />
          Back
        </Button>
      )}
    </div>
  );
};

const RegisterStep1 = () => {
  return (
    <div className="text-[16px] w-full max-w-[600px] px-4 sm:px-6 md:px-8 lg:px-0 mx-auto flex flex-col gap-[21px]">
      <div className="flex flex-col gap-2">
        <Label
          htmlFor="company-name"
          className="text-[16px] font-primary text-[#26203B]"
        >
          Company Name
        </Label>
        <Input
          className="w-full py-2 px-4 placeholder:text-sm placeholder:text-[#9C9AA5] h-12"
          id="company-name"
          name="company-name"
          placeholder="Enter your company name"
          type="text"
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label
          htmlFor="company-mail"
          className="text-[16px] font-primary text-[#26203B]"
        >
          Company Mail
        </Label>
        <Input
          className="w-full py-2 px-4 placeholder:text-sm placeholder:text-[#9C9AA5] h-12"
          id="company-mail"
          name="company-mail"
          placeholder="Enter your company mail"
          type="email"
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label
          htmlFor="company-type"
          className="text-[16px] font-primary text-[#26203B]"
        >
          Company Type
        </Label>
        <Select>
          <SelectTrigger
            id="company-type"
            className="w-full py-2 px-4 placeholder:text-sm placeholder:text-[#9C9AA5] h-12"
          >
            <SelectValue placeholder="Select your company type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Company Type</SelectLabel>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="blueberry">Blueberry</SelectItem>
              <SelectItem value="grapes">Grapes</SelectItem>
              <SelectItem value="pineapple">Pineapple</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <Label
          htmlFor="years-incorporated"
          className="text-[16px] font-primary text-[#26203B]"
        >
          Years Since Incorporated
        </Label>
        <Input
          className="w-full py-2 px-4 placeholder:text-sm placeholder:text-[#9C9AA5] h-12"
          id="years-incorporated"
          name="years-incorporated"
          placeholder="Enter date"
          type="text"
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label
          htmlFor="employee-size"
          className="text-[16px] font-primary text-[#26203B]"
        >
          Employer Size
        </Label>
        <Input
          className="w-full py-2 px-4 placeholder:text-sm placeholder:text-[#9C9AA5] h-12"
          id="employee-size"
          name="employee-size"
          placeholder="Enter your company size"
          type="number"
        />
      </div>
    </div>
  );
};

const RegisterStep2 = () => {
  return (
    <div className="text-[16px] w-full px-3 mt-[10px]">
      <div className="flex justify-end mb-[26px]">
        <Button variant="outline" className="flex items-center gap-2 h-[40px]">
          Add
          <Image src="/plus.svg" alt="plus" width={24} height={24} />
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-[18px] gap-x-[10px] mb-8">
        <div className="flex flex-col gap-2">
          <Label
            htmlFor="company-type"
            className="text-[16px] font-primary text-[#26203B]"
          >
            Company Type
          </Label>
          <Input
            className="py-2 px-4 h-12 placeholder:text-sm placeholder:text-[#9C9AA5]"
            id="company-type"
            name="company-type"
            placeholder="Enter Company Type"
            type="text"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label
            htmlFor="director-email"
            className="text-[16px] font-primary text-[#26203B]"
          >
            Email Id
          </Label>
          <Input
            className="py-2 px-4 h-12 placeholder:text-sm placeholder:text-[#9C9AA5]"
            id="director-email"
            name="director-email"
            placeholder="Enter Email Id"
            type="email"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label
            htmlFor="director-phone-no"
            className="text-[16px] font-primary text-[#26203B]"
          >
            Phone Number
          </Label>
          <Input
            className="py-2 px-4 h-12 placeholder:text-sm placeholder:text-[#9C9AA5]"
            id="director-phone-no"
            name="director-phone-no"
            placeholder="Enter Phone Number"
            type="text"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label
            htmlFor="company-type-2"
            className="text-[16px] font-primary text-[#26203B]"
          >
            Company Type
          </Label>
          <Input
            className="py-2 px-4 h-12 placeholder:text-sm placeholder:text-[#9C9AA5]"
            id="company-type-2"
            name="company-type-2"
            placeholder="Enter Company Type"
            type="text"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label
            htmlFor="director-email-2"
            className="text-[16px] font-primary text-[#26203B]"
          >
            Email Id
          </Label>
          <Input
            className="py-2 px-4 h-12 placeholder:text-sm placeholder:text-[#9C9AA5]"
            id="director-email-2"
            name="director-email-2"
            placeholder="Enter Email Id"
            type="email"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label
            htmlFor="director-phone-no-2"
            className="text-[16px] font-primary text-[#26203B]"
          >
            Phone Number
          </Label>
          <Input
            className="py-2 px-4 h-12 placeholder:text-sm placeholder:text-[#9C9AA5]"
            id="director-phone-no-2"
            name="director-phone-no-2"
            placeholder="Enter Phone Number"
            type="text"
            required
          />
        </div>
      </div>

      <div className="flex flex-col gap-y-[22px]">
        <h3 className="text-center font-primary text-xl">
          Finance Manager Information
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[10px]">
          <div className="flex flex-col gap-2">
            <Label
              htmlFor="finance-company-type"
              className="text-[16px] font-primary text-[#26203B]"
            >
              Company Type
            </Label>
            <Input
              className="py-2 px-4 h-12 placeholder:text-sm placeholder:text-[#9C9AA5]"
              id="finance-company-type"
              name="finance-company-type"
              placeholder="Enter Company Type"
              type="text"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label
              htmlFor="finance-email"
              className="text-[16px] font-primary text-[#26203B]"
            >
              Email Id
            </Label>
            <Input
              className="py-2 px-4 h-12 placeholder:text-sm placeholder:text-[#9C9AA5]"
              id="finance-email"
              name="finance-email"
              placeholder="Enter Email Id"
              type="email"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label
              htmlFor="finance-phone"
              className="text-[16px] font-primary text-[#26203B]"
            >
              Phone Number
            </Label>
            <Input
              className="py-2 px-4 h-12 placeholder:text-sm placeholder:text-[#9C9AA5]"
              id="finance-phone"
              name="finance-phone"
              placeholder="Enter Phone Number"
              type="text"
              required
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const RegisterStep3 = () => {
  return (
    <div className="text-[16px] w-full px-3 mt-[10px]">
      <div className="flex justify-end mb-[26px]">
        <Button variant="outline" className="flex items-center gap-2 h-[40px]">
          Add
          <Image src="/plus.svg" alt="plus" width={24} height={24} />
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-[18px] gap-x-[10px] mb-8">
        <div className="flex flex-col gap-2">
          <Label
            htmlFor="ref-name-1"
            className="text-[16px] font-primary text-[#26203B]"
          >
            Reference Name
          </Label>
          <Input
            id="ref-name-1"
            name="ref-name-1"
            placeholder="Enter Reference Name"
            type="text"
            required
            className="py-2 px-4 h-12 placeholder:text-sm placeholder:text-[#9C9AA5]"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label
            htmlFor="assoc-1"
            className="text-[16px] font-primary text-[#26203B]"
          >
            Business Association
          </Label>
          <Input
            id="assoc-1"
            name="assoc-1"
            placeholder="Enter Business Association"
            type="text"
            required
            className="py-2 px-4 h-12 placeholder:text-sm placeholder:text-[#9C9AA5]"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label
            htmlFor="email-1"
            className="text-[16px] font-primary text-[#26203B]"
          >
            Email Id
          </Label>
          <Input
            id="email-1"
            name="email-1"
            placeholder="Enter Email Id"
            type="email"
            required
            className="py-2 px-4 h-12 placeholder:text-sm placeholder:text-[#9C9AA5]"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label
            htmlFor="phone-1"
            className="text-[16px] font-primary text-[#26203B]"
          >
            Phone Number
          </Label>
          <Input
            id="phone-1"
            name="phone-1"
            placeholder="Enter Phone Number"
            type="text"
            required
            className="py-2 px-4 h-12 placeholder:text-sm placeholder:text-[#9C9AA5]"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label
            htmlFor="ref-name-2"
            className="text-[16px] font-primary text-[#26203B]"
          >
            Reference Name
          </Label>
          <Input
            id="ref-name-2"
            name="ref-name-2"
            placeholder="Enter Reference Name"
            type="text"
            required
            className="py-2 px-4 h-12 placeholder:text-sm placeholder:text-[#9C9AA5]"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label
            htmlFor="assoc-2"
            className="text-[16px] font-primary text-[#26203B]"
          >
            Business Association
          </Label>
          <Input
            id="assoc-2"
            name="assoc-2"
            placeholder="Enter Business Association"
            type="text"
            required
            className="py-2 px-4 h-12 placeholder:text-sm placeholder:text-[#9C9AA5]"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label
            htmlFor="email-2"
            className="text-[16px] font-primary text-[#26203B]"
          >
            Email Id
          </Label>
          <Input
            id="email-2"
            name="email-2"
            placeholder="Enter Email Id"
            type="email"
            required
            className="py-2 px-4 h-12 placeholder:text-sm placeholder:text-[#9C9AA5]"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label
            htmlFor="phone-2"
            className="text-[16px] font-primary text-[#26203B]"
          >
            Phone Number
          </Label>
          <Input
            id="phone-2"
            name="phone-2"
            placeholder="Enter Phone Number"
            type="text"
            required
            className="py-2 px-4 h-12 placeholder:text-sm placeholder:text-[#9C9AA5]"
          />
        </div>
      </div>
    </div>
  );
};

const RegisterStep4 = () => {
  return (
    <div className="text-[16px] w-full px-4 sm:px-6 md:px-8 mt-4">
      <Button
        variant="outline"
        className="flex items-center mb-6 ml-auto h-[40px] max-w-max"
      >
        Add <Image src="/plus.svg" alt="plus" width={24} height={24} />
      </Button>
      <div className="relative mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-5 gap-x-4">
        <div className="flex flex-col gap-2">
          <Label
            htmlFor="account-holder-name"
            className="text-[16px] font-primary text-[#26203B]"
          >
            Account Holder Name
          </Label>
          <Input
            className="py-2 px-4 placeholder:text-sm placeholder:text-[#9C9AA5] h-12"
            id="account-holder-name"
            name="account-holder-name"
            placeholder="Enter Account Holder Name"
            type="text"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label
            htmlFor="bank-name"
            className="text-[16px] font-primary text-[#26203B]"
          >
            Bank Name
          </Label>
          <Input
            className="py-2 px-4 placeholder:text-sm placeholder:text-[#9C9AA5] h-12"
            id="bank-name"
            name="bank-name"
            placeholder="Enter Bank Name"
            type="text"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label
            htmlFor="branch-location"
            className="text-[16px] font-primary text-[#26203B]"
          >
            Bank Branch Name & Location
          </Label>
          <Input
            className="py-2 px-4 placeholder:text-sm placeholder:text-[#9C9AA5] h-12"
            id="branch-location"
            name="branch-location"
            placeholder="Enter Bank Branch Name & Location"
            type="text"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label
            htmlFor="account-number"
            className="text-[16px] font-primary text-[#26203B]"
          >
            Account Number
          </Label>
          <Input
            className="py-2 px-4 placeholder:text-sm placeholder:text-[#9C9AA5] h-12"
            id="account-number"
            name="account-number"
            placeholder="Enter Account Number"
            type="text"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label
            htmlFor="iban"
            className="text-[16px] font-primary text-[#26203B]"
          >
            IBAN{" "}
            <span className="text-[8px]">
              (International Bank Account Number)
            </span>
          </Label>
          <Input
            className="py-2 px-4 placeholder:text-sm placeholder:text-[#9C9AA5] h-12"
            id="iban"
            name="iban"
            placeholder="Enter IBAN"
            type="text"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label
            htmlFor="swift-bic"
            className="text-[16px] font-primary text-[#26203B]"
          >
            Swift/BIC Code
          </Label>
          <Input
            className="py-2 px-4 placeholder:text-sm placeholder:text-[#9C9AA5] h-12"
            id="swift-bic"
            name="swift-bic"
            placeholder="Enter Swift/BIC Code"
            type="text"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label
            htmlFor="currency"
            className="text-[16px] font-primary text-[#26203B]"
          >
            Currency
          </Label>
          <Input
            className="py-2 px-4 placeholder:text-sm placeholder:text-[#9C9AA5] h-12"
            id="currency"
            name="currency"
            placeholder="Enter Currency"
            type="text"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label
            htmlFor="bank-country"
            className="text-[16px] font-primary text-[#26203B]"
          >
            Bank Country
          </Label>
          <Input
            className="py-2 px-4 placeholder:text-sm placeholder:text-[#9C9AA5] h-12"
            id="bank-country"
            name="bank-country"
            placeholder="Enter Bank Country"
            type="text"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label
            htmlFor="beneficiary-address"
            className="text-[16px] font-primary text-[#26203B]"
          >
            Beneficiary Address
          </Label>
          <Input
            className="py-2 px-4 placeholder:text-sm placeholder:text-[#9C9AA5] h-12"
            id="beneficiary-address"
            name="beneficiary-address"
            placeholder="Enter Beneficiary Address"
            type="text"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label
            htmlFor="bank-address"
            className="text-[16px] font-primary text-[#26203B]"
          >
            Bank Address
          </Label>
          <Input
            className="py-2 px-4 placeholder:text-sm placeholder:text-[#9C9AA5] h-12"
            id="bank-address"
            name="bank-address"
            placeholder="Enter Bank Address"
            type="text"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label
            htmlFor="vat-trn-number"
            className="text-[16px] font-primary text-[#26203B]"
          >
            VAT/TRN Number
          </Label>
          <Input
            className="py-2 px-4 placeholder:text-sm placeholder:text-[#9C9AA5] h-12"
            id="vat-trn-number"
            name="vat-trn-number"
            placeholder="Enter VAT/TRN Number"
            type="text"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label
            htmlFor="cancelled-cheque"
            className="text-[16px] font-primary text-[#26203B]"
          >
            Upload Cancelled Cheque
          </Label>
          <Input
            className="py-2 px-4 placeholder:text-sm placeholder:text-[#9C9AA5] h-12"
            id="cancelled-cheque"
            name="cancelled-cheque"
            type="file"
            required
          />
        </div>
      </div>
    </div>
  );
};

const RegisterStep5 = () => {
  return (
    <div className="text-[16px] min-w-[320px] max-w-screen-2xl mx-auto px-4 flex flex-col gap-6 md:gap-[21px] mt-10 mb-1">
      <div className="relative mb-20 w-[163px] h-[163px] mx-auto">
        <Image
          src="Ellipse 1.svg"
          alt="ellipse"
          fill
          className="absolute inset-0 m-auto"
          style={{ objectFit: "contain" }}
        />
        <Image
          src="Work.svg"
          alt="work"
          width={50}
          height={50}
          className="absolute inset-0 m-auto"
        />
      </div>

      <div className="flex flex-col md:flex-row items-center gap-6 md:gap-[24px]">
        <div className="flex flex-col gap-2 flex-1 w-full">
          <Label
            htmlFor="company-name"
            className="text-[16px] font-primary text-[#26203B]"
          >
            Company Name
          </Label>
          <Input
            className="py-2 px-4 placeholder:text-sm placeholder:text-[#9C9AA5] h-12"
            id="company-name"
            name="company-name"
            placeholder="Enter your company name"
            type="text"
          />
        </div>

        <div className="hidden md:block w-[1px] h-[62px] bg-[#DFDFDF]" />

        <div className="flex flex-col gap-2 flex-1 w-full">
          <Label
            htmlFor="company-mail"
            className="text-[16px] font-primary text-[#26203B]"
          >
            Company Mail
          </Label>
          <Input
            className="py-2 px-4 placeholder:text-sm placeholder:text-[#9C9AA5] h-12"
            id="company-mail"
            name="company-mail"
            placeholder="Enter your company mail"
            type="email"
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-6 md:gap-[24px]">
        <div className="flex flex-col gap-2 flex-1 w-full">
          <Label
            htmlFor="years-incorporated"
            className="text-[16px] font-primary text-[#26203B]"
          >
            Years Since Incorporated
          </Label>
          <Input
            className="py-2 px-4 placeholder:text-sm placeholder:text-[#9C9AA5] h-12"
            id="years-incorporated"
            name="years-incorporated"
            placeholder="Enter date"
            type="date"
          />
        </div>

        <div className="hidden md:block w-[1px] h-[62px] bg-[#DFDFDF]" />

        <div className="flex flex-col gap-2 flex-1 w-full">
          <Label
            htmlFor="employee-size"
            className="text-[16px] font-primary text-[#26203B]"
          >
            Employer Site
          </Label>
          <Input
            className="py-2 px-4 placeholder:text-sm placeholder:text-[#9C9AA5] h-12"
            id="employee-size"
            name="employee-size"
            placeholder="Enter your company size"
            type="text"
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-6 md:gap-[24px]">
        <div className="flex flex-col gap-2 flex-1 w-full">
          <Label
            htmlFor="another-field"
            className="text-[16px] font-primary text-[#26203B]"
          >
            Another Field
          </Label>
          <Input
            className="py-2 px-4 placeholder:text-sm placeholder:text-[#9C9AA5] h-12"
            id="another-field"
            name="another-field"
            placeholder="Enter something"
            type="text"
          />
        </div>

        <div className="hidden md:block w-[1px] h-[62px] bg-[#DFDFDF]" />

        <div className="flex flex-col gap-2 flex-1 w-full">
          <Label
            htmlFor="last-field"
            className="text-[16px] font-primary text-[#26203B]"
          >
            Last Field
          </Label>
          <Input
            className="py-2 px-4 placeholder:text-sm placeholder:text-[#9C9AA5] h-12"
            id="last-field"
            name="last-field"
            placeholder="Enter something else"
            type="text"
          />
        </div>
      </div>
    </div>
  );
};

const RegisterStep6 = () => {
  return (
    <div className="text-[16px] max-w-screen-lg mx-auto px-4 mt-2">
      <div className="flex justify-end mb-6 gap-2">
        <Button variant="outline" className="flex items-center h-[40px] gap-2">
          Add <Image src="/plus.svg" alt="plus" width={24} height={24} />
        </Button>
        <div className="border border-[#D55B09] rounded-[7px] h-[40px] w-[40px] flex items-center justify-center">
          <Image src="PaperClip.svg" alt="paperclip" width={26} height={26} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
        <div className="flex flex-col gap-2 w-full max-w-[442px] mx-auto md:mx-0">
          <Label
            htmlFor="nature-of-business"
            className="text-[16px] font-primary text-[#26203B]"
          >
            Nature of Business
          </Label>
          <Select>
            <SelectTrigger
              id="nature-of-business"
              className="w-full py-2 px-4 placeholder:text-sm placeholder:text-[#9C9AA5] h-12"
            >
              <SelectValue placeholder="Select the Nature of Business" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Nature of Business</SelectLabel>
                <SelectItem value="manufacturing">Manufacturing</SelectItem>
                <SelectItem value="wholesale">Wholesale</SelectItem>
                <SelectItem value="retail">Retail</SelectItem>
                <SelectItem value="service">Service</SelectItem>
                <SelectItem value="import-export">Import / Export</SelectItem>
                <SelectItem value="technology">Technology</SelectItem>
                <SelectItem value="agriculture">Agriculture</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2 w-full max-w-[442px] mx-auto md:mx-0">
          <Label
            htmlFor="shipment-type"
            className="text-[16px] font-primary text-[#26203B]"
          >
            Shipment Type
          </Label>
          <Select>
            <SelectTrigger
              id="shipment-type"
              className="w-full py-2 px-4 placeholder:text-sm placeholder:text-[#9C9AA5] h-12"
            >
              <SelectValue placeholder="Select Shipment Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Shipment Type</SelectLabel>
                <SelectItem value="air-freight">Air Freight</SelectItem>
                <SelectItem value="sea-freight">Sea Freight</SelectItem>
                <SelectItem value="road-freight">Road Freight</SelectItem>
                <SelectItem value="rail-freight">Rail Freight</SelectItem>
                <SelectItem value="express-courier">Express Courier</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

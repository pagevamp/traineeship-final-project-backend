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
        className="overflow-x-auto scrollbar-hide w-full"
        style={{ scrollBehavior: "smooth" }}
      >
        <div className="flex gap-4 min-w-max " ref={stepsInnerRef}>
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
    <div className="text-[16px] w-full max-w-[600px] px-4 sm:px-6 md:px-8 lg:px-0 mx-auto flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Input
          className="w-full py-2 px-4 placeholder:text-xs placeholder:text-[#9C9AA5] h-12"
          id="company-name"
          name="company-name"
          labelName="Company Name"
          placeholder="Enter your company name"
          type="text"
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <Input
          className="w-full py-2 px-4 placeholder:text-xs placeholder:text-[#9C9AA5] h-12"
          id="company-mail"
          name="company-mail"
          labelName=" Company Mail"
          placeholder="Enter your company mail"
          type="email"
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label
          htmlFor="company-type"
          className="text-[14px] font-primary text-[#26203B]"
        >
          Company Type
        </Label>
        <Select>
          <SelectTrigger
            id="company-type"
            className="w-full py-2 px-4 placeholder:text-xs placeholder:text-[#9C9AA5] placeholder:font-[300] h-12"
          >
            <SelectValue
              placeholder="Select your company type"
              className="placeholder:font-[300]"
            />
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
        <Input
          className="w-full py-2 px-4 placeholder:text-xs placeholder:text-[#9C9AA5] h-12"
          id="years-incorporated"
          name="years-incorporated"
          labelName=" Years Since Incorporated"
          placeholder="Enter date"
          type="text"
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <Input
          className="w-full py-2 px-4 placeholder:text-xs placeholder:text-[#9C9AA5] h-12"
          id="employee-size"
          name="employee-size"
          labelName="Employer Size"
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
          <Input
            className="w-full py-2 px-4 placeholder:text-xs placeholder:text-[#9C9AA5] h-12"
            id="company-type"
            name="company-type"
            labelName="Company Type"
            placeholder="Enter Company Type"
            type="text"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <Input
            className="w-full py-2 px-4 placeholder:text-xs placeholder:text-[#9C9AA5] h-12"
            id="director-email"
            name="director-email"
            labelName="Email Id"
            placeholder="Enter Email Id"
            type="email"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <Input
            className="w-full py-2 px-4 placeholder:text-xs placeholder:text-[#9C9AA5] h-12"
            id="director-phone-no"
            name="director-phone-no"
            labelName="Phone Number"
            placeholder="Enter Phone Number"
            type="text"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <Input
            className="w-full py-2 px-4 placeholder:text-xs placeholder:text-[#9C9AA5] h-12"
            id="company-type-2"
            name="company-type-2"
            labelName="Company Type"
            placeholder="Enter Company Type"
            type="text"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <Input
            className="w-full py-2 px-4 placeholder:text-xs placeholder:text-[#9C9AA5] h-12"
            id="director-email-2"
            name="director-email-2"
            labelName="Email Id"
            placeholder="Enter Email Id"
            type="email"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <Input
            className="w-full py-2 px-4 placeholder:text-xs placeholder:text-[#9C9AA5] h-12"
            id="director-phone-no-2"
            name="director-phone-no-2"
            labelName="Phone Number"
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
            <Input
              className="w-full py-2 px-4 placeholder:text-xs placeholder:text-[#9C9AA5] h-12"
              id="company-type-2"
              name="company-type-2"
              labelName="Company Type"
              placeholder="Enter Company Type"
              type="text"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <Input
              className="w-full py-2 px-4 placeholder:text-xs placeholder:text-[#9C9AA5] h-12"
              id="director-email-2"
              name="director-email-2"
              labelName="Email Id"
              placeholder="Enter Email Id"
              type="email"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <Input
              className="w-full py-2 px-4 placeholder:text-xs placeholder:text-[#9C9AA5] h-12"
              id="director-phone-no-2"
              name="director-phone-no-2"
              labelName="Phone Number"
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
          <Input
            id="ref-name-1"
            name="ref-name-1"
            labelName="Reference Name"
            placeholder="Enter Reference Name"
            type="text"
            required
            className="w-full py-2 px-4 placeholder:text-xs placeholder:text-[#9C9AA5] h-12"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Input
            id="assoc-1"
            name="assoc-1"
            labelName="Business Association"
            placeholder="Enter Business Association"
            type="text"
            required
            className="w-full py-2 px-4 placeholder:text-xs placeholder:text-[#9C9AA5] h-12"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Input
            id="email-1"
            name="email-1"
            labelName="Email Id"
            placeholder="Enter Email Id"
            type="email"
            required
            className="w-full py-2 px-4 placeholder:text-xs placeholder:text-[#9C9AA5] h-12"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Input
            id="phone-1"
            name="phone-1"
            labelName="Phone Number"
            placeholder="Enter Phone Number"
            type="text"
            required
            className="w-full py-2 px-4 placeholder:text-xs placeholder:text-[#9C9AA5] h-12"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Input
            id="ref-name-2"
            name="ref-name-2"
            labelName="Reference Name"
            placeholder="Enter Reference Name"
            type="text"
            required
            className="w-full py-2 px-4 placeholder:text-xs placeholder:text-[#9C9AA5] h-12"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Input
            id="assoc-2"
            name="assoc-2"
            labelName="Business Association"
            placeholder="Enter Business Association"
            type="text"
            required
            className="w-full py-2 px-4 placeholder:text-xs placeholder:text-[#9C9AA5] h-12"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Input
            id="email-2"
            name="email-2"
            labelName="Email Id"
            placeholder="Enter Email Id"
            type="email"
            required
            className="w-full py-2 px-4 placeholder:text-xs placeholder:text-[#9C9AA5] h-12"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Input
            id="phone-2"
            name="phone-2"
            labelName="Phone Number"
            placeholder="Enter Phone Number"
            type="text"
            required
            className="w-full py-2 px-4 placeholder:text-xs placeholder:text-[#9C9AA5] h-12"
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
          <Input
            className="w-full py-2 px-4 placeholder:text-xs placeholder:text-[#9C9AA5] h-12"
            id="account-holder-name"
            name="account-holder-name"
            labelName="Account Holder Name"
            placeholder="Enter Account Holder Name"
            type="text"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <Input
            className="w-full py-2 px-4 placeholder:text-xs placeholder:text-[#9C9AA5] h-12"
            id="bank-name"
            name="bank-name"
            labelName="Bank Name"
            placeholder="Enter Bank Name"
            type="text"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <Input
            className="w-full py-2 px-4 placeholder:text-xs placeholder:text-[#9C9AA5] h-12"
            id="branch-location"
            name="branch-location"
            labelName="Bank Branch Name & Location"
            placeholder="Enter Bank Branch Name & Location"
            type="text"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <Input
            className="w-full py-2 px-4 placeholder:text-xs placeholder:text-[#9C9AA5] h-12"
            id="account-number"
            name="account-number"
            labelName="Account Number"
            placeholder="Enter Account Number"
            type="text"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <Input
            className="w-full py-2 px-4 placeholder:text-xs placeholder:text-[#9C9AA5] h-12"
            id="iban"
            name="iban"
            labelName={
              <>
                IBAN{" "}
                <span className="text-[8px]">
                  (International Bank Account Number)
                </span>
              </>
            }
            placeholder="Enter IBAN"
            type="text"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <Input
            className="w-full py-2 px-4 placeholder:text-xs placeholder:text-[#9C9AA5] h-12"
            id="swift-bic"
            name="swift-bic"
            labelName="Swift/BIC Code"
            placeholder="Enter Swift/BIC Code"
            type="text"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <Input
            className="w-full py-2 px-4 placeholder:text-xs placeholder:text-[#9C9AA5] h-12"
            id="currency"
            name="currency"
            labelName="Currency"
            placeholder="Enter Currency"
            type="text"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <Input
            className="w-full py-2 px-4 placeholder:text-xs placeholder:text-[#9C9AA5] h-12"
            id="bank-country"
            name="bank-country"
            labelName=" Bank Country"
            placeholder="Enter Bank Country"
            type="text"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <Input
            className="w-full py-2 px-4 placeholder:text-xs placeholder:text-[#9C9AA5] h-12"
            id="beneficiary-address"
            name="beneficiary-address"
            labelName="Beneficiary Address"
            placeholder="Enter Beneficiary Address"
            type="text"
            required
          />
        </div>
        <div className="flex flex-col gap-2 border-[#DFDFDF]">
          <Input
            className="w-full py-2 px-4 placeholder:text-xs placeholder:text-[#9C9AA5] h-12"
            id="bank-address"
            name="bank-address"
            labelName="Bank Address"
            placeholder="Enter Bank Address"
            type="text"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <Input
            className="w-full py-2 px-4 placeholder:text-xs placeholder:text-[#9C9AA5] h-12"
            id="vat-trn-number"
            name="vat-trn-number"
            labelName="VAT/TRN Number"
            placeholder="Enter VAT/TRN Number"
            type="text"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <Input
            className="w-full py-2 px-4 placeholder:text-xs placeholder:text-[#9C9AA5] h-12"
            id="cancelled-cheque"
            labelName="Upload Cancelled Cheque"
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
    <div className="text-[16px] min-w-[320px] max-w-screen-2xl mx-auto px-4 flex flex-col gap-6 md:gap-[21px] mt-2 mb-1">
      <div className="relative mb-2 w-[163px] h-[163px] mx-auto">
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
          <div className="w-[209px] h-[48px]  border-[#DFDFDF] bg-white flex items-center gap-2 px-3 rounded-md shadow-sm">
            <Image
              src="/Upload.svg"
              alt="Company Logo"
              className="w-6 h-6 object-contain"
              width={20}
              height={20}
            />
            <span className="text-sm font-medium text-[#1E1E1E]">
              Company Name
            </span>
          </div>
        </div>

        <div className="hidden md:block w-[1px] h-[62px] bg-[#DFDFDF]" />

        <div className="flex flex-col gap-2 flex-1 w-full">
          <div className="w-[209px] h-[48px]  border-[#DFDFDF] bg-white flex items-center gap-2 px-3 rounded-md shadow-sm">
            <Image
              src="/Upload.svg"
              alt="Company Logo"
              className="w-6 h-6 object-contain"
              width={20}
              height={20}
            />
            <span className="text-sm font-medium text-[#1E1E1E]">
              Company Name
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-6 md:gap-[24px]">
        <div className="flex flex-col gap-2 flex-1 w-full">
          <div className="w-[209px] h-[48px]  border-[#DFDFDF] bg-white flex items-center gap-2 px-3 rounded-md shadow-sm">
            <Image
              src="/Upload.svg"
              alt="Company Logo"
              className="w-6 h-6 object-contain"
              width={20}
              height={20}
            />
            <span className="text-sm font-medium text-[#1E1E1E]">
              Company Name
            </span>
          </div>
        </div>

        <div className="hidden md:block w-[1px] h-[62px] bg-[#DFDFDF]" />

        <div className="flex flex-col gap-2 flex-1 w-full">
          <div className="w-[209px] h-[48px]  border-[#DFDFDF] bg-white flex items-center gap-2 px-3 rounded-md shadow-sm">
            <Image
              src="/Upload.svg"
              alt="Company Logo"
              className="w-6 h-6 object-contain"
              width={20}
              height={20}
            />
            <span className="text-sm font-medium text-[#1E1E1E]">
              Company Name
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-6 md:gap-[24px]">
        <div className="flex flex-col gap-2 flex-1 w-full">
          <div className="w-[209px] h-[48px]  border-[#DFDFDF] bg-white flex items-center gap-2 px-3 rounded-md shadow-sm">
            <Image
              src="/Upload.svg"
              alt="Company Logo"
              className="w-6 h-6 object-contain"
              width={20}
              height={20}
            />
            <span className="text-sm font-medium text-[#1E1E1E]">
              Company Name
            </span>
          </div>
        </div>

        <div className="hidden md:block w-[1px] h-[62px]" />

        <div className="flex flex-col gap-2 flex-1 w-full">
          <div className="w-[209px] h-[48px]  border-[#DFDFDF] bg-white flex items-center gap-2 px-3 rounded-md shadow-sm">
            <Image
              src="/Upload.svg"
              alt="Company Logo"
              className="w-6 h-6 object-contain"
              width={20}
              height={20}
            />
            <span className="text-sm font-medium text-[#1E1E1E]">
              Company Name
            </span>
          </div>
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
            className="text-[14px] font-primary text-[#26203B]"
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
            className="text-[14px] font-primary text-[#26203B]"
          >
            Shipment Type
          </Label>
          <Select>
            <SelectTrigger
              id="shipment-type"
              className="min-w-[420px] py-2 px-4 placeholder:text-sm placeholder:text-[#9C9AA5] h-12"
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

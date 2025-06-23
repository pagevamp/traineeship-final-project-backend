"use client";

import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/Heading";
import { Stepper } from "@/components/ui/stepper";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState, useCallback } from "react";
import { steps, headings } from "../constant";
import { useRouter } from "next/navigation";
import Register1 from "./RegisterStep1";
import Register2 from "./RegisterStep2";
import Register3 from "./RegisterStep3";
import Register4 from "./RegisterStep4";
import Register5 from "./RegisterStep5";
import Register6 from "./RegisterStep6";
import Register7 from "./RegisterStep7";
import Link from "next/link";
import { useFieldArray, useForm } from "react-hook-form";

type FormValues = {
  directorDetails: { name: string; email: string; phone: string }[];
  financialDirectorDetails: { name: string; email: string; phone: string }[];
};

const RegisterComponent = () => {
  const router = useRouter();
  const [currStep, setCurrStep] = useState<number>(1);
  const totalSteps = steps.length;

  const stepperContainerRef = useRef<HTMLDivElement>(null);

  const stepsInnerRef = useRef<HTMLDivElement>(null);

  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const { register, control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      directorDetails: [{ name: "", email: "", phone: "" }],
      financialDirectorDetails: [{ name: "", email: "", phone: "" }],
    },
  });

  const {
    fields: directorFields,
    append: appendDirector,
    remove: removeDirector,
  } = useFieldArray({
    control,
    name: "directorDetails",
  });

  const {
    fields: financeFields,
    append: appendFinance,
    remove: removeFinance,
  } = useFieldArray({
    control,
    name: "financialDirectorDetails",
  });

  const onSubmit = (data: FormValues) => {};

  const formProps = {
    register,
    control,
    handleSubmit,
    directorFields,
    appendDirector,
    removeDirector,
    financeFields,
    appendFinance,
    removeFinance,
  };

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
      <RegisterStep3 key="step-3" {...formProps} />,
      <RegisterStep4 key="step-4" />,
      <RegisterStep5 key="step-5" />,
      <RegisterStep6 key="step-6" />,
      <RegisterStep7 key="step-7" />,
    ];

    return StepComponents[currStep - 1] || <RegisterStep1 />;
  };

  const currHeading = headings.find((h) => h.id === currStep);

  return (
    <section className="font-secondary max-w-[1130px] mx-auto h-full flex flex-col items-center pt-[34px] relative">
      <Image
        src="/arctern-logo.svg"
        width={142}
        height={81}
        alt="Company Logo"
        className="mb-[22px]"
      />

      <div className="w-full flex justify-between items-center px-4 mb-4">
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
    <div className="font-primary flex flex-col items-center gap-4 mb-[47px] mt-[70px]">
      {currStep === totalSteps ? (
        <Button className="font-primary text-lg bg-transparent text-[#CF5406] shadow-none hover:bg-transparent flex items-center justify-center">
          <ChevronRight className="mr-2" size={18} />
          <Link href="/success">Skip</Link>
        </Button>
      ) : null}
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
    <>
      <Register1 />
    </>
  );
};

const RegisterStep2 = () => {
  return (
    <>
      <Register2 />
    </>
  );
};

const RegisterStep3 = (props: any) => {
  return (
    <>
      <Register3 {...props} />
    </>
  );
};

const RegisterStep4 = () => {
  return (
    <>
      <Register4 />
    </>
  );
};

const RegisterStep5 = () => {
  const { control } = useForm();
  return (
    <>
      <Register5 control={control} />
    </>
  );
};

const RegisterStep6 = () => {
  return (
    <>
      <Register6 />
    </>
  );
};

const RegisterStep7 = () => {
  return (
    <>
      <Register7 />
    </>
  );
};

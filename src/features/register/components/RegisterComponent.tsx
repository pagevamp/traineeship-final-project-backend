"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/Heading";
import { Stepper } from "@/components/ui/stepper";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
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
import {
  Resolver,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { customerRegisterValidationSchemas } from "../validation";
import { UserPayload } from "../types";
import { useVehicleType } from "../hooks";

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

const RegisterComponent = () => {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(1);
  const totalSteps = steps.length;

  const stepperContainerRef = useRef<HTMLDivElement>(null);

  const stepsInnerRef = useRef<HTMLDivElement>(null);

  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const formOptions = {
    defaultValues: {
      directorDetails: [{ name: "", email: "", phone: "" }],
      financialDirectorDetails: [{ name: "", email: "", phone: "" }],
      tradeReferenceDetails: [
        { referenceName: "", businessAssociation: "", phone: "", email: "" },
      ],
      products: [{ hsCode: "", commodityName: "" }],
    },
    resolver: yupResolver(
      customerRegisterValidationSchemas[activeStep - 1]
    ) as Resolver<UserPayload>,
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    control,
    setValue,
    getValues,
    trigger,
  } = useForm<UserPayload>(formOptions);
  const defaultValues = watch();
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

  const {
    fields: tradeReferenceFields,
    append: appendTradeReference,
    remove: removeTradeReference,
  } = useFieldArray({
    control,
    name: "tradeReferenceDetails",
  });

  const {
    fields: productFields,
    append: appendProduct,
    remove: removeProduct,
  } = useFieldArray({
    control,
    name: "products",
  });

  //get vehicle type data
  const { data: getVehicleType, isLoading: isVehicleTypeLoading } =
    useVehicleType(activeStep);

  const onSubmit: SubmitHandler<UserPayload> = (data) => {};
console.log(errors,'errr')
  const baseFormProps = {
    register,
    watch,
    setValue,
    trigger,
    errors,
    handleSubmit,
    control,
    onSubmit,
    defaultValues: watch(),
  };
  const register1FormProps = {
    ...baseFormProps,
  };
  const register2FormProps = {
    ...baseFormProps,
    getVehicleType,
    isVehicleTypeLoading,
  };
  const register3FormProps = {
    ...baseFormProps,
    directorFields,
    appendDirector,
    removeDirector,
    financeFields,
    appendFinance,
    removeFinance,
  };
  const register4FormProps = {
    ...baseFormProps,
    tradeReferenceFields,
    appendTradeReference,
    removeTradeReference,
  };
  const register5FormProps = {
    ...baseFormProps,
  };
  const register7FormProps = {
    ...baseFormProps,
    productFields,
    appendProduct,
    removeProduct,
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
    const currentStepElement = stepElements[activeStep - 1] as HTMLElement;

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
  }, [activeStep]);

  const nextStep = useCallback(() => {
    if (activeStep < totalSteps) {
      setActiveStep((prev) => prev + 1);
    } else {
      router.push("/success");
    }
  }, [activeStep, totalSteps, router]);

  const prevStep = useCallback(() => {
    setActiveStep((prev) => (prev > 1 ? prev - 1 : prev));
  }, []);
  console.log(defaultValues, "dv");
  const renderStep = () => {
    switch (activeStep) {
      case 1:
        return <Register1 {...register1FormProps} />;
      case 2:
        return <Register2 {...register2FormProps} />;
      case 3:
        return <Register3 {...register3FormProps} />;
      case 4:
        return <Register4 {...register4FormProps} />;
      case 5:
        return <Register5 {...register5FormProps} />;
      case 6:
        return <Register6 />;
      case 7:
        return <Register7 {...register7FormProps} />;
      default:
        return <Register1 {...register1FormProps} />;
    }
  };

  const currHeading = headings.find((h) => h.id === activeStep);

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
          <Stepper steps={steps} currentStep={activeStep} />
        </div>
      </div>

      <Heading
        title={currHeading?.title}
        description={currHeading?.description}
      />
      {renderStep()}

      <ChangeStep
        nextStep={handleSubmit(nextStep)}
        prevStep={prevStep}
        currStep={activeStep}
        totalSteps={totalSteps}
      />
    </section>
  );
};

export default RegisterComponent;

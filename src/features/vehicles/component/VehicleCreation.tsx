"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/Heading";
import { Stepper } from "@/components/ui/stepper";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { steps, headings } from "../constant";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import Vehicle1 from "./VehicleStep1";
import Vehicle2 from "./VehicleStep2";
import Vehicle3 from "./VehicleStep3";
import Vehicle4 from "./VehicleStep4";
import Vehicle5 from "./VehicleStep5";
import Vehicle6 from "./VehicleStep6";

const VehicleCreation = () => {
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
      router.push("/vehicle/1");
    }
  }, [currStep, totalSteps, router]);

  const prevStep = useCallback(() => {
    setCurrStep((prev) => (prev > 1 ? prev - 1 : prev));
  }, []);

  const renderStep = () => {
    const StepComponents = [
      <VehicleStep1 key="step-1" />,
      <VehicleStep2 key="step-2" />,
      <VehicleStep3 key="step-3" />,
      <VehicleStep4 key="step-4" />,
      <VehicleStep5 key="step-5" />,
      <VehicleStep6 key="step-6" />,
    ];

    return StepComponents[currStep - 1] || <VehicleStep1 />;
  };

  const currHeading = headings.find((h) => h.id === currStep);

  return (
    <section className="font-secondary max-w-[1100px] mx-auto h-full flex flex-col items-center pt-[34px] relative">
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
        <div
          className="flex gap-4 min-w-max m-auto items-center justify-center"
          ref={stepsInnerRef}
        >
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

export default VehicleCreation;

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

const VehicleStep1 = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      vehicleName: "",
      vehicleType: "",
      vehicleModel: "",
      plateNumber: "",
      countryOfRegistration: "",
    },
  });

  return (
    <>
      <Vehicle1 control={control} />
    </>
  );
};

const VehicleStep2 = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      ownershipType: "",
      assignedVendor: "",
      assignedDriver: "",
    },
  });

  return (
    <>
      <Vehicle2 control={control} />
    </>
  );
};

const VehicleStep3 = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      temperatureControlled: "",
      temperatureRange: "",
      DGCertified: "",
      GDPCompliant: "",
      capacity: "",
      volumeCapacity: "",
    },
  });

  return (
    <>
      <Vehicle3 control={control} />
    </>
  );
};

const VehicleStep4 = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      uploadRegistrationDocument: "",
      uploadInsuranceDocument: "",
      uploadFitnessCertificate: "",
      uploadReeferCertificate: "",
      uploadDGCertificate: "",
    },
  });

  return (
    <>
      <Vehicle4 control={control} />
    </>
  );
};

const VehicleStep5 = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      odometerReading: "",
      fuelType: "",
      GDPTrackerInstalled: "",
      deviceId: "",
    },
  });

  return (
    <>
      <Vehicle5 control={control} />
    </>
  );
};

const VehicleStep6 = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      vehicleId: "",
      selectAcceptedCurrency: "",
      createdBy: "",
      dateCreated: "",
    },
  });

  return (
    <>
      <Vehicle6 control={control} />
    </>
  );
};

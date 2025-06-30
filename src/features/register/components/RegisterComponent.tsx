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
import { Resolver, useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { customerRegisterValidationSchemas } from "../validation";
import { UserPayload } from "../types";
import { useCreateCustomer, useVehicleType } from "../hooks";
import { toast } from "sonner";
import { useFileUpload } from "@/hooks/useFileUpload";
import { isFile } from "@/constant";

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
  isLoading,
}: {
  nextStep: () => void;
  prevStep: () => void;
  currStep: number;
  totalSteps: number;
  isLoading?: boolean;
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
        disabled={isLoading}
        className="rounded-[8px] w-[210px] h-[48px] py-[10px] px-5 bg-gradient-to-b from-[#CF5406] to-[#F87B18] disabled:opacity-50"
      >
        {isLoading
          ? "Creating..."
          : currStep === totalSteps
          ? "Finish"
          : "Continue"}
      </Button>

      {currStep > 1 && (
        <Button
          onClick={prevStep}
          disabled={isLoading}
          className="font-primary text-lg bg-transparent text-[#CF5406] shadow-none hover:bg-transparent flex items-center justify-center disabled:opacity-50"
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
  const [isUploading, setIsUploading] = useState(false);

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
    mode: "onChange" as const,
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    control,
    setValue,
    trigger,
  } = useForm<UserPayload>(formOptions);
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

  // upload file
  const { mutateAsync: uploadFile, isPending: isFileUploading } = useFileUpload(
    {
      onError: (error, variables, context) => {
        toast.error(
          error?.response?.data?.message ||
            "Error uploading file. Please ensure it meets the required format and size."
        );
      },
      onSuccess: (data) => {
        return data;
      },
    }
  );

  // Function to upload a single file
  const uploadSingleFile = useCallback(
    async (
      file: File,
      fieldName: string
    ): Promise<{ fieldName: string; filePath: string }> => {
      const formData = new FormData();
      formData.append("file", file);

      const result: any = await uploadFile(formData);
      return {
        fieldName,
        filePath: result.data.data.filePath,
      };
    },
    [uploadFile]
  );

  // Function to upload all files in parallel
  const uploadAllFiles = useCallback(
    async (documents: any[]): Promise<Record<string, string>> => {
      if (!documents || documents.length === 0) return {};

      const document = documents[0]; // Assuming single document object
      const filesToUpload: Array<{ file: File; fieldName: string }> = [];

      // Collect all files that need to be uploaded
      const documentFields = [
        "tradeLicense",
        "vatCertificate",
        "passport",
        "emiratesId",
        "contract",
      ];

      documentFields.forEach((fieldName) => {
        const fieldValue = document[fieldName];
        if (fieldValue && isFile(fieldValue)) {
          filesToUpload.push({ file: fieldValue, fieldName });
        }
      });

      // Optional fields
      const optionalFields = ["secuirtyCheck", "other"];
      optionalFields.forEach((fieldName) => {
        const fieldValue = document[fieldName];
        if (fieldValue && isFile(fieldValue)) {
          filesToUpload.push({ file: fieldValue, fieldName });
        }
      });

      if (filesToUpload.length === 0) return {};

      // Upload all files in parallel
      const uploadPromises = filesToUpload.map(({ file, fieldName }) =>
        uploadSingleFile(file, fieldName)
      );

      try {
        const results = await Promise.all(uploadPromises);

        // Convert results to object
        const uploadedFilesMap: Record<string, string> = {};
        results.forEach(({ fieldName, filePath }) => {
          uploadedFilesMap[fieldName] = filePath;
        });

        return uploadedFilesMap;
      } catch (error) {
        throw new Error("Failed to upload one or more files");
      }
    },
    [uploadSingleFile]
  );

  const baseFormProps = {
    register,
    watch,
    setValue,
    trigger,
    errors,
    handleSubmit,
    control,
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
  const register6FormProps = {
    ...baseFormProps,
  };
  const register7FormProps = {
    ...baseFormProps,
    productFields,
    appendProduct,
    removeProduct,
  };

  const updateScrollArrows = useCallback(() => {
    const container = stepperContainerRef.current;
    if (!container) return;
    setShowLeftArrow(container.scrollLeft > 0);
    setShowRightArrow(
      container.scrollLeft + container.clientWidth < container.scrollWidth - 2
    );
  }, []);

  useEffect(() => {
    const container = stepperContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      updateScrollArrows();
    };

    updateScrollArrows(); // Initial check
    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [updateScrollArrows]);

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
      setTimeout(updateScrollArrows, 300); // Give time for scroll to finish
    }
  }, [activeStep, updateScrollArrows]);

  useEffect(() => {
    const container = stepperContainerRef.current;
    if (container && activeStep === 1) {
      container.scrollLeft = 0;
    }
  }, [activeStep]);

  const { mutateAsync: createCustomer, isPending } = useCreateCustomer({
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Something went wrong!");
    },
    onSuccess: (data) => {
      toast.success("Customer Successfully Created!!");
      router.push("/success");
    },
  });

  const nextStep = useCallback(
    async (formData: UserPayload) => {
      // Manual validation check

      if (activeStep < totalSteps) {
        setActiveStep((prev) => prev + 1);
      } else {
        try {
          setIsUploading(true);

          // Upload all files first
          const uploadedFilesMap = await uploadAllFiles(formData.documents);

          // Create the request body with uploaded file paths
          const reqBody: any = {
            vehicleType: formData.vehicleType,
            companyName: formData.companyName,
            companyEmail: formData.companyEmail,
            companyType: formData.companyType,
            yearOfEstablishment: formData.yearOfEstablishment,
            natureOfBusiness: formData.natureOfBusiness,
            shipmentType: formData.shipmentType,
            destinationCountry: formData.destinationCountry,
            directorDetails:
              formData.directorDetails?.map((director) => ({
                name: director.name,
                email: director.email,
                phone: director.phone,
              })) || [],
            financialDirectorDetails:
              formData.financialDirectorDetails?.map((director) => ({
                name: director.name,
                email: director.email,
                phone: director.phone,
              })) || [],
            tradeReferenceDetails:
              formData.tradeReferenceDetails?.map((reference) => ({
                referenceName: reference.referenceName,
                businessAssociation: reference.businessAssociation,
                phone: reference.phone,
                email: reference.email,
              })) || [],
            bankDetails:
              formData.bankDetails?.map((bank) => ({
                accountHolderName: bank.accountHolderName,
                bankName: bank.bankName,
                bankBranchNameAndLocation: bank.bankBranchNameAndLocation,
                accountNumber: bank.accountNumber,
                iban: bank.iban,
                swiftBicCode: bank.swiftBicCode,
                currency: bank.currency,
                bankCountry: bank.bankCountry,
                beneficiaryAddress: bank.beneficiaryAddress,
                bankAddress: bank.bankAddress,
                vatTrnNumber: bank.vatTrnNumber,
                referenceFromBank: bank.referenceFromBank,
              })) || [],
          };

          // Only add products if at least one product has non-empty values
          const hasValidProducts = formData.products?.some(
            (product) => product.hsCode?.trim() || product.commodityName?.trim()
          );

          if (hasValidProducts) {
            reqBody.products = formData.products
              .filter(
                (product) =>
                  product.hsCode?.trim() || product.commodityName?.trim()
              )
              .map((product) => ({
                hsCode: product.hsCode,
                commodityName: product.commodityName,
              }));
          }

          // Add optional fields only if they have values
          if (formData.employeeSize) {
            reqBody.employeeSize = formData.employeeSize;
          }

          // Add shipment data based on shipment type
          if (
            formData.shipmentType === "FTL" ||
            formData.shipmentType === "BOTH"
          ) {
            reqBody.shipmentFtl = {
              noOfTrips: Number(formData.shipmentFtl?.noOfTrips) || 0,
              typeOfEquipments: formData.shipmentFtl?.typeOfEquipments || "",
              serviceNeeded: formData.shipmentFtl?.serviceNeeded || "",
              equipmentCapacity: formData.shipmentFtl?.equipmentCapacity || "",
            };
          }

          if (
            formData.shipmentType === "LTL" ||
            formData.shipmentType === "BOTH"
          ) {
            reqBody.shipmentLtl = {
              noOfShipmentsPerLane:
                Number(formData.shipmentLtl?.noOfShipmentsPerLane) || 0,
              weightPerShipmentPerLane:
                Number(formData.shipmentLtl?.weightPerShipmentPerLane) || 0,
            };
          }

          // Build documents object with only uploaded files
          const documentsObj: any = {};

          // Required document fields
          if (uploadedFilesMap.tradeLicense) {
            documentsObj.tradeLicense = uploadedFilesMap.tradeLicense;
          }
          if (uploadedFilesMap.vatCertificate) {
            documentsObj.vatCertificate = uploadedFilesMap.vatCertificate;
          }
          if (uploadedFilesMap.passport) {
            documentsObj.passport = uploadedFilesMap.passport;
          }
          if (uploadedFilesMap.emiratesId) {
            documentsObj.emiratesId = uploadedFilesMap.emiratesId;
          }
          if (uploadedFilesMap.contract) {
            documentsObj.contract = uploadedFilesMap.contract;
          }

          // Optional document fields - only add if they have values
          if (uploadedFilesMap.secuirtyCheck) {
            documentsObj.secuirtyCheck = uploadedFilesMap.secuirtyCheck;
          }
          if (uploadedFilesMap.other) {
            documentsObj.other = uploadedFilesMap.other;
          }

          reqBody.documents = [documentsObj];

          await createCustomer(reqBody);
        } catch (error) {
          if (
            error instanceof Error &&
            error.message === "Failed to upload one or more files"
          ) {
            toast.error(
              "Failed to upload one or more files. Please try again."
            );
          } else {
            toast.error("Something went wrong!");
          }
        } finally {
          setIsUploading(false);
        }
      }
    },
    [activeStep, totalSteps, createCustomer, uploadAllFiles]
  );

  const prevStep = useCallback(() => {
    setActiveStep((prev) => (prev > 1 ? prev - 1 : prev));
  }, []);
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
        return <Register6 {...register6FormProps} />;
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
        isLoading={isPending || isUploading}
      />
    </section>
  );
};

export default RegisterComponent;

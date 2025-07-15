"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/Heading";
import { Stepper } from "@/components/ui/stepper";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { steps, headings, customerFormField } from "../constant";
import { usePathname, useRouter } from "next/navigation";
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
import { useCreateCustomer, useUpdateCustomer, useVehicleType } from "../hooks";
import { toast } from "sonner";
import { useFileUpload } from "@/hooks/useFileUpload";
import { isFile } from "@/constant";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useProfileInformation } from "@/features/dashboard/hooks/useProfileInformation";
import { getNestedValue } from "@/features/users/constant";
import { useConfirmationDialog } from "@/providers/ConfirmationDialogProvider";

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
  const pathname = usePathname();
  const router = useRouter();
  return (
    <div className="font-primary flex flex-col items-center gap-4 mb-[47px] mt-[70px]">
      {currStep === totalSteps ? (
        <Button
          className="font-primary text-lg bg-transparent text-[#CF5406] shadow-none hover:bg-transparent flex items-center justify-center"
          onClick={nextStep}
        >
          <ChevronRight className="mr-2" size={18} />
          Skip
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
      {currStep === 1 &&
        (pathname === "/re-apply" ? (
          <Button
            onClick={() => router.back()}
            variant={"outline"}
            className="font-primary text-sm bg-transparent text-[#CF5406] shadow-none hover:bg-transparent flex items-center justify-center disabled:opacity-50"
          >
            <Icon icon="lsicon:goto-filled" width="16" height="16" />
            Go back
          </Button>
        ) : (
          <Link href="/login">
            <Button
              variant={"outline"}
              className="font-primary text-sm bg-transparent text-[#CF5406] shadow-none hover:bg-transparent flex items-center justify-center disabled:opacity-50"
            >
              <Icon icon="lsicon:goto-filled" width="16" height="16" />
              Go to Login
            </Button>
          </Link>
        ))}
    </div>
  );
};

const RegisterComponent = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { showConfirmation } = useConfirmationDialog();
  const [activeStep, setActiveStep] = useState(1);
  const [isUploading, setIsUploading] = useState(false);

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

  //get profile data
  const { data: profileInformationData, isLoading: isProfileDataLoading } =
    useProfileInformation();

  const profileDetail = useMemo(
    () => profileInformationData?.data?.data,
    [profileInformationData?.data?.data]
  );

  useEffect(() => {
    if (profileDetail) {
      customerFormField.forEach((field) => {
        const value = getNestedValue(profileDetail, field);
        setValue(field as any, value);
      });

      // Special handling for documents to map URLs properly
      if (profileDetail.documents && profileDetail.documents[0]) {
        const documents = profileDetail.documents[0];
        const mappedDocuments = {
          tradeLicense: documents.tradeLicense || "",
          vatCertificate: documents.vatCertificate || "",
          passport: documents.passport || "",
          emiratesId: documents.emiratesId || "",
          securityCheque: documents.securityCheque || "",
          contract: documents.contract || "",
          other: documents.other || "",
          // Add URL fields for preview
          tradeLicenseUrl: documents.tradeLicenseUrl || "",
          vatCertificateUrl: documents.vatCertificateUrl || "",
          passportUrl: documents.passportUrl || "",
          emiratesIdUrl: documents.emiratesIdUrl || "",
          securityChequeUrl: documents.securityChequeUrl || "",
          contractUrl: documents.contractUrl || "",
          otherUrl: documents.otherUrl || "",
        };
        setValue("documents", [mappedDocuments]);
      }
    }
  }, [profileDetail, setValue]);

  const isUpdateMode = !!profileDetail?.id;

  const filteredSteps = useMemo(() => {
    return isUpdateMode ? steps.filter((step) => step.id !== 7) : steps;
  }, [isUpdateMode]);

  const filteredHeadings = useMemo(() => {
    return isUpdateMode
      ? headings.filter((heading) => heading.id !== 7)
      : headings;
  }, [isUpdateMode]);

  const currHeading = filteredHeadings.find((h) => h.id === activeStep);

  const totalSteps = filteredSteps.length;

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

  const uploadAllFiles = useCallback(
    async (documents: any[] = []): Promise<Record<string, string>> => {
      const doc = documents[0];
      if (!doc) return {};

      const allFields = [
        "tradeLicense",
        "vatCertificate",
        "passport",
        "emiratesId",
        "contract",
        "securityCheque",
        "other",
      ];

      const filesToUpload = allFields
        .filter((field) => doc[field] && isFile(doc[field]))
        .map((field) => ({ file: doc[field], fieldName: field }));

      if (filesToUpload.length === 0) return {};

      const uploadPromises = filesToUpload.map(({ file, fieldName }) =>
        uploadSingleFile(file, fieldName)
      );

      try {
        const results = await Promise.all(uploadPromises);
        return Object.fromEntries(
          results.map(({ fieldName, filePath }) => [fieldName, filePath])
        );
      } catch {
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
      router.push(
        `/success?creditAccountNumber=${data?.data?.data?.creditAccountNumber}`
      );
    },
  });

  const {
    mutateAsync: handleUpdateCustomer,
    isPending: isUpdateCustomerLoading,
  } = useUpdateCustomer({
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Something went wrong!");
    },
    onSuccess: (data) => {
      router.push("/profile");
      toast.success("Details Updated Successfully!!");
    },
  });

  // Update customer handler
  const onUpdate = async (formData: UserPayload) => {
    try {
      // Get the current watched documents to ensure we have the actual File objects
      const currentDocuments = watch("documents");
      const uploadedFilesMap = await uploadAllFiles(currentDocuments);
      const existingDocs = formData.documents?.[0] || {};
      const reqBody = buildRequestBody(
        formData,
        uploadedFilesMap,
        existingDocs
      );

      await handleUpdateCustomer({ id: profileDetail?.id, body: reqBody });
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  // Update confirmation modal
  const handleUpdateModal = (formData: UserPayload) => {
    showConfirmation({
      title: "Update Details?",
      description: "Are you sure you want to update the details?",
      confirmText: "Yes",
      confirmClassName:
        "font-secondary bg-gradient-to-r from-[#E06518] to-[#E3802A] hover:from-[#E06518] hover:to-[#E06518] transition-all duration-300",
      cancelText: "Cancel",
      isDisabled: isUpdateCustomerLoading,
      onConfirm: () => onUpdate(formData),
    });
  };

  const buildRequestBody = (
    formData: UserPayload,
    uploadedFilesMap: Record<string, string>,
    existingDocuments?: Partial<any>
  ): any => {
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
        formData.directorDetails?.map(({ name, email, phone }) => ({
          name,
          email,
          phone,
        })) || [],
      financialDirectorDetails:
        formData.financialDirectorDetails?.map(({ name, email, phone }) => ({
          name,
          email,
          phone,
        })) || [],
      tradeReferenceDetails:
        formData.tradeReferenceDetails?.map(
          ({ referenceName, businessAssociation, phone, email }) => ({
            referenceName,
            businessAssociation,
            phone,
            email,
          })
        ) || [],
      bankDetails: formData.bankDetails?.map((bank) => ({ ...bank })) || [],
    };

    // Optional
    if (formData.employeeSize) reqBody.employeeSize = formData.employeeSize;

    // Products
    const validProducts = formData.products?.filter(
      (p) => p.hsCode?.trim() || p.commodityName?.trim()
    );
    if (validProducts?.length) {
      reqBody.products = validProducts.map(({ hsCode, commodityName }) => ({
        hsCode,
        commodityName,
      }));
    }

    // Shipment
    if (["FTL", "BOTH"].includes(formData.shipmentType)) {
      reqBody.shipmentFtl = {
        noOfTrips: Number(formData.shipmentFtl?.noOfTrips) || 0,
        typeOfEquipments: formData.shipmentFtl?.typeOfEquipments || "",
        serviceNeeded: formData.shipmentFtl?.serviceNeeded || "",
        equipmentCapacity: formData.shipmentFtl?.equipmentCapacity || "",
      };
    }

    if (["LTL", "BOTH"].includes(formData.shipmentType)) {
      reqBody.shipmentLtl = {
        noOfShipmentsPerLane:
          Number(formData.shipmentLtl?.noOfShipmentsPerLane) || 0,
        weightPerShipmentPerLane:
          Number(formData.shipmentLtl?.weightPerShipmentPerLane) || 0,
      };
    }

    // Documents
    const docKeys = [
      "tradeLicense",
      "vatCertificate",
      "passport",
      "emiratesId",
      "contract",
      "securityCheque",
      "other",
    ];

    const documentsObj: Record<string, string> = {};

    for (const key of docKeys) {
      if (uploadedFilesMap[key]) {
        documentsObj[key] = uploadedFilesMap[key];
      } else if (
        existingDocuments?.[key] &&
        typeof existingDocuments[key] === "string"
      ) {
        documentsObj[key] = existingDocuments[key] as string;
      }
    }

    reqBody.documents = [documentsObj];

    return reqBody;
  };

  const nextStep = useCallback(
    async (formData: UserPayload) => {
      const isLastStep = activeStep === totalSteps;
      if (!isLastStep) {
        setActiveStep((prev) => prev + 1);
        return;
      }

      try {
        setIsUploading(true);

        if (profileDetail?.id) {
          handleUpdateModal(formData);
          return;
        }

        // Get the current watched documents to ensure we have the actual File objects
        const currentDocuments = watch("documents");
        const uploadedFilesMap = await uploadAllFiles(currentDocuments);
        const existingDocs = formData.documents?.[0] || {};
        const reqBody = buildRequestBody(
          formData,
          uploadedFilesMap,
          existingDocs
        );

        await createCustomer(reqBody);
      } catch (error) {
      } finally {
        setIsUploading(false);
      }
    },
    [
      activeStep,
      totalSteps,
      profileDetail,
      createCustomer,
      uploadAllFiles,
      watch,
    ]
  );

  const prevStep = useCallback(() => {
    setActiveStep((prev) => (prev > 1 ? prev - 1 : prev));
  }, []);

  const renderStep = () => {
    if (isUpdateMode && activeStep === 7) return null;
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

  return (
    <section className="font-secondary max-w-[1130px] mx-auto h-full flex flex-col items-center pt-[34px] relative">
      {pathname !== "/re-apply" && (
        <Image
          src="/arctern-logo.svg"
          width={142}
          height={81}
          alt="Company Logo"
          className="mb-[22px]"
        />
      )}

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
          <Stepper steps={filteredSteps} currentStep={activeStep} />
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

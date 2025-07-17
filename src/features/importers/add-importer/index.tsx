"use client";
import React, { useEffect, useMemo } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import {
  InformationComponent,
  ShipmentDetailComponent,
  BillingDetailComponent,
} from "./form";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ImporterPayload } from "../types";
import { Resolver, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  importerPayloadSchema,
  updateImporterPayloadSchema,
} from "../validation";
import { toast } from "sonner";
import {
  useCreateImporter,
  useFetchCountries,
  useGetImporterDetails,
  useUpdateImporter,
} from "../hooks";
import { useProfileInformation } from "@/features/dashboard/hooks/useProfileInformation";
import { useConfirmationDialog } from "@/providers/ConfirmationDialogProvider";
import { importerFormField } from "../constant";
import { getNestedValue } from "@/features/users/constant";
import { PageLoader } from "@/components/loaders/page-loader";

const Index = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { showConfirmation } = useConfirmationDialog();

  const id = searchParams.get("id") as string;
  const { data: profileInformationData } = useProfileInformation();

  const { data: getAllCountries } = useFetchCountries();

  const countriesList = useMemo(
    () => getAllCountries?.data?.data?.items,
    [getAllCountries]
  );

  // fetching importer details
  const {
    data: importerDetail,
    isLoading,
    isError,
  } = useGetImporterDetails(id);

  const getImporterDetail = useMemo(
    () => importerDetail?.data?.data,
    [importerDetail]
  );
  const customerId = useMemo(
    () => profileInformationData?.data?.data?.id,
    [profileInformationData]
  );
  const {
    register,
    watch,
    setValue,
    trigger,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ImporterPayload>({
    defaultValues: {
      countryCode: getImporterDetail?.countryCode || "971",
      user: {
        countryCode: getImporterDetail?.user?.countryCode ?? "971",
      },
    },
    resolver: yupResolver(
      id ? updateImporterPayloadSchema : importerPayloadSchema
    ) as Resolver<ImporterPayload>,
  });
  const defaultValues = watch();
  useEffect(() => {
    if (id) {
      importerFormField.forEach((field) => {
        const value = getNestedValue(getImporterDetail, field);
        setValue(field as any, value);
      });

      setValue(
        "countryCode",
        getImporterDetail?.countryCode?.replace(/^\+/, "")
      );
      setValue(
        "user.countryCode",
        getImporterDetail?.user?.countryCode?.replace(/^\+/, "")
      );
    }
  }, [id, getImporterDetail, setValue]);

  const { mutateAsync: handleUpdate, isPending: isUpdateLoading } =
    useUpdateImporter({
      onError: (error) => {
        toast.error(error?.response?.data?.message || "Something went wrong!");
      },
      onSuccess: (data) => {
        router.push("/importers");
        toast.success("Importer Updated Successfully!!");
      },
    });

  const { mutateAsync: createInternalUser, isPending } = useCreateImporter({
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Something went wrong!");
    },
    onSuccess: (data) => {
      toast.success("Importer Successfully Created!!");
      router.push("/importers");
    },
  });

  // Update user handler
  const onUpdate = async (formData: ImporterPayload) => {
    try {
      let reqBody = { ...formData };
      reqBody.user = {
        ...reqBody.user,
        countryCode: `+${reqBody.user.countryCode}`,
      };
      reqBody.countryCode = `+${reqBody.countryCode}`;
      reqBody.customer = {
        id: customerId,
      };
      await handleUpdate({ id, body: reqBody });
    } catch (error) {}
  };

  // Update confirmation modal
  const handleUpdateModal = (formData: ImporterPayload) => {
    showConfirmation({
      title: "Update Importer?",
      description: "Are you sure you want to update the importer details?",
      confirmText: "Yes",
      confirmClassName:
        "font-secondary bg-gradient-to-r from-[#E06518] to-[#E3802A] hover:from-[#E06518] hover:to-[#E06518] transition-all duration-300",
      cancelText: "Cancel",
      isDisabled: isUpdateLoading,
      onConfirm: () => onUpdate(formData),
    });
  };

  // Create importer handler
  const onSubmit = async (formData: ImporterPayload) => {
    let reqBody = { ...formData };
    reqBody.user = {
      ...reqBody.user,
      countryCode: `+${reqBody.user.countryCode}`,
    };
    reqBody.countryCode = `+${reqBody.countryCode}`;
    reqBody.customer = {
      id: customerId,
    };
    try {
      await createInternalUser(reqBody);
    } catch (error) {}
  };

  const createImporterProps = {
    register,
    control,
    setValue,
    watch,
    trigger,
    errors,
    defaultValues,
    isEdit: Boolean(id),
    countriesList,
  };
  if (isLoading) {
    return <PageLoader />;
  }
  return (
    <motion.div
      key="add-customer"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
    >
      <div className="p-4 bg-white rounded-3xl">
        <div
          className="flex items-center gap-4 w-fit cursor-pointer"
          onClick={() => router.back()}
        >
          <Icon
            icon="weui:back-filled"
            width="12"
            height="24"
            className="font-bold"
          />
          <p className="font-primary font-semibold tracking-wide text-lg">
            {`${id ? "Update" : "Add"} Importer`}
          </p>
        </div>
        <InformationComponent {...createImporterProps} />
        <BillingDetailComponent {...createImporterProps} />
        <ShipmentDetailComponent {...createImporterProps} />
        <div className="flex items-center justify-center mt-4">
          <Button
            variant="default"
            className="w-fit px-10 rounded-full hover:bg-[#e06a1bff]"
            onClick={
              id ? handleSubmit(handleUpdateModal) : handleSubmit(onSubmit)
            }
            disabled={isPending || isUpdateLoading}
          >
            {id ? "Update" : "Create"}
            {(isPending || isUpdateLoading) && (
              <div className="flex items-center justify-center">
                <Icon
                  icon="codex:loader"
                  className="text-[30px] animate-spin"
                />
              </div>
            )}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default Index;

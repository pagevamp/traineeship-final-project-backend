"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@/components/ui/button";
import { Resolver, useFieldArray, useForm } from "react-hook-form";
import { AddInventorySchema } from "../validation";
import { ProductVariations, InventoryInformation } from "./form";
import _ from "lodash";
import { useConfirmationDialog } from "@/providers/ConfirmationDialogProvider";
import { INVENTORY_STATUS } from "../constant";
import { isFileList } from "@/constant";
import { useFileUpload } from "@/hooks/useFileUpload";
import { toast } from "sonner";
import {
  useAddInventory,
  useArchiveInventory,
  useCheckSerialNumber,
  useDeleteInventoryAttachment,
  useDeleteInventorySerial,
  useDeleteInventoryVariation,
  useGetInventoryById,
  useUpdateInventory,
} from "../hooks";
import { AnimatedLoader } from "@/components/loaders/animated-loader";
import { useProfileInformation } from "@/features/dashboard/hooks/useProfileInformation";

const Index = ({ id }: { id?: string }) => {
  const router = useRouter();

  const { showConfirmation } = useConfirmationDialog();

  const [imageList, setImageList] = useState<any[]>([]);

  const [deletedSerials, setDeletedSerials] = useState<any>([]);

  const [isEdit, setIsEdit] = useState(true);

  const [editData, setEditData] = useState<any>(null);

  const [toBeDeletedSerial, setToBeDeletedSerial] = useState<any>([]);

  const [toBeDeletedVariation, setToBeDeletedVariation] = useState<any>([]);

  const [toBeDeletedAttachment, setToBeDeletedAttachment] = useState<any>([]);

  const [alreadySavedSerialNumbers, setAlreadySavedSerialNumbers] =
    useState<any>(null);

  const [modalShownForSavedSKU, setModalShownForSavedSKU] = useState(false);

  useEffect(() => {
    if (id) {
      setIsEdit(true);
    } else {
      setIsEdit(false);
    }
  }, [id]);

  const { data: inventoryDetails, isLoading: isInventoryDetailsLoading } =
    useGetInventoryById({ id });

  const inventoryDetailsData = useMemo(() => {
    return inventoryDetails?.data?.data;
  }, [inventoryDetails]);

  const {
    data: profileInformationData,
    isLoading: isLoadingProfileInformation,
  } = useProfileInformation();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    control,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(AddInventorySchema) as Resolver<any>,
  });

  const {
    fields: variations,
    append: varitationAppend,
    remove: varitationRemove,
  } = useFieldArray({
    control,
    name: "productVariations",
  });

  useEffect(() => {
    if (inventoryDetailsData) {
      setEditData(inventoryDetailsData);
      setValue("id", inventoryDetailsData?.id);
      setValue("commodityName", inventoryDetailsData?.commodityName);
      setValue("hsCode", inventoryDetailsData?.hsCode);
      setValue("unitOfMeasure", inventoryDetailsData?.unitOfMeasure?.id);
      setValue("productImage", inventoryDetailsData?.productImageUrl);
      setValue("salesFlyer", inventoryDetailsData?.salesFlyerUrl);
      setValue("longDescription", inventoryDetailsData?.longDescription);
      setValue("shortDescription", inventoryDetailsData?.shortDescription);
      setValue(
        "productVariations",
        inventoryDetailsData?.productVariations?.map((item: any) => ({
          ...item,
          variationId: item.id,
        }))
      );
      setValue("coverImageList", inventoryDetailsData?.coverImageList);
      setValue("status", inventoryDetailsData?.status);

      if (inventoryDetailsData?.coverImageList) {
        setImageList(inventoryDetailsData?.coverImageList);
      }
    }
  }, [inventoryDetailsData, setValue, isEdit]);

  const { mutateAsync: handleAddInventory, isPending: isAddPending } =
    useAddInventory({
      onError: (error, variables, context) => {
        toast.error(error?.response?.data?.message || "Something went wrong");
      },
      onSuccess: (data) => {
        toast.success("Product created successfully.");
        router.push(`/inventory`);
      },
    });

  const { mutateAsync: handleUpdateInventory, isPending: isUpdatePending } =
    useUpdateInventory({
      onError: (error, variables, context) => {
        toast.error(error?.response?.data?.message || "Something went wrong");
      },
      onSuccess: (data) => {
        toast.success("Product updated successfully.");
        router.push(`/inventory`);
      },
    });

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

  // delete variation
  const { mutateAsync: deleteVariation, isPending: isDeleteVariationPending } =
    useDeleteInventoryVariation({
      onError: (error, variables, context) => {
        toast.error(error?.response?.data?.message || "Something went wrong");
      },
      onSuccess: (data) => {},
    });

  // delete serial
  const { mutateAsync: deleteSerial, isPending: isDeleteSerialPending } =
    useDeleteInventorySerial({
      onError: (error, variables, context) => {
        toast.error(error?.response?.data?.message || "Something went wrong");
      },
      onSuccess: (data) => {},
    });

  // delete attachment
  const {
    mutateAsync: deleteAttachment,
    isPending: isDeleteAttachmentPending,
  } = useDeleteInventoryAttachment({
    onError: (error, variables, context) => {
      toast.error(error?.response?.data?.message || "Something went wrong");
    },
    onSuccess: (data) => {},
  });

  const onSubmit = async (status: string) => {
    const formValues = watch();
    const requestObject = _.cloneDeep(formValues);

    requestObject.status = status;

    requestObject.customerId = profileInformationData?.data?.data?.id;

    requestObject.unitOfMeasure = {
      id: requestObject.unitOfMeasure,
    };

    if (
      requestObject.productImage &&
      isFileList(requestObject.productImage) &&
      requestObject.productImage.length > 0
    ) {
      try {
        const productImageFormdata = new FormData();

        productImageFormdata.append("file", requestObject.productImage[0]);

        const results: any = await uploadFile(productImageFormdata);

        requestObject.productImage = results.data.data.filePath;
      } catch (error) {
        console.error(error);
      }
    } else {
      delete requestObject.productImage;
    }
    if (
      requestObject.salesFlyer &&
      isFileList(requestObject.salesFlyer) &&
      requestObject.salesFlyer.length > 0
    ) {
      try {
        const salesFlyerFormdata = new FormData();

        salesFlyerFormdata.append("file", requestObject.salesFlyer[0]);

        const results: any = await uploadFile(salesFlyerFormdata);

        requestObject.salesFlyer = results.data.data.filePath;
      } catch (error) {
        console.error(error);
      }
    } else {
      delete requestObject.salesFlyer;
    }

    let Files: any = [];

    if (imageList && imageList?.length > 0) {
      for (const att of imageList) {
        if (att instanceof File) {
          let documentFormData = new FormData();
          documentFormData.append("file", att);

          try {
            const result = await uploadFile(documentFormData);
            Files.push({ result, documentType: att.type });
          } catch (e) {
            toast.error(
              `Failed to upload ${att?.name} to the server. Please contact adminstration.`
            );
            console.error(e);
          }
        }
      }

      if (Files.length > 0) {
        requestObject.coverImageList = Files.map(
          (response: any, index: any) => ({
            document: response?.result?.data?.data?.filePath,
            documentType: response?.documentType,
          })
        );
      } else {
        delete requestObject.coverImageList;
      }
    } else {
      delete requestObject.coverImageList;
    }

    requestObject.productVariations = requestObject.productVariations.map(
      (item: any) => ({
        ...item,
        price: Number(item.price),
        reOrderPoint: Number(item.reOrderPoint),
        inStock: Number(item.inStock),
        stockKeepingUnit:
          item?.stockKeepingUnit?.length > 0 ? item?.stockKeepingUnit : null,
      })
    );

    if (isEdit) {
      requestObject.id = editData?.id;

      const updatedData = requestObject?.productVariations?.map(
        (variation: any, index: any) => {
          const existingSerialNumbers =
            editData?.productVariations
              ?.find((iV: any) => iV.id == variation.id)
              ?.stockKeepingUnit?.filter((item: any) => {
                return !deletedSerials.includes(item.sku);
              }) || [];

          const newSerialNumbers = variation?.stockKeepingUnit
            ? variation?.stockKeepingUnit?.filter(
                (serialNum: any) =>
                  !existingSerialNumbers?.some(
                    (existingSerial: any) =>
                      existingSerial?.sku == serialNum?.sku
                  )
              )
            : [];

          return {
            ...variation,
            stockKeepingUnit: [...existingSerialNumbers, ...newSerialNumbers],
          };
        }
      );
      requestObject.productVariations = updatedData;

      // delete serial
      if (toBeDeletedSerial.length > 0) {
        try {
          await deleteSerial({
            serialNumbers: toBeDeletedSerial,
          });
        } catch (e) {
          console.error(e);
        }
      }

      // delete variation
      if (toBeDeletedVariation.length > 0) {
        for (const variationId of toBeDeletedVariation) {
          try {
            await deleteVariation({ id: variationId });
          } catch (e) {
            console.error(e);
          }
        }
      }

      // delete attachment
      if (toBeDeletedAttachment.length > 0) {
        try {
          await deleteAttachment({
            imageId: toBeDeletedAttachment,
          });
        } catch (e) {
          console.error(e);
        }
      }

      await handleUpdateInventory(requestObject);
      return;
    }

    await handleAddInventory(requestObject);
  };

  // delete
  const { mutateAsync: archiveInventory, isPending: isArchivePending } =
    useArchiveInventory({
      onError: (error, variables, context) => {
        toast.error(error?.response?.data?.message || "Something went wrong");
      },
      onSuccess: (data) => {
        toast.success("Product Archived Successfully.");
        router.push(`/inventory`);
      },
    });

  const onDelete = async (id: string) => {
    try {
      await archiveInventory({ id });
    } catch (e) {}
  };

  // delete confirmation
  const handleDelete = (row: any) => {
    showConfirmation({
      title: "Archive Confirmation",
      description: "Are you sure you want to archive this product?",
      confirmText: "Yes",
      confirmClassName: "bg-destructive hover:bg-destructive hover:opacity-80",
      cancelText: "Cancel",
      isDisabled: isArchivePending,
      onConfirm: () => {
        onDelete(row?.id);
      },
    });
  };

  // check serial numbers
  const {
    mutateAsync: checkSerialNumber,
    isPending: isCheckSerialNumberPending,
  } = useCheckSerialNumber({
    onError: (error, variables, context) => {
      toast.error(error?.response?.data?.message || "Something went wrong");
    },
    onSuccess: (data) => {
      return data;
    },
  });

  console.log(watch(), "watch");

  const handleCheckSerialNumber = async (type: string) => {
    setModalShownForSavedSKU(false);
    const formValues = watch();
    const ClonedFormObject = _.cloneDeep(formValues);

    const existingSerialNumbersOfCurrentProduct =
      editData?.productVariations
        ?.flatMap((iV: any) =>
          iV?.stockKeepingUnit?.map((item: any) => item?.sku)
        )
        ?.filter((item: any) => !deletedSerials.includes(item)) || [];

    const allSerialNumbers = ClonedFormObject?.productVariations
      ?.flatMap((item: any) =>
        Array.isArray(item?.stockKeepingUnit)
          ? item.stockKeepingUnit.map((serial: any) => serial?.sku)
          : []
      )
      ?.filter(
        (item: any) => !existingSerialNumbersOfCurrentProduct.includes(item)
      );

    const uniqueSerialNumbers = Array.from(new Set(allSerialNumbers));

    try {
      const existingSerialNumbers = await checkSerialNumber({
        serialNumbers: uniqueSerialNumbers,
      });
      if (existingSerialNumbers?.data?.data?.length === 0) {
        onSubmit(type);
        return;
      } else {
        setAlreadySavedSerialNumbers(existingSerialNumbers?.data?.data);
        return;
      }
    } catch (error) {}
  };

  const handleConfirmation = (type: string) => {
    showConfirmation({
      title:
        type === INVENTORY_STATUS.PUBLISHED
          ? "Publish Confirmation"
          : "Save as Draft Confirmation",
      description: `Are you sure you want to ${
        type === INVENTORY_STATUS.PUBLISHED ? "publish" : "Save as Draft"
      } this product?`,
      confirmText: "Yes",
      confirmClassName: "bg-primary hover:bg-primary hover:opacity-80",
      cancelText: "Cancel",
      isDisabled: false,
      onConfirm: () => {
        handleCheckSerialNumber(type);
      },
    });
  };

  const inventoryProps = {
    control,
    setValue,
    errors,
    register,
    trigger,
    watch,
    setImageList,
    imageList,
    customerId: profileInformationData?.data?.data?.user?.id,
    isEdit,
    editData,
    setToBeDeletedAttachment,
    setToBeDeletedSerial,
    setToBeDeletedVariation,
  };

  const productVariationsProps = {
    ...inventoryProps,
    variations,
    varitationAppend,
    varitationRemove,
    deletedSerials,
    setDeletedSerials,
    alreadySavedSerialNumbers,
    setAlreadySavedSerialNumbers,
    setModalShownForSavedSKU,
    modalShownForSavedSKU,
  };

  if (isEdit && (isInventoryDetailsLoading || !editData || !editData?.id))
    return (
      <div className="flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );

  return (
    <motion.div
      key="add-inventory"
      initial={{ y: 0, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.2, delay: 0.1, ease: "easeOut" }}
      className=""
    >
      {(isFileUploading ||
        isAddPending ||
        isUpdatePending ||
        isArchivePending ||
        isDeleteVariationPending ||
        isDeleteSerialPending ||
        isDeleteAttachmentPending) && (
        <div className="fixed inset-0 w-screen h-screen bg-black/50 z-[1000] overflow-hidden">
          <div className="flex items-center justify-center h-full">
            <AnimatedLoader variant={"truck"} size="sm" />
          </div>
        </div>
      )}
      <div className="rounded-3xl">
        <div className="flex items-center justify-between mb-4">
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
              {editData?.id ? "Edit" : "Add"} Product
            </p>
          </div>
          <div className="flex items-center justify-center gap-4">
            {editData?.id && (
              <Button
                variant="default"
                className="w-fit px-10 rounded-full bg-red-600 hover:opacity-80 hover:bg-red-600"
                onClick={() => handleDelete(editData)}
              >
                Delete
              </Button>
            )}
            <Button
              variant="outline"
              className="w-fit px-6 rounded-full border-none"
              onClick={handleSubmit(() =>
                handleConfirmation(INVENTORY_STATUS.UNPUBLISHED)
              )}
            >
              Save as Draft
            </Button>
            <Button
              variant="default"
              className="w-fit px-10 rounded-full hover:opacity-80 hover:bg-primary"
              onClick={handleSubmit(() =>
                handleConfirmation(INVENTORY_STATUS.PUBLISHED)
              )}
            >
              Publish
            </Button>
          </div>
        </div>

        <div className="bg-white p-4 rounded-3xl">
          <InventoryInformation {...inventoryProps} />
          <ProductVariations {...productVariationsProps} />
        </div>
      </div>
    </motion.div>
  );
};

export default Index;

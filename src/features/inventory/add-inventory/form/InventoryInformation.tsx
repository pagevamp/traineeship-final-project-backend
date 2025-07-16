"use client";

import React, { useEffect, useMemo, useState } from "react";
import { ImageIcon, PlusCircle, Upload } from "lucide-react";
import { Selectbox } from "@/components/ui/select-box";
import { Input } from "@/components/ui/input";
import { Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import RichTextEditor from "@/components/richTextEditor/RichTextEditor";
import { Icon } from "@iconify/react/dist/iconify.js";
import { isFile, isFileList } from "@/constant";
import Image from "next/image";
import { useGetAllUnitOfMeasure } from "../../hooks";
import { useProfileInformation } from "@/features/dashboard/hooks/useProfileInformation";
import { divide } from "lodash";
import Link from "next/link";

const InventoryInformation = (props: any) => {
  const {
    control,
    setValue,
    content,
    setContent,
    errors,
    register,
    trigger,
    watch,
    setImageList,
    imageList,
    customerId,
    isEdit,
    editData,
    setToBeDeletedAttachment,
  } = props;

  // get unit of measure

  const { data: unitOfMeasure, isLoading: isLoadingUnitOfMeasure } =
    useGetAllUnitOfMeasure({
      createdById: customerId,
      limit: 100,
      offset: 0,
      sortBy: "id",
      order: "DESC",
    });

  const unitOfMeasureOptions = useMemo(() => {
    return unitOfMeasure?.data?.data?.items?.map((item: any) => ({
      label: item?.unitOfMeasure,
      value: item?.id,
    }));
  }, [unitOfMeasure?.data?.data?.items]);

  const [longDescription, setLongDescription] = useState(
    editData?.longDescription || ""
  );
  const [shortDescription, setShortDescription] = useState(
    editData?.shortDescription || ""
  );

  useEffect(() => {
    if (isEdit && editData) {
      setLongDescription(editData?.longDescription || null);
      setShortDescription(editData?.shortDescription || null);
    }
  }, [editData, isEdit]);

  const handleEditorChange = (type: string, value: string) => {
    if (type === "shortDescription") {
      setShortDescription(value);
      setValue("shortDescription", value, { shouldValidate: true });
    }
    if (type === "longDescription") {
      setLongDescription(value);
      setValue("longDescription", value, { shouldValidate: true });
    }
  };

  const salesFlyer = watch("salesFlyer");
  const productImage = watch("productImage");

  const [fileBlob, setFileBlob] = useState<Blob | null>(null);

  const openPDFInNewTab = () => {
    if (fileBlob) {
      const blobUrl = URL.createObjectURL(fileBlob);
      window.open(blobUrl, "_blank");
    }
  };

  const ImageArray: any = [];

  if (imageList && imageList?.length !== 0) {
    for (let i = 0; i < imageList?.length; i++) {
      ImageArray.push(imageList?.[i]);
    }
  }

  const handleAttachmentFile = (e: any, name: string) => {
    const filesToAdd = Array.from(e.target.files || []);

    setImageList((prevState: any) => {
      const currentFiles = prevState ?? []; // Default to empty array if undefined

      if (filesToAdd.length === 0) {
        // No new files selected
        setValue(name, currentFiles, { shouldValidate: true });
        return { ...prevState };
      }

      const newFiles = filesToAdd.filter((fileToAdd: any) => {
        return !currentFiles.some(
          (currentFile: any) =>
            currentFile?.name === fileToAdd.name &&
            currentFile?.size === fileToAdd.size
        );
      });

      const addedFiles = [...currentFiles, ...newFiles];

      setValue(name, addedFiles, { shouldValidate: true });

      return addedFiles;
    });
  };

  const removeattachmentFile = (index: number, name: string) => {
    setImageList((prevState: any) => {
      const updatedFiles = [...prevState];
      updatedFiles.splice(index, 1);

      setValue(name, updatedFiles, { shouldValidate: true });

      return updatedFiles;
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Column - Basic Information */}
      <div className="lg:col-span-1">
        <h2 className="text-base font-secondary font-semibold mb-6">
          Information
        </h2>
        <div className="space-y-4">
          <Input
            labelName="Product name"
            placeholder="Enter Product Name"
            register={register}
            trigger={trigger}
            className="bg-white"
            type="text"
            name={"commodityName"}
            maxLength={50}
            required
            error={errors?.commodityName?.message}
          />
          <div>
            <Controller
              name="unitOfMeasure"
              control={control}
              render={({ field, fieldState: { error } }) => {
                return (
                  <div>
                    <Selectbox
                      options={unitOfMeasureOptions}
                      value={field.value}
                      onChange={(value) => {
                        setValue("unitOfMeasure", value?.value, {
                          shouldValidate: true,
                        });
                      }}
                      placeholder="Select Unit of measures"
                      emptyText="No data found."
                      className="w-full bg-transparent h-12"
                      label="Unit of measures"
                      loading={isLoadingUnitOfMeasure}
                      error={error?.message}
                    />
                    {error && (
                      <p className="mt-1 text-xs text-destructive flex items-center gap-1">
                        <Icon
                          icon="solar:close-square-bold"
                          width="16"
                          height="16"
                          className="text-destructive"
                        />
                        <span className="mt-0">{error.message}</span>
                      </p>
                    )}
                  </div>
                );
              }}
            />
          </div>
          <Input
            labelName="HS Code"
            placeholder="Enter HS Code"
            className="bg-white"
            type="text"
            name={"hsCode"}
            maxLength={50}
            required
            register={register}
            trigger={trigger}
            error={errors?.hsCode?.message}
          />
        </div>
      </div>

      {/* Middle Column - Descriptions */}
      <div className="lg:col-span-1">
        <div className="space-y-6">
          <div>
            <label className="block mb-2 text-base font-semibold font-secondary">
              Product Short Description <span className="text-red-600">*</span>
            </label>
            <div
              className={cn(
                "border rounded-sm break-all max-h-[60vh] overflow-auto",
                errors?.shortDescription?.message && "border-destructive"
              )}
            >
              <RichTextEditor
                content={shortDescription}
                onChange={(value) =>
                  handleEditorChange("shortDescription", value)
                }
              />
            </div>
            {errors?.shortDescription?.message && (
              <p className="text-xs text-destructive flex items-center gap-1 mt-1">
                <div className="w-fit">
                  <Icon
                    icon="solar:close-square-bold"
                    width="14"
                    height="14"
                    className="text-destructive"
                  />
                </div>
                <span className="font-secondary font-[300]">
                  {errors?.shortDescription?.message}
                </span>
              </p>
            )}
          </div>

          <div>
            <label className="block mb-2 text-base font-semibold font-secondary">
              Product Long Description <span className="text-red-600">*</span>
            </label>
            <div
              className={cn(
                "border rounded-sm break-all max-h-[60vh] overflow-auto",
                errors?.longDescription?.message && "border-destructive"
              )}
            >
              <RichTextEditor
                content={longDescription}
                onChange={(value) =>
                  handleEditorChange("longDescription", value)
                }
              />
            </div>
            {errors?.longDescription?.message && (
              <p className="text-xs text-destructive flex items-center gap-1 mt-1">
                <div className="w-fit">
                  <Icon
                    icon="solar:close-square-bold"
                    width="14"
                    height="14"
                    className="text-destructive"
                  />
                </div>
                <span className="font-secondary font-[300]">
                  {errors?.longDescription?.message}
                </span>
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Right Column - Images */}
      <div className="lg:col-span-1">
        <div>
          <div className="flex items-center justify-between flex-wrap mb-4">
            <label className="block text-base font-semibold font-secondary">
              Cover Image <span className="text-red-600">*</span>
            </label>

            <input
              style={{ display: "none" }}
              id="contained-button-file-flyer"
              type="file"
              disabled={
                salesFlyer && salesFlyer?.length > 0 && isFileList(salesFlyer)
              }
              accept=".pdf"
              onChange={(e: any) => {
                setValue("salesFlyer", e.target.files, {
                  shouldValidate: true,
                });

                const file = e.target.files[0];
                if (file) {
                  setFileBlob(file);
                } else {
                  setFileBlob(null);
                }
              }}
              className="h-full w-full"
            />
            <div title="Sales Flyer" className="relative">
              {!salesFlyer && (
                <Button
                  variant="outline"
                  className="gap-2"
                  onClick={() => {
                    const fileInput = document.getElementById(
                      "contained-button-file-flyer"
                    );
                    if (fileInput) {
                      fileInput.click();
                    }
                  }}
                >
                  <PlusCircle className="h-4 w-4" />
                  Sales Flyer
                </Button>
              )}
              {salesFlyer && !isFileList(salesFlyer) ? (
                <div className="absolute w-[40px] right-0 -top-5 cursor-pointer">
                  <Link href={`${salesFlyer}`} target="__blank">
                    <Icon
                      icon="material-icon-theme:pdf"
                      width="40"
                      height="40"
                    />
                  </Link>
                </div>
              ) : (
                salesFlyer &&
                salesFlyer?.length > 0 &&
                isFileList(salesFlyer) &&
                fileBlob && (
                  <div
                    className="absolute w-[40px] right-0 -top-5 cursor-pointer"
                    onClick={openPDFInNewTab}
                  >
                    <Icon
                      icon="material-icon-theme:pdf"
                      width="40"
                      height="40"
                    />
                  </div>
                )
              )}
              {salesFlyer && salesFlyer?.length > 0 && (
                <div
                  className="absolute right-0 -top-6 border  z-10 cursor-pointer bg-white rounded-full"
                  onClick={() => {
                    setFileBlob(null);
                    setValue("salesFlyer", null, {
                      shouldValidate: true,
                    });
                    const fileInput = document.getElementById(
                      "contained-button-file-flyer"
                    ) as HTMLInputElement;
                    if (fileInput) {
                      fileInput.value = ""; // Clear the file input
                    }
                  }}
                >
                  <Icon
                    icon="zondicons:close-solid"
                    width="16"
                    height="16"
                    color="#ff0000"
                  />
                </div>
              )}
            </div>
          </div>

          {errors?.salesFlyer?.message && (
            <p className="text-xs text-destructive flex items-center gap-1 mb-1">
              <div className="w-fit">
                <Icon
                  icon="solar:close-square-bold"
                  width="14"
                  height="14"
                  className="text-destructive"
                />
              </div>
              <span className="font-secondary font-[300]">
                {errors?.salesFlyer?.message}
              </span>
            </p>
          )}

          <input
            style={{ display: "none" }}
            id="contained-button-file-cover"
            type="file"
            accept=".jpg,.jpeg,.png"
            {...register("productImage")}
            onChange={(e) => {
              // Call RHF's onChange manually
              register("productImage").onChange(e);

              // Then trigger validation
              trigger("productImage");
            }}
            className="h-full w-full"
          />

          <div className="relative">
            {productImage &&
              isFileList(productImage) &&
              productImage?.length > 0 && (
                <div
                  className="absolute -right-1 -top-2 border z-30 cursor-pointer bg-white rounded-full"
                  onClick={() => {
                    setValue("productImage", null, {
                      shouldValidate: true,
                    });
                    const fileInput = document.getElementById(
                      "contained-button-file-cover"
                    ) as HTMLInputElement;
                    if (fileInput) {
                      fileInput.value = ""; // Clear the file input
                    }
                  }}
                >
                  <Icon
                    icon="zondicons:close-solid"
                    width="20"
                    height="20"
                    color="#ff0000"
                  />
                </div>
              )}

            <label htmlFor="contained-button-file-cover">
              <div
                className={cn(
                  "border-2 border-dashed rounded-md flex flex-col items-center border-gray-200 justify-center p-6 transition-colors relative overflow-hidden w-full h-64 cursor-pointer",
                  errors?.productImage?.message && "border-destructive"
                )}
              >
                {(!productImage ||
                  (isFileList(productImage) && productImage?.length === 0)) && (
                  <div className="flex flex-col items-center justify-center gap-2">
                    <div className="rounded-full  p-3">
                      <ImageIcon className="h-6 w-6 text-gray-500" />
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <p className="text-sm font-medium font-primary">
                        {"Upload Image"}
                      </p>

                      <p className="text-xs text-gray-500 font-secondary font-[300]">
                        {"Upload a cover image for your product."}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 rounded-md bg-primary hover:opacity-80 px-3 py-1.5 text-xs font-medium text-primary-foreground">
                      <Upload className="h-3 w-3" />
                      <span>Upload</span>
                    </div>
                  </div>
                )}
                {productImage && !isFileList(productImage) ? (
                  <div className="absolute inset-0 w-full rounded-[12px]">
                    <div className="w-full aspect-square relative overflow-hidden">
                      <Image
                        src={productImage}
                        alt="Selected Image"
                        fill
                        className="object-cover object-center"
                        unoptimized
                      />
                    </div>
                  </div>
                ) : (
                  productImage &&
                  isFileList(productImage) &&
                  productImage?.[0]?.type?.includes("image/") && (
                    <div className="absolute inset-0 w-full rounded-[12px]">
                      <div className="w-full aspect-square relative overflow-hidden">
                        <Image
                          src={URL.createObjectURL(productImage?.[0])}
                          alt="Selected Image"
                          fill
                          className="object-cover object-center"
                          unoptimized
                        />
                      </div>
                    </div>
                  )
                )}
              </div>
            </label>
          </div>

          {errors?.productImage?.message && (
            <p className="text-xs text-destructive flex items-center gap-1 mt-1">
              <div className="w-fit">
                <Icon
                  icon="solar:close-square-bold"
                  width="14"
                  height="14"
                  className="text-destructive"
                />
              </div>
              <span className="font-secondary font-[300]">
                {errors?.productImage?.message}
              </span>
            </p>
          )}
          <div>
            <input
              {...register("coverImageList")}
              style={{ display: "none" }}
              id="contained-button-additional-images"
              type="file"
              className="h-full w-full"
              multiple
              accept=".jpg,.jpeg,.png"
              onChange={(e) => handleAttachmentFile(e, "coverImageList")}
            />
            {ImageArray && ImageArray.length === 0 && (
              <label htmlFor="contained-button-additional-images">
                <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center group mt-4 cursor-pointer">
                  <div className="flex flex-col items-center justify-center gap-2 group-hover:opacity-80">
                    <Upload className="h-10 w-10 text-gray-400" />
                    <p className="text-sm text-gray-500">Upload More Images</p>
                  </div>
                </div>
              </label>
            )}
            <div className="w-auto lg:w-full grid grid-cols-3 items-center gap-3 flex-wrap mt-4">
              {ImageArray &&
                ImageArray.length !== 0 &&
                ImageArray?.map((image: any, imgIdx: any) => {
                  return (
                    <div
                      key={imgIdx}
                      className="w-full aspect-square border border-dashed border-[#848484] rounded-xl flex justify-center items-center relative"
                    >
                      {image &&
                      !isFileList(image) &&
                      !image?.type?.includes("image/") ? (
                        <div className="w-full aspect-square relative overflow-hidden">
                          <Image
                            src={image?.documentUrl}
                            alt={`cover image ${imgIdx + 1}`}
                            fill
                            className="object-cover object-center rounded-xl"
                          />
                        </div>
                      ) : (
                        image &&
                        image?.type?.includes("image/") && (
                          <div className="w-full aspect-square relative overflow-hidden">
                            <Image
                              src={URL.createObjectURL(image)}
                              alt={`cover image ${imgIdx + 1}`}
                              fill
                              className="object-cover object-center rounded-xl"
                            />
                          </div>
                        )
                      )}
                      <div
                        className="absolute -top-2 bg-white z-10 -right-[6px] rounded-full items-center flex justify-center cursor-pointer"
                        onClick={() => {
                          if (isFile(image)) {
                            removeattachmentFile(imgIdx, "coverImageList");
                          } else if (!isFile(image) && image?.id) {
                            setToBeDeletedAttachment((prev: any) => [
                              ...prev,
                              image?.id,
                            ]);
                            removeattachmentFile(imgIdx, "coverImageList");
                          }
                        }}
                      >
                        <Icon
                          icon="zondicons:close-solid"
                          width="20"
                          height="20"
                          color="#ff0000"
                        />
                      </div>
                    </div>
                  );
                })}
              {ImageArray.length !== 0 &&
                ImageArray &&
                ImageArray?.length < 4 && (
                  <label htmlFor="contained-button-additional-images">
                    <div className="w-fit h-full cursor-pointer">
                      <div className="p-2 flex justify-center items-center border-primary-color text-primary-color bg-white rounded-[8px] border border-dashed ">
                        <Icon
                          icon="material-symbols:add"
                          width="24"
                          height="24"
                        />
                      </div>
                    </div>
                  </label>
                )}
            </div>
            {errors?.coverImageList?.message && (
              <p className="text-xs text-destructive flex items-center gap-1 mt-1">
                <div className="w-fit">
                  <Icon
                    icon="solar:close-square-bold"
                    width="14"
                    height="14"
                    className="text-destructive"
                  />
                </div>
                <span className="font-secondary font-[300]">
                  {errors?.coverImageList?.message}
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryInformation;

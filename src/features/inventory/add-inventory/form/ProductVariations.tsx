"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, Upload, BarChart3, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Tooltip } from "antd";
import * as XLSX from "xlsx";
import { useModal } from "@/hooks/useModal";
import ViewSerialNumberTable from "./ViewSerialNumberTable";
import SerialNumberAddPopup from "./ManualInput";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Controller } from "react-hook-form";
import { useConfirmationDialog } from "@/providers/ConfirmationDialogProvider";
import AlreadySavedSerialNumbersModal from "./AlreadySavedSerialNumbersModal";

export default function ProductVariations(props: any) {
  const {
    control,
    setValue,
    errors,
    register,
    trigger,
    watch,
    variations,
    varitationAppend,
    varitationRemove,
    editData,
    isEdit,
    deletedSerials,
    setDeletedSerials,
    setToBeDeletedSerial,
    setToBeDeletedVariation,
    alreadySavedSerialNumbers,
    setAlreadySavedSerialNumbers,
    setModalShownForSavedSKU,
    modalShownForSavedSKU,
  } = props;

  const defaultValues = watch();

  const { showConfirmation } = useConfirmationDialog();

  const { openModal } = useModal();

  // setting the existing serial numbers and expiry dates
  const [existingSerialNumbers, setExistingSerialNumbers] = useState(
    editData
      ? editData?.productVariations?.map((iVL: any) =>
          iVL?.stockKeepingUnit?.map((sN: any) => sN.sku)
        )
      : []
  );
  const [existingExpiryDate, setExistingExpirayDate] = useState(
    editData
      ? editData?.productVariations?.map((iVL: any) =>
          iVL?.stockKeepingUnit?.map((sN: any) => sN.expiryDate)
        )
      : []
  );

  // setting the duplicate serial numbers
  const [duplicateSerialNumber, setDuplicateSerialNumber] = useState<any>([]);
  const [showDuplicateSerialNumber, setShowDuplicateSerialNumber] =
    useState<any>(false);

  // setting the serial numbers
  const [allSerialNumbers, setAllSerialNumbers] = useState<any>(
    isEdit ? existingSerialNumbers?.flat() : []
  );
  const [lists, setLists] = useState<any[]>(
    isEdit ? existingSerialNumbers : []
  );

  // setting the expiration dates
  const [expirationDates, setExpirationDates] = useState<any>(
    isEdit ? existingExpiryDate : []
  );

  // updating allSerialNumbers when the lists change
  useEffect(() => {
    const extractedArrays = Object.values(lists)
      .filter(Array.isArray)
      .reduce((acc, arr) => acc.concat(arr), []);
    setAllSerialNumbers(extractedArrays);
  }, [lists]);

  // handling bulk upload
  const handleFileChange = (event: any, index: any) => {
    const file = event.target.files[0];

    if (!file) {
      return;
    }
    let newAllSerialNumbers: any = allSerialNumbers ?? [];

    const reader = new FileReader();

    reader.onload = (e: any) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      const jsonData: any[] = [];

      XLSX.utils.sheet_to_json(sheet, { header: 1 }).forEach((row: any) => {
        if (!row.every((cell: any) => cell === null || cell === "")) {
          const newRow: any[] = [];
          let cellIndex = 0; // Track the index of the current cell in the row

          row.forEach((cell: any) => {
            // Check if the cell value is a number only for the second cell in the row
            if (cellIndex === 1 && typeof cell === "number" && !isNaN(cell)) {
              const excelEpoch = new Date(Date.UTC(1899, 11, 30)); // December 30, 1899 in UTC
              const millisecondsPerDay = 24 * 60 * 60 * 1000; // Milliseconds in a day
              const millisecondsOffset = cell * millisecondsPerDay;
              const jsDate = new Date(
                excelEpoch.getTime() + millisecondsOffset
              ).toISOString();

              newRow.push(jsDate);
            } else {
              newRow.push(cell);
            }
            cellIndex++; // Increment the cell index
          });
          jsonData.push(newRow);
        }
      });

      jsonData.shift();
      const serialNums: any = [];
      const expDates: any = [];

      jsonData.forEach((item: any) => {
        const serialNum = `${item[0]}`;

        if (!newAllSerialNumbers.map(String).includes(serialNum)) {
          if (!serialNums.map(String).includes(serialNum)) {
            serialNums.push(serialNum);
            setAllSerialNumbers((prevA: any) => [...prevA, serialNum]);
            const dateString = item[1];
            let date = null;
            if (dateString) {
              date =
                dateString instanceof Date
                  ? dateString
                  : dateString?.split("T")?.[0];
            }
            expDates.push(date); // Parsing date here
          } else {
            setDuplicateSerialNumber((prev: any) => [...prev, serialNum]);
            // toast.warning(`Duplicate serial number ${serialNum}`)
          }
        } else {
          setDuplicateSerialNumber((prev: any) => [...prev, serialNum]);
          // toast.warning(`Duplicate serial number ${serialNum}`)
        }
      });

      setLists((prevLists) => {
        let previousList: any = [];

        if (prevLists?.[index]?.length > 0) {
          previousList = prevLists?.[index];
        }

        return {
          ...prevLists,
          [index]: [...previousList, ...serialNums],
        };
      });
      setExpirationDates((prev: any) => {
        let previousList: any = [];

        if (prev?.[index]?.length > 0) {
          previousList = prev?.[index];
        }
        return {
          ...prev,
          [index]: [...previousList, ...expDates],
        };
      });
    };

    reader.readAsArrayBuffer(file);

    // Get the file input element by its id
    var fileInput: any = document.getElementById(`excel-file-input-${index}`);

    // Reset the file input's value
    fileInput.value = "";
  };

  // setting the serial numbers and expiry dates to the form
  useEffect(() => {
    Object.keys(lists).forEach((key: any, index) => {
      const list = lists[key];
      const expiryList = expirationDates?.[key] ?? [];
      const listmap = list.map((serialNumber: any, index: any) => {
        const expiryDate = expiryList?.[index];
        const variationData = {
          sku: serialNumber,
          expiryDate: expiryDate,
        };
        return variationData;
      });
      setValue(`productVariations.${key}.stockKeepingUnit`, listmap, {
        shouldValidate: true,
      });
      // setValue(`productVariations.${key}.inStock`, listmap?.length, {
      //   shouldValidate: true,
      // });
    });
  }, [lists, expirationDates, setValue]);

  // handling after certain operations in the view serial number table
  const handleCloseFilter = (index: number, sn: any) => {
    setLists((prevData) => {
      const newData = { ...prevData };
      newData[index] = newData[index]?.filter((item: any) => item !== sn);
      // setValue(
      //   `productVariations.${index}.inStock`,
      //   newData[index]?.length ?? 0
      // );

      return newData;
    });
    setExpirationDates((prevData: any) => {
      const newData = { ...prevData };
      const snIndex = lists[index]?.indexOf(sn);

      if (snIndex !== -1) {
        newData[index] = [...newData[index]]; // Create a copy to avoid mutating the original array
        newData[index].splice(snIndex, 1); // Remove the expiration date at that index
      }
      return newData;
    });
    setDeletedSerials((prev: []) => [...prev, sn]);
    setAllSerialNumbers(allSerialNumbers?.filter((item: any) => item !== sn));
    setExistingSerialNumbers((prev: any) => {
      const newData = [...prev];
      newData[index] = newData[index]?.filter((item: string) => item !== sn);
      return newData;
    });
  };

  const viewSerialNumbersHandler = (
    index: number,
    inventoryVariationId: any,
    size: string
  ) => {
    openModal({
      component: ViewSerialNumberTable,
      props: {
        data: null,
        size,
        inventoryVariationId,
        serialNumbers: lists[index],
        allSerialNumbers:
          defaultValues?.inventoryVariationList?.[index]?.serialNumbers,
        expiry: expirationDates[index],
        existingSerialNumbers: existingSerialNumbers,
        listIndex: index,
        handleCloseFilter: handleCloseFilter,
        setToBeDeletedSerial,
        editData,
      },
      className: "max-w-[844px] rounded-2xl",
    });
  };

  const addSerialNumberManual = (index: number) => {
    openModal({
      component: SerialNumberAddPopup,
      props: {
        data: null,
        index,
        serialNumbers: allSerialNumbers,
        setExpirationDates,
        setLists,
        setAllSerialNumbers,
      },
      className: "max-w-[700px] rounded-2xl",
    });
  };

  const addSerialNumberBulk = (id: string) => {
    const fileInput = document.getElementById(`${id}`);
    if (fileInput) {
      fileInput.click();
    }
  };

  const purchaseOrderSelectionPopup = (
    type: string,
    index: number,
    elementId?: any,
    variationId?: string
  ) => {
    if (type == "MANUAL") {
      addSerialNumberManual(index);
    } else {
      if (elementId) {
        addSerialNumberBulk(elementId);
      }
    }
  };

  function reindexedList() {
    // Reindex the lists object
    const reindexedLists: any = {};
    Object.keys(lists).forEach((key: any, idx: any) => {
      reindexedLists[idx] = lists[key];
    });
    setLists(reindexedLists);
  }

  const removeVariationHandler = (id: any, index: any, exists: any) => {
    showConfirmation({
      title: "Delete Variation",
      description: "Are you sure you want to delete this variation?",
      confirmText: "Yes",
      confirmClassName: "bg-destructive hover:bg-destructive hover:opacity-80",
      cancelText: "Cancel",
      isDisabled: false,
      onConfirm: () => {
        if (exists) {
          setToBeDeletedVariation((prev: any) => [...prev, id]);
        }
        props?.varitationRemove(index);
        delete lists?.[index];
        reindexedList();
      },
    });
  };

  // handle duplicate serial numbers

  const handleRemoveDuplicateSerialNumbers = (index: number, sn: any) => {
    setLists((prevData) => {
      const newData = { ...prevData };
      newData[index] = newData[index]?.filter((item: any) => item !== sn);
      // setValue(
      //   `productVariations.${index}.inStock`,
      //   newData[index]?.length ?? 0
      // );

      return newData;
    });
    setExpirationDates((prevData: any) => {
      const newData = { ...prevData };
      const snIndex = lists[index]?.indexOf(sn);

      if (snIndex !== -1) {
        newData[index] = [...newData[index]]; // Create a copy to avoid mutating the original array
        newData[index].splice(snIndex, 1); // Remove the expiration date at that index
      }
      return newData;
    });
    setAllSerialNumbers(allSerialNumbers?.filter((item: any) => item !== sn));
  };

  const handleDuplicateSerialNumbers = (data: any) => {
    for (const item of data) {
      handleRemoveDuplicateSerialNumbers(item.index, item.serial);
    }
  };

  useEffect(() => {
    if (
      alreadySavedSerialNumbers &&
      alreadySavedSerialNumbers.length > 0 &&
      !modalShownForSavedSKU
    ) {
      setModalShownForSavedSKU(true);
      openModal({
        component: AlreadySavedSerialNumbersModal,
        props: {
          data: alreadySavedSerialNumbers,
          defaultValues: watch(),
          handleDuplicateSerialNumbers,
          setModalShownForSavedSKU,
          setAlreadySavedSerialNumbers,
        },
        className: "max-w-[600px] rounded-2xl",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    alreadySavedSerialNumbers,
    modalShownForSavedSKU,
    openModal,
    setModalShownForSavedSKU,
    watch,
  ]);
  return (
    <div className="w-full pt-4">
      <h2 className="text-base font-secondary font-semibold mb-2">
        Variations
      </h2>
      <div className="space-y-4">
        {/* Responsive Table */}

        <div className="overflow-x-auto !overflow-y-hidden  bg-white font-gotham">
          <div className="">
            <table className="xs:w-[150vw] lg:w-full !text-sm text-left bg-white overflow-x-auto table-auto ">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="text-left p-4 font-medium text-sm text-gray-700 w-[15%]">
                    Size
                  </th>
                  <th className="text-left p-4 font-medium text-sm text-gray-700 w-[12%]">
                    Price
                  </th>
                  <th className="text-left p-4 font-medium text-sm text-gray-700 w-[12%]">
                    In Stock
                  </th>
                  <th className="text-left p-4 font-medium text-sm text-gray-700 w-[15%]">
                    Re-order Point
                  </th>
                  <th className="text-left p-4 font-medium text-sm text-gray-700 w-[25%]">
                    Upload Type
                  </th>
                  {/* <th className="text-left p-4 font-medium text-sm text-gray-700 w-[10%]">
                    Preview
                  </th> */}
                  <th className="text-left p-4 font-medium text-sm text-gray-700 w-[11%]">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="font-gotham overflow-x-auto font-medium">
                {variations?.length === 0 && (
                  <tr className="text-left divide-y divide-[#EFE6E6]">
                    <td>
                      <Tooltip
                        title={
                          errors?.productVariations?.[0]?.productSizeName ? (
                            <div className="w-full text-[14px]">
                              {
                                errors?.productVariations?.[0]?.productSizeName
                                  ?.message
                              }
                            </div>
                          ) : null
                        }
                        arrow
                        placement="bottom"
                      >
                        <div
                          className={cn("", {
                            "border border-red-500 rounded-[3px]":
                              errors?.productVariations?.[0]?.productSizeName,
                          })}
                        >
                          <Input
                            placeholder="Add product size"
                            name="productVariations.0.productSizeName"
                            register={register}
                            trigger={trigger}
                            className="border-0 bg-transparent h-9"
                          />
                        </div>
                      </Tooltip>
                    </td>
                    <td>
                      <Tooltip
                        title={
                          errors?.productVariations?.[0]?.price ? (
                            <div className="w-full text-[14px]">
                              {errors?.productVariations?.[0]?.price?.message}
                            </div>
                          ) : null
                        }
                        arrow
                        placement="bottom"
                      >
                        <div
                          className={cn("", {
                            "border border-red-500 rounded-[3px] ":
                              errors?.productVariations?.[0]?.price,
                          })}
                        >
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                              $
                            </span>
                            <Input
                              placeholder="0.00"
                              type="number"
                              step="0.01"
                              name={`productVariations.0.price`}
                              register={register}
                              trigger={trigger}
                              className="border-0 bg-transparent h-9 pl-7"
                            />
                          </div>
                        </div>
                      </Tooltip>
                    </td>

                    <td className="max-w-[50px]">
                      <Tooltip
                        title={
                          errors?.productVariations?.[0]?.inStock ? (
                            <div className="w-full text-[14px]">
                              {errors?.productVariations?.[0]?.inStock?.message}
                            </div>
                          ) : null
                        }
                        arrow
                        placement="bottom"
                      >
                        <div
                          className={cn("", {
                            "border border-red-500 rounded-[3px]":
                              errors?.productVariations?.[0]?.inStock,
                          })}
                        >
                          <Input
                            placeholder="0"
                            type="number"
                            name="productVariations.0.inStock"
                            register={register}
                            trigger={trigger}
                            className="border-0 bg-transparent h-9"
                          />
                        </div>
                      </Tooltip>
                    </td>
                    <td className="min-w-[100px] max-w-[100px]">
                      <Tooltip
                        title={
                          errors?.productVariations?.[0]?.reOrderPoint ? (
                            <div className="w-full text-[14px]">
                              {
                                errors?.productVariations?.[0]?.reOrderPoint
                                  ?.message
                              }
                            </div>
                          ) : null
                        }
                        arrow
                        placement="top"
                      >
                        <div
                          className={cn("", {
                            "border border-red-500 rounded-[3px]":
                              errors?.productVariations?.[0]?.reOrderPoint,
                          })}
                        >
                          <Controller
                            name={`productVariations.0.reOrderPoint`}
                            control={control}
                            defaultValue={
                              variations?.[0]?.reOrderPoint?.toString() ?? ""
                            }
                            render={({ field }) => (
                              <Select
                                value={field.value?.toString() ?? ""}
                                onValueChange={(value) => {
                                  field.onChange(value);
                                  trigger(`productVariations.0.reOrderPoint`);
                                }}
                              >
                                <SelectTrigger className="border-0 bg-transparent focus:ring-0 focus:ring-primary h-9">
                                  <SelectValue placeholder="Select..." />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="5">5 units</SelectItem>
                                  <SelectItem value="10">10 units</SelectItem>
                                  <SelectItem value="15">15 units</SelectItem>
                                  <SelectItem value="20">20 units</SelectItem>
                                  <SelectItem value="25">25 units</SelectItem>
                                  <SelectItem value="50">50 units</SelectItem>
                                  <SelectItem value="100">100 units</SelectItem>
                                </SelectContent>
                              </Select>
                            )}
                          />
                        </div>
                      </Tooltip>
                    </td>
                    <td>
                      <Tooltip
                        title={
                          errors?.productVariations?.[0]?.stockKeepingUnit ? (
                            <div className="w-full text-[14px]">
                              {
                                errors?.productVariations?.[0]?.stockKeepingUnit
                                  ?.message
                              }
                            </div>
                          ) : null
                        }
                        arrow
                        placement="bottom"
                      >
                        <div
                          className={cn("p-4", {
                            "border border-red-500 rounded-[3px]":
                              errors?.productVariations?.[0]?.stockKeepingUnit,
                          })}
                        >
                          <div className="flex gap-2 flex-wrap">
                            <Button
                              variant={"outline"}
                              size="sm"
                              onClick={() =>
                                purchaseOrderSelectionPopup("MANUAL", 0)
                              }
                              className={cn(
                                "flex items-center gap-1.5 h-8 px-3 text-xs font-medium"
                              )}
                            >
                              <Upload className="h-3 w-3" />
                              Manual
                            </Button>
                            <Button
                              variant={"default"}
                              size="sm"
                              onClick={() =>
                                purchaseOrderSelectionPopup(
                                  "BULK",
                                  0,
                                  `excel-file-input-0`
                                )
                              }
                              className={cn(
                                "flex items-center gap-1.5 h-8  px-3 text-xs font-medium hover:bg-primary hover:opacity-80"
                              )}
                            >
                              <BarChart3 className="h-3 w-3" />
                              Bulk
                            </Button>
                            <input
                              type="file"
                              style={{ display: "none" }}
                              {...register(
                                `productVariations.0.stockKeepingUnit`
                              )}
                              onChange={(e) => {
                                handleFileChange(e, 0);
                              }}
                              id={`excel-file-input-0`}
                              name={`excel-file-input-0`}
                              className="custom-file-input"
                              accept=".xlsx,.csv"
                            />
                          </div>
                        </div>
                      </Tooltip>
                    </td>
                    <td className="px-2">
                      <div className="flex items-center gap-3">
                        {!!(lists[0]?.length > 0) && (
                          <button
                            className="cursor-pointer"
                            title={"View Serial Numbers"}
                            onClick={() => {
                              if (lists?.[0]?.length > 0) {
                                viewSerialNumbersHandler(0, null, "");
                              }
                            }}
                          >
                            <Icon
                              icon="garden:eye-fill-12"
                              width="18"
                              height="18"
                              color="#ff6200"
                            />
                          </button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {}}
                          disabled={true}
                          className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Trash2 className="h-6 w-6" />
                          <span className="sr-only">Remove variation</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                )}
                {variations?.length !== 0 &&
                  variations?.map((Item: any, index: number) => {
                    return (
                      <tr
                        className={cn(
                          "text-left divide-y divide-[#EFE6E6] py-2 border-b",
                          variations?.length - 1 == index && "border-0"
                        )}
                        key={Item.id}
                      >
                        <td>
                          <Tooltip
                            title={
                              errors?.productVariations?.[index]
                                ?.productSizeName ? (
                                <div className="w-full text-[14px]">
                                  {
                                    errors?.productVariations?.[index]
                                      ?.productSizeName?.message
                                  }
                                </div>
                              ) : null
                            }
                            arrow
                            placement="bottom"
                          >
                            <div
                              className={cn("", {
                                "border border-red-500":
                                  errors?.productVariations?.[index]
                                    ?.productSizeName,
                              })}
                            >
                              <Input
                                placeholder="Add product size"
                                name={`productVariations.${index}.productSizeName`}
                                register={register}
                                trigger={trigger}
                                className="border-0 bg-transparent h-9"
                              />
                            </div>
                          </Tooltip>
                        </td>
                        <td className=" ">
                          <Tooltip
                            title={
                              errors?.productVariations?.[index]?.price ? (
                                <div className="w-full text-[14px]">
                                  {
                                    errors?.productVariations?.[index]?.price
                                      ?.message
                                  }
                                </div>
                              ) : null
                            }
                            arrow
                            placement="bottom"
                          >
                            <div
                              className={cn("", {
                                "border border-red-500":
                                  errors?.productVariations?.[index]?.price,
                              })}
                            >
                              <div className="relative">
                                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                                  $
                                </span>
                                <Input
                                  placeholder="0.00"
                                  type="number"
                                  step="0.01"
                                  name={`productVariations.${index}.price`}
                                  register={register}
                                  trigger={trigger}
                                  className="border-0 bg-transparent h-9 pl-7"
                                />
                              </div>
                            </div>
                          </Tooltip>
                        </td>
                        <td className=" max-w-[50px]">
                          <Tooltip
                            title={
                              errors?.productVariations?.[index]?.inStock ? (
                                <div className="w-full text-[14px]">
                                  {
                                    errors?.productVariations?.[index]?.inStock
                                      ?.message
                                  }
                                </div>
                              ) : null
                            }
                            arrow
                            placement="bottom"
                          >
                            <div
                              className={cn("", {
                                "border border-red-500 rounded-[3px]":
                                  errors?.productVariations?.[index]?.inStock,
                              })}
                            >
                              <Input
                                placeholder="0"
                                type="number"
                                name={`productVariations.${index}.inStock`}
                                register={register}
                                trigger={trigger}
                                className="border-0 bg-transparent h-9"
                              />
                            </div>
                          </Tooltip>
                        </td>

                        <td className="min-w-[100px] max-w-[100px]">
                          <Tooltip
                            title={
                              errors?.productVariations?.[index]
                                ?.reOrderPoint ? (
                                <div className="w-full text-[14px]">
                                  {
                                    errors?.productVariations?.[index]
                                      ?.reOrderPoint?.message
                                  }
                                </div>
                              ) : null
                            }
                            arrow
                            placement="top"
                          >
                            <div
                              className={cn("", {
                                "border border-red-500 rounded-[3px]":
                                  errors?.productVariations?.[index]
                                    ?.reOrderPoint,
                              })}
                            >
                              <Controller
                                name={`productVariations.${index}.reOrderPoint`}
                                control={control}
                                defaultValue={
                                  Item?.reOrderPoint?.toString() ?? ""
                                }
                                render={({ field }) => (
                                  <Select
                                    value={field.value?.toString() ?? ""}
                                    onValueChange={(value) => {
                                      field.onChange(value);
                                      trigger(
                                        `productVariations.${index}.reOrderPoint`
                                      );
                                    }}
                                  >
                                    <SelectTrigger className="border-0 bg-transparent focus:ring-0 focus:ring-primary h-9">
                                      <SelectValue placeholder="Select..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="5">5 units</SelectItem>
                                      <SelectItem value="10">
                                        10 units
                                      </SelectItem>
                                      <SelectItem value="15">
                                        15 units
                                      </SelectItem>
                                      <SelectItem value="20">
                                        20 units
                                      </SelectItem>
                                      <SelectItem value="25">
                                        25 units
                                      </SelectItem>
                                      <SelectItem value="50">
                                        50 units
                                      </SelectItem>
                                      <SelectItem value="100">
                                        100 units
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                )}
                              />
                            </div>
                          </Tooltip>
                        </td>

                        <td>
                          <Tooltip
                            title={
                              errors?.productVariations?.[index]
                                ?.stockKeepingUnit ? (
                                <div className="w-full text-[14px]">
                                  Serial Number is required
                                </div>
                              ) : null
                            }
                            arrow
                            placement="bottom"
                          >
                            <div
                              className={cn("p-4", {
                                "border border-red-500":
                                  errors?.productVariations?.[index]
                                    ?.stockKeepingUnit,
                              })}
                            >
                              <div className="flex gap-2 flex-wrap">
                                <Button
                                  variant={"outline"}
                                  size="sm"
                                  onClick={() =>
                                    purchaseOrderSelectionPopup("MANUAL", index)
                                  }
                                  className={cn(
                                    "flex items-center gap-1.5 h-8 px-3 text-xs font-medium"
                                  )}
                                >
                                  <Upload className="h-3 w-3" />
                                  Manual
                                </Button>
                                <Button
                                  variant={"default"}
                                  size="sm"
                                  onClick={() =>
                                    purchaseOrderSelectionPopup(
                                      "BULK",
                                      index,
                                      `excel-file-input-${index}`
                                    )
                                  }
                                  className={cn(
                                    "flex items-center gap-1.5 h-8  px-3 text-xs font-medium hover:bg-primary hover:opacity-80"
                                  )}
                                >
                                  <BarChart3 className="h-3 w-3" />
                                  Bulk
                                </Button>
                                <input
                                  type="file"
                                  style={{ display: "none" }}
                                  {...register(
                                    `productVariations.${index}.stockKeepingUnit`
                                  )}
                                  onChange={(e) => {
                                    handleFileChange(e, index);
                                  }}
                                  id={`excel-file-input-${index}`}
                                  name={`excel-file-input-${index}`}
                                  className="custom-file-input"
                                  accept=".xlsx,.csv"
                                />
                              </div>
                            </div>
                          </Tooltip>
                        </td>
                        <td className="px-2">
                          <div className="flex items-center gap-3">
                            <Tooltip
                              title={
                                <div className="w-full text-[14px]">
                                  {!!(
                                    !lists?.[index] ||
                                    lists?.[index]?.length == 0
                                  )
                                    ? "No Serial Numbers"
                                    : "View Serial Numbers"}
                                </div>
                              }
                              arrow
                              placement="bottom"
                            >
                              <button
                                className="cursor-pointer disabled:opacity-50"
                                onClick={() =>
                                  viewSerialNumbersHandler(
                                    index,
                                    Item?.variationId,
                                    Item?.size
                                  )
                                }
                                disabled={
                                  !!(
                                    !lists?.[index] ||
                                    lists?.[index]?.length == 0
                                  )
                                }
                              >
                                <Icon
                                  icon="garden:eye-fill-12"
                                  width="18"
                                  height="18"
                                  color="#ff6200"
                                />
                              </button>
                            </Tooltip>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                const exists = !!Item.variationId;

                                removeVariationHandler(
                                  Item.variationId,
                                  index,
                                  exists
                                );
                              }}
                              disabled={variations.length === 1}
                              className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Remove variation</span>
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
            <div className="text-[0.6rem] text-red-600 text-center py-4 font-secondary">
              Note: Duplicate serial numbers will be automatically removed
              during bulk upload (e.g., when using an Excel file).
            </div>
          </div>
        </div>

        {/* Add Button */}
        <div className="flex justify-start">
          <Button
            onClick={() => {
              varitationAppend({});
            }}
            variant="outline"
            className="border-2 border-dashed border-primary/30 text-primary hover:border-primary transition-all duration-200 h-10 px-4"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Variation
          </Button>
        </div>

        {/* Summary */}
        {variations.length > 1 && (
          <div className="bg-gray-50 rounded-lg p-4 mt-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 font-secondary font-medium">
                Total Variations:
              </span>
              <Badge variant="default" className="bg-primary hover:bg-primary">
                {variations.length}
              </Badge>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

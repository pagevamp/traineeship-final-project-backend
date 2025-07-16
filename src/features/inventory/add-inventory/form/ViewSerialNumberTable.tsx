"use client";

import { Button } from "@/components/ui/button";
import { useConfirmationDialog } from "@/providers/ConfirmationDialogProvider";
import { Icon } from "@iconify/react/dist/iconify.js";
import { format } from "date-fns";
import { Trash2, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
// import UserConfirmationModal from "../ConfirmationModals/Users/UserConfirmationModal";

export default function ViewSerialNumberTable(props: any) {
  const {
    closeModal,
    serialNumbers,
    expiry,
    setValue,
    existingSerialNumbers,
    deleteSerialNumberHandler,
    listIndex,
    handleCloseFilter,
    allSerialNumbers,
    inventoryVariationId,
    size,
    setToBeDeletedSerial,
    editData,
  } = props;

  const { showConfirmation } = useConfirmationDialog();

  const inputRef = useRef<any>(null);

  const [deleting, setDeleting] = useState(false);
  const [localSerial, setLocalSerial] = useState(serialNumbers || []);
  const [localExpiry, setLocalExpiry] = useState(expiry);
  const [filteredSerial, setFilteredSerial] = useState<any>(localSerial);
  const [filteredSerialindexes, setFilteredSerialIndexes] = useState<any>([]);
  const [searched, setSearched] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState<any>(null);
  const [downloading, setDownloading] = useState(false);

  const askDeleteSerialNumberHandler = (serialNumber: string) => {
    const index = localSerial.indexOf(serialNumber);

    showConfirmation({
      title: "Delete Serial Number",
      description: "Are you sure you want to delete this serial number?",
      confirmText: "Yes",
      confirmClassName: "bg-destructive hover:bg-destructive hover:opacity-80",
      cancelText: "Cancel",
      isDisabled: false,
      onConfirm: () => {
        deleteLocalSerialNumber(index, serialNumber);
      },
    });
  };

  const deleteLocalSerialNumber = async (
    index: number,
    serialNumber: string
  ) => {
    // if newly added then local delete is enough
    // if existing, then localdelete and apicall delete

    if (existingSerialNumbers?.flat().includes(serialNumber)) {
      try {
        //push to array for delete after saving

        const idOfSerialForDelete = editData?.productVariations
          ?.find((item: any) => item.id === inventoryVariationId)
          ?.stockKeepingUnit?.find(
            (item: any) => item.sku === serialNumber
          )?.id;

        if (idOfSerialForDelete) {
          setToBeDeletedSerial((prev: any) => [...prev, idOfSerialForDelete]);
        }
        setLocalSerial((prevData: any) => {
          return [...prevData.filter((item: string) => item !== serialNumber)];
        });
        setLocalExpiry((prevData: any) => {
          return [
            ...prevData.filter((item: string, idx: number) => idx !== index),
          ];
        });
        handleCloseFilter(listIndex, serialNumber);
      } catch (err) {
        toast.error(
          "Failed to delete the serial number. Please try again later."
        );
      }
    } else {
      setLocalSerial((prevData: any) => {
        return [...prevData.filter((item: string) => item !== serialNumber)];
      });
      setLocalExpiry((prevData: any) => {
        return [
          ...prevData.filter((item: string, idx: number) => idx !== index),
        ];
      });
      handleCloseFilter(listIndex, serialNumber);
    }
  };

  useEffect(() => {
    const filteredserials = localSerial?.filter((item: string) =>
      item?.toLowerCase().includes(inputRef.current.value.trim().toLowerCase())
    );

    if (filteredserials.length === 0 && inputRef.current.value !== "")
      inputRef.current.value = "";

    setFilteredSerial((prev: any) => filteredserials);
  }, [localSerial]);

  const searchChangeHandler = () => {
    setSearched(true);
    const searchVal = inputRef.current.value;

    const filteredserials = [
      ...localSerial?.filter((item: any) =>
        item?.toLowerCase().includes(searchVal.trim().toLowerCase())
      ),
    ];

    const filteredIindices = filteredserials.map((filteredSerial) => {
      return localSerial?.indexOf(filteredSerial);
    });

    setFilteredSerialIndexes(filteredIindices);

    setFilteredSerial((prev: any) => {
      return [
        ...localSerial?.filter((item: any) =>
          item?.toLowerCase().includes(searchVal.trim().toLowerCase())
        ),
      ];
    });
  };

  useEffect(() => {
    if (inputRef.current.value === "") setSearched(false);
  }, []);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const highlightText = (text: any, keyword: any) => {
    if (!keyword) return text;

    const parts = text.split(new RegExp(`(${keyword})`, "gi"));
    return parts.map((part: any, index: any) =>
      part.toLowerCase() === keyword.toLowerCase() ? (
        <span key={index} className="text-secondary-color font-semibold">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div className="w-full relative font-gotham max-h-[75vh] h-full my-[2rem]  overflow-y-auto px-[2rem]">
      <div className="sticky top-0 bg-white border-b mb-3">
        {/* <div className=" block"> */}
        <div className="flex items-center justify-between mb-5">
          <div className=" bg-[#F2F2F2] rounded-[8px] w-full max-w-[400px] flex items-center pl-4 py-2">
            <div className="w-[20px] h-[20px] relative overflow-hidden">
              <Image src={"/images/search-icon.svg"} alt="" fill />
            </div>
            <input
              type="text"
              placeholder="Search"
              className="px-[16px] py-[5px]  outline-none bg-transparent"
              onChange={(e) => {
                searchChangeHandler();
                setSearchKeyword(e.target.value);
              }}
              ref={inputRef}
            />
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={closeModal}
            className="h-8 w-8 rounded-full"
          >
            <X className="scale-150" />
            <span className="sr-only">Close</span>
          </Button>
        </div>
      </div>

      {searched && filteredSerial.length === 0 ? (
        <div className="flex flex-col items-center justify-center m-auto">
          <div className="w-[96px] h-[96px] flex items-center justify-center rounded-full">
            <Icon icon="iconoir:db-error" width="24" height="24" />
          </div>
          <p className="text-center p-5 pt-0 max-w-[60ch] text-[#A0A0A0] text-[16px]">
            I apologize, but it seems that the searched serial number does not
            exist in our records. Please double-check the information provided
            or contact our support team for further assistance.
          </p>
        </div>
      ) : (
        <table className="w-full mb-1">
          <thead className="w-full">
            <tr className="w-full">
              <th className="text-left border-2 border-black p-2">S.N.</th>
              <th className="text-left border-2 border-black p-2">
                Serial No.
              </th>
              <th className="text-left border-2 border-black p-2 ">
                Expiration Date
              </th>
              <th className="text-center border-2 border-black p-2 ">Action</th>
            </tr>
          </thead>
          <tbody className="w-full">
            {(filteredSerial?.length > 0 ? filteredSerial : localSerial)?.map(
              (number: string, index: number) => {
                return (
                  <tr
                    className="w-full text-left border-2 border-black p-2"
                    key={index}
                  >
                    <td className="text-left border-2 border-black p-2">
                      {index + 1}
                    </td>
                    <td className="text-left border-2 border-black p-2">
                      {highlightText(number, searchKeyword)}
                    </td>
                    <td className="text-left border-2 border-black p-2">
                      {(() => {
                        try {
                          const targetIndex =
                            filteredSerial?.length > 0 && searched
                              ? filteredSerialindexes[index]
                              : index;

                          const dateValue = localExpiry[targetIndex];

                          if (!dateValue) return "N/A";

                          return format(new Date(dateValue), "MM-dd-yyyy");
                        } catch (error) {
                          console.error("Date formatting error:", error);
                          return "Invalid Date";
                        }
                      })()}
                    </td>
                    <td className="flex justify-center items-center h-full p-2">
                      <Trash2
                        className="h-5 w-5 text-primary cursor-pointer"
                        onClick={() => askDeleteSerialNumberHandler(number)}
                      />
                    </td>
                  </tr>
                );
              }
            )}
            {(filteredSerial?.length === 0 || localSerial?.length === 0) && (
              <tr className="border-2 border-black">
                <td colSpan={4} className="text-center py-4">
                  No serial numbers found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
      {/* </div> */}
    </div>
  );
}

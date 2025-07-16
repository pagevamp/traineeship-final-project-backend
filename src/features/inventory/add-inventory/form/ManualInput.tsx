"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useConfirmationDialog } from "@/providers/ConfirmationDialogProvider";
import { Icon } from "@iconify/react/dist/iconify.js";
import { format } from "date-fns";
import { X } from "lucide-react";
import Image from "next/image";
import { createRef, useEffect, useMemo, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { toast } from "sonner";

const SerialNumberAddPopup = (props: any) => {
  const {
    closeModal,
    serialNumbers,
    index: listIndex,
    setExpirationDates: setOriginalExpirationDates,
    setLists: setOriginalLists,
    setAllSerialNumbers: setAllLists,
  } = props;

  const { showConfirmation } = useConfirmationDialog();

  const inputRefs1 = useRef<any>([]);
  const dateRef = useRef<any>([]);
  const containerRef1 = useRef<any>();

  const [val, setVal] = useState<any>("");
  const [existingLists, setExistingLists] = useState<any>(serialNumbers ?? []);
  const [lists, setLists] = useState<any>([]);
  const [expiredDates, setExpiredDates] = useState<any>([]);

  const serialNumberLength = useMemo(() => Object.keys(lists)?.length, [lists]);

  useEffect(() => {
    inputRefs1.current = Array(serialNumberLength + 1)
      .fill(null)
      .map((_, index) => inputRefs1.current[index] || createRef());

    dateRef.current = Array(serialNumberLength)
      .fill(null)
      .map((_, index) => dateRef.current[index] || createRef());

    const hasExpiredDateLastDateNull =
      expiredDates?.[expiredDates?.length - 1] == null ? true : false;

    // Update focusDateField here to make sure the DatePicker is focused when the lists change
    if (lists.length > 0 && hasExpiredDateLastDateNull) {
      setTimeout(() => {
        focusDateField(lists.length - 1);
      }, 0);
    }
    if (lists.length > 0 && !hasExpiredDateLastDateNull) {
      setTimeout(() => {
        focusInput(lists.length);
      }, 0);
    }
  }, [serialNumberLength, lists, expiredDates]);

  const onSaveHandler = () => {
    setOriginalLists((prevLists: any) => {
      const previousValues = prevLists?.[listIndex]
        ? prevLists?.[listIndex]
        : [];
      return {
        ...prevLists,
        [listIndex]: [...previousValues, ...lists],
      };
    });
    setOriginalExpirationDates((prev: any) => {
      const previousValues = prev?.[listIndex] ? prev?.[listIndex] : [];
      // const formattedExpirationDates = expiredDates?.map((date: any) =>
      //   moment(new Date(date)?.toLocaleDateString())?.format('YYYY-MM-DD'),
      // )
      const formattedExpirationDates = expiredDates?.map((date: any) => {
        if (!date) {
          return null;
        }

        const utcTime = new Date(date)?.toISOString();
        return format(new Date(utcTime), "yyyy-MM-dd");
      });

      return {
        ...prev,
        [listIndex]: [...previousValues, ...formattedExpirationDates],
      };
    });
    setAllLists((prevLists: any) => [...prevLists, ...lists]);
    closeModal();
  };

  const focusInput = (index: any) => {
    if (inputRefs1.current[index] && inputRefs1.current[index].current) {
      inputRefs1.current[index]?.current.focus();
    } else {
    }
  };
  const focusDateField = (index: any) => {
    if (dateRef.current[index]) {
      dateRef.current[index].setFocus();
    } else {
    }
  };

  const scrollContainer = (index: any) => {
    if (containerRef1.current && containerRef1.current) {
      containerRef1.current.scrollTop += 100;
    }
  };

  const handleBarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value, "valuee");
    setVal(e.target.value);
  };

  const handleKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (event.key === "Enter") {
      if (!val?.trim()) {
        setVal("");
        return;
      }
      if (
        !existingLists?.includes(val?.trim()) &&
        !lists?.includes(val?.trim())
      ) {
        setLists((prev: any) => [...prev, val?.trim()]);

        setVal("");
        // focusInput(index + 1)
        // focusDateField(index)
        scrollContainer(index);
      } else {
        setVal("");
        toast.error("Duplicate Serial Number");
      }

      setVal("");
    }
  };

  useEffect(() => {
    // Update expiry date whenever serial is updated
    updateExpiryDate();
  }, [lists]);

  const updateExpiryDate = () => {
    // Create a new array with the length of lists
    const newArray = new Array(lists?.length).fill(null);

    // If expiredDates array already has elements, keep them until the length of lists
    if (expiredDates.length > 0) {
      newArray.forEach((_, index) => {
        if (index < expiredDates.length) {
          newArray[index] = expiredDates[index];
        }
      });
    }

    // Update expiredDates state
    setExpiredDates(newArray);
  };

  const handleExpiredDate = (index: any, date: any) => {
    dateRef.current[index].setOpen(false);
    const existingExpiry = [...expiredDates];
    existingExpiry[index] = date;
    setExpiredDates(existingExpiry);
  };

  const saveConfirmation = () => {
    // const containsUndefinedOrNullOrEmpty = expiredDates?.some(
    //   (expiryDate: any) => !expiryDate
    // );

    // if (containsUndefinedOrNullOrEmpty) {
    //   toast.error("Please fill all Expiry dates field");
    //   return;
    // }

    showConfirmation({
      title: "Save Confirmation",
      description: "Are you sure you want to save serial numbers?",
      confirmText: "Yes",
      confirmClassName: "bg-primary",
      cancelText: "Cancel",
      onConfirm: () => {
        onSaveHandler();
        closeModal();
      },
    });
  };

  const deleteHandler = (indexToDelete: any) => {
    const newExpiredDates = [...expiredDates]?.filter(
      (_, index) => index !== indexToDelete
    );
    const newlists = [...lists]?.filter((_, index) => index !== indexToDelete);
    setLists(newlists);
    setExpiredDates(newExpiredDates);
  };

  const inputBuffer = useRef("");
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);
  const isHandlingKeyDown = useRef(false);

  const handleExpiredDateNew = (index: number, newValue: Date | null) => {
    if (isHandlingKeyDown.current) return;
    handleExpiredDate(index, newValue);
  };

  const handleBarcodeInput = (index: number, key: string) => {
    isHandlingKeyDown.current = true;
    // Append each key to the buffer
    inputBuffer.current += key;

    // Clear the previous debounce timer
    if (debounceTimer.current) {
      console.log("clear timer");
      clearTimeout(debounceTimer.current);
    }

    // Set a new debounce timer to process input after a delay
    debounceTimer.current = setTimeout(() => {
      const inputValue = inputBuffer.current.trim();
      inputBuffer.current = ""; // Clear the buffer after processing

      isHandlingKeyDown.current = false; // Reset the flag
      // Extract valid date from input using regex
      const dateRegex = /(\d{1,2})[-\/](\d{1,2})[-\/](\d{4})/; // Matches MM/DD/YYYY
      const match = inputValue.match(dateRegex);

      if (match) {
        const month = parseInt(match[1], 10) - 1; // Month is 0-indexed
        const day = parseInt(match[2], 10);
        const year = parseInt(match[3], 10);
        const formattedDate = new Date(year, month, day);

        if (!isNaN(formattedDate.getTime())) {
          handleExpiredDateNew(index, formattedDate);
        } else {
          console.error("Invalid date in barcode input");
        }
      } else {
        console.error("Barcode input does not contain a valid date");
      }
    }, 100); // Debounce delay
  };

  return (
    <div
      className="w-full relative font-gotham overflow-scroll max-h-[75vh] h-full "
      ref={containerRef1}
    >
      <div className="flex justify-between items-center sticky top-0 bg-white z-[1000] py-[1rem] px-[2rem] rounded-t-2xl shadow">
        <div className="grow basis-0  text-h2 font-semibold font-gotham">
          Add Serial number and Expiry date
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

      <div className="py-[1rem] px-[2rem]">
        <table className="w-full">
          <thead className="w-full">
            <tr className="w-full">
              <th className="text-left border-2 border-black p-2">S.N.</th>
              <th className="text-left border-2 border-black p-2">
                Serial No.
              </th>
              <th className="text-left border-2 border-black p-2 ">
                Expiry Date
              </th>
            </tr>
          </thead>
          <tbody className="w-full">
            {lists?.map((number: string, index: number) => (
              <tr className="w-full text-left  p-2 relative" key={index}>
                <td className="text-left border-2 border-black p-2">
                  {index + 1}
                </td>
                <td className="text-left border-2 border-black p-4">
                  <div
                    className="w-full py-2 px-1 bg-[#F2F2F2] rounded-[8px] flex justify-center items-center cursor-default relative"
                    key={index}
                  >
                    {lists?.[index]}
                  </div>
                </td>
                <td className="text-left border-2 border-black p-2">
                  {/* {formatDate(localExpiry[index]) ?? '-'} */}
                  <div className="p-[4px] bg-[#F2F2F2]  rounded-[4px] flex items-center">
                    <Icon
                      icon="cuida:calendar-outline"
                      width="20"
                      height="20"
                      color="#ff6200"
                      className="mr-2"
                    />

                    <DatePicker
                      dateFormat="MM/dd/yyyy"
                      selected={expiredDates[index] ?? null}
                      ref={(el) => {
                        dateRef.current[index] = el;
                      }}
                      placeholderText="Expiration Date"
                      className="w-full bg-[#F2F2F2] h-[24px] border-none outline-none text-[#A0A0A0] placeholder:text-[#A0A0A0] placeholder:font-[400] placeholder:text-h5"
                      onKeyDown={(e) => {
                        handleBarcodeInput(index, e.key);
                      }}
                      onChange={(newValue: Date | null) => {
                        console.log(newValue, "in new value");
                        handleExpiredDateNew(index, newValue);
                      }}
                      minDate={new Date()}
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select"
                    />
                  </div>
                </td>
                <td className="border-none">
                  <Icon
                    icon="ic:baseline-delete"
                    width="24"
                    height="24"
                    color="#B75151"
                    className="cursor-pointer"
                    onClick={() => deleteHandler(index)}
                  />
                </td>
              </tr>
            ))}
            <tr className="w-full text-left  p-2">
              <td className="text-left border-2 border-black p-2">
                {lists?.length + 1}
              </td>
              <td className="text-left border-2 border-black p-4">
                {/* {number}  */}

                <input
                  type="text"
                  value={val}
                  defaultValue={inputRefs1.current[lists?.length]?.value || ""}
                  ref={inputRefs1.current[lists?.length]}
                  onChange={handleBarChange}
                  onKeyDown={(e) => handleKeyPress(e, lists?.length)}
                  className={cn(
                    "w-full border rounded-md ring-0 outline-none px-2 py-1"
                  )}
                  placeholder=""
                />
              </td>
              <td className="text-left border-2 border-black p-2 ">-</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="pt-0 pb-[2rem] px-[2rem] font-secondary text-sm text-red-600">
        Note: You can automatically populate the Serial Number and Expiry Date
        fields using a barcode scanner. If you are entering the Serial Number
        manually (i.e., without a barcode scanner), please press Enter after
        typing the serial number to proceed.
      </div>
      <div className="flex items-center justify-end  sticky bottom-0 bg-white py-[1rem] px-[2rem] border-t">
        <Button
          variant={"default"}
          className={`px-12 py-3 rounded-2xl `}
          onClick={saveConfirmation}
        >
          <div className="flex items-center gap-[10px]">
            <h1 className="text-[15px] text-white font-medium">Save</h1>
          </div>
        </Button>
      </div>
    </div>
  );
};

export default SerialNumberAddPopup;

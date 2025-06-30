"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { useDebouncedCallback } from "@/hooks/useDebouncedCallback";
import { cn } from "@/lib/utils";
import Image from "next/image";
import SearchIcon from "../../../public/images/search-icon.svg";

type PropsI = {
  setState: (state: any) => void;
  state: any;
  placeholder: string;
  searchKey?: string;
  type?: string;
  className?: string;
};

const DepartmentSearchComponent = (props: PropsI) => {
  const {
    setState,
    state,
    placeholder,
    className,
    searchKey = "search",
  } = props;

  const [inputValue, setInputValue] = useState(state[searchKey] || "");

  // Sync input field with external state if it changes externally
  useEffect(() => {
    setInputValue(state[searchKey] || "");
  }, [state, searchKey]);

  // Debounced setter for API-triggering state
  const debouncedSetSearch = useDebouncedCallback((val: string) => {
    setState((prev: any) => ({
      ...prev,
      [searchKey]: val,
    }));
  }, 500);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val); // update input field immediately
    debouncedSetSearch(val); // update parent state with debounce
  };

  return (
    <div
      className={cn(
        "flex items-center gap-2 gradient-border rounded-[40px] w-full pl-5 pr-5 bg-white py-2",
        className
      )}
    >
      <Image src={SearchIcon} alt="Search Icon" width={17} height={14} />

      <div className="flex-1 mr-2">
        <Input
          placeholder={placeholder}
          value={inputValue}
          onChange={handleChange}
          className="pl-0 h-5 border-none text-xs focus:gradient-text placeholder:gradient-text py-0"
        />
      </div>
    </div>
  );
};

export default DepartmentSearchComponent;

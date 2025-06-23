"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { useDebouncedCallback } from "@/hooks/useDebouncedCallback";
import { cn } from "@/lib/utils";
import Image from "next/image";
import SearchIcon from "../../../public/images/search-icon.svg";

type PropsI = {
  setState: (state: any) => void;
  state: any;
  placeholder: string;
  type?: string;
  className?: string;
};

const SearchComponent = (props: PropsI) => {
  const { setState, state, placeholder, className } = props;
  const [search, setSearch] = useState<string>("");

  const handleSearchChange = useDebouncedCallback((value: string) => {
    setState((prev: any) => ({
      ...prev,
      search: value,
    }));
  }, 500);

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
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            handleSearchChange(e.target.value);
          }}
          className="pl-0 h-5 border-none text-primary text-xs focus:gradient-text placeholder:gradient-text py-0"
        />
      </div>
    </div>
  );
};

export default SearchComponent;

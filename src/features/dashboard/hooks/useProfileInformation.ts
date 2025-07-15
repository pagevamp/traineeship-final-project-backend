"use client";
import { useQuery } from "@tanstack/react-query";
import { getProfileInformation } from "../api";
import { usePathname } from "next/navigation";

const useProfileInformation = () => {
  const pathname = usePathname();
  return useQuery({
    queryKey: ["profileInformation"],
    queryFn: () => getProfileInformation(),
    staleTime: 0,
    enabled: pathname !== "/register",
  });
};

export { useProfileInformation };

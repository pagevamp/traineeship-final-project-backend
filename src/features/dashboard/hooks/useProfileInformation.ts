import { useQuery } from "@tanstack/react-query";
import { getProfileInformation } from "../api";

const useProfileInformation = () => {
  return useQuery({
    queryKey: ["profileInformation"],
    queryFn: () => getProfileInformation(),
    staleTime: 0,
  });
};

export { useProfileInformation };

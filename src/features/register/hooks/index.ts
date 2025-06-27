import { useQuery } from "@tanstack/react-query";
import { getVehicleType } from "../api";

const useVehicleType = (step: number) => {
  return useQuery({
    queryKey: ["allVehicleType"],
    queryFn: () => getVehicleType(),
    staleTime: Infinity,
    enabled: step === 2,
  });
};
export { useVehicleType };

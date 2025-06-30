import { useMutation, useQuery } from "@tanstack/react-query";
import { createCustomer, getVehicleType } from "../api";
import { Obj } from "@/types";

const useVehicleType = (step: number) => {
  return useQuery({
    queryKey: ["allVehicleType"],
    queryFn: () => getVehicleType(),
    staleTime: Infinity,
    enabled: step === 2,
  });
};
const useCreateCustomer = (options: {
  onError?: (error: any, variables: any, context: any) => void;
  onSuccess?: (data: Obj) => void;
}) => {
  return useMutation({
    mutationFn: createCustomer,
    onError: options.onError,
    onSuccess: options.onSuccess,
  });
};
export { useVehicleType, useCreateCustomer };

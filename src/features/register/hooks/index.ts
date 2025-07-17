import { useMutation, useQuery } from "@tanstack/react-query";
import { createCustomer, getVehicleType, updateCustomer, checkUniqueEmail } from "../api";
import { Obj } from "@/types";
import { UserPayload } from "../types";

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

const useUpdateCustomer = (options: {
  onError?: (error: any, variables: any, context: any) => void;
  onSuccess?: (data: Obj) => void;
}) => {
  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: UserPayload }) =>
      updateCustomer(id, body),
    onError: options.onError,
    onSuccess: options.onSuccess,
  });
};

const useCheckUniqueEmail = (email: string) => {
  return useQuery({
    queryKey: ["checkUniqueEmail", email],
    queryFn: () => checkUniqueEmail(email),
    enabled: !!email,
    staleTime: 0,
  });
};
export { useVehicleType, useCreateCustomer, useUpdateCustomer, useCheckUniqueEmail };

import { Obj } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { loginEmail } from "../api/login";

export const useEmailLogin = (options: {
  onError?: (error: any, variables: any, context: any) => void;
  onSuccess?: (data: Obj) => void;
}) => {
  return useMutation({
    mutationFn: loginEmail,
    onError: options.onError,
    onSuccess: options.onSuccess,
  });
};

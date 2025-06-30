import { api } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

const useFileUpload = (options: {
  onError?: (error: any, variables: any, context: any) => void;
  onSuccess?: (data: any) => void;
}) => {
  return useMutation({
    mutationFn: fileUpload,
    onError: options.onError,
    onSuccess: options.onSuccess,
  });
};

const fileUpload = (body: any) => {
  return api.post("/file-upload", body);
};

export { useFileUpload };

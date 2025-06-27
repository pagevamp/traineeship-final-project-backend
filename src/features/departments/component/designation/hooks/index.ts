import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createDesignation,
  deleteDesignation,
  getAllDesignations,
  updateDesignation,
} from "../api";
import { departmentListParams } from "@/features/departments/types";
import { Obj } from "@/types";
import { toast } from "sonner";

// FOR designation
interface CreateDesignationBody {
  name: string;
  department: { id: string };
}

const useCreateDesignation = (options: {
  onError?: (error: any, variables: any, context: any) => void;
  onSuccess?: (data: any) => void;
}) => {
  return useMutation({
    mutationFn: (body: CreateDesignationBody) => createDesignation(body),
    onError: options.onError,
    onSuccess: options.onSuccess,
  });
};

const useGetAllDesignations = ({
  id,
  ...params
}: departmentListParams & { id: string }) => {
  return useQuery({
    queryKey: ["designations", id, params],
    queryFn: () => getAllDesignations(id, params),
    enabled: !!id,
  });
};

const useDeleteDesignation = (options: {
  onError?: (error: any, variables?: any, context?: any) => void;
  onSuccess?: (data: any) => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      return await deleteDesignation(id);
    },

    onSuccess: (data, variables, context) => {
      toast.success("Designation deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["departmentDetail"] });
      if (options.onSuccess) {
        options.onSuccess(data);
      }
    },

    onError: (error: any, variables, context) => {
      toast.error(error?.response?.data?.message || "Something went wrong!");
      if (options.onError) {
        options.onError(error, variables, context);
      }
    },
  });
};

const useUpdateDesignation = (options: {
  onError?: (error: any, variables: any, context: any) => void;
  onSuccess?: (data: Obj) => void;
}) => {
  return useMutation({
    mutationFn: ({ id, body }) => updateDesignation(id, body),
    onError: options.onError,
    onSuccess: options.onSuccess,
  });
};

export {
  useCreateDesignation,
  useGetAllDesignations,
  useDeleteDesignation,
  useUpdateDesignation,
};

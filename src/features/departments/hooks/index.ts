import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createDepartment,
  deleteDepartment,
  getAllDepartments,
  getAllUsers,
  updateDepartmentDetailById,
} from "../api";
import { Obj } from "@/types";
import { departmentListParams } from "../types";
import { getDepartmentDetailById } from "../api";
import { toast } from "sonner";

const useCreateDepartment = (options: {
  onError?: (error: any, variables: any, context: any) => void;
  onSuccess?: (data: Obj) => void;
}) => {
  return useMutation({
    mutationFn: createDepartment,
    onError: options.onError,
    onSuccess: options.onSuccess,
  });
};

export const useGetDepartmentById = (id: string) => {
  return useQuery({
    queryKey: ["departmentDetail", id],
    queryFn: () => getDepartmentDetailById(id!),
    enabled: !!id,
  });
};

const useGetAllDepartments = (params: any) => {
  return useQuery({
    queryKey: ["departmentList", params],
    queryFn: () =>
      getAllDepartments({
        limit: params.pagination.recordsPerPage,
        offset: (params.pagination.page - 1) * params.pagination.recordsPerPage,
        search: params.search,
        sortBy: params.filters.sortParams.sortParam,
        order: params.filters.sortParams.sortOrder,
        id: params.id,
      }),
  });
};

const useDeleteDepartment = (options: {
  onError?: (error: any, variables?: any, context?: any) => void;
  onSuccess?: (data: any) => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      return await deleteDepartment(id);
    },

    onSuccess: (data, variables, context) => {
      toast.success("Department deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["departmentList"] });
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

const useUpdateDepartment = (options: {
  onError?: (error: any, variables: any, context: any) => void;
  onSuccess?: (data: Obj) => void;
}) => {
  return useMutation({
    mutationFn: ({ id, body }) => updateDepartmentDetailById(id, body),
    onError: options.onError,
    onSuccess: options.onSuccess,
  });
};

type UseGetAllUsersProps = departmentListParams & {
  departmentId?: string;
};

const useGetAllUsers = (params: UseGetAllUsersProps, options = {}) => {
  return useQuery({
    queryKey: ["users", params.departmentId, JSON.stringify(params)],
    queryFn: () => getAllUsers(params),
    enabled: !!params.departmentId,
    ...options,
  });
};

export {
  useCreateDepartment,
  useGetAllDepartments,
  useDeleteDepartment,
  useGetAllUsers,
  useUpdateDepartment,
};

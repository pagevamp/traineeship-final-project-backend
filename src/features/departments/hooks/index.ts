import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createDepartment,
  deleteDepartment,
  getAllDepartments,
  getAllUsers,
  updateDepartmentDetailById,
} from "../api";
import { Obj } from "@/types";
import { CreateDepartmentPayload, departmentListParams } from "../types";
import {
  createDesignation,
  deleteDesignation,
  getAllDesignations,
} from "../component/designation/api";
import { getDepartmentDetailById } from "../api";
import { Department } from "@/features/users/types";

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
    queryKey: ["allDepartments", params],
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

const useDeleteDepartment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => deleteDepartment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allDepartments"] });
    },
    onError: (error) => {
      console.error("Error deleting department:", error);
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



type UseGetAllUsersProps = {
  id: string;
} & departmentListParams;

const useGetAllUsers = ({ id, ...params }: UseGetAllUsersProps) => {
  return useQuery({
    queryKey: ["users", id, JSON.stringify(params)],
    queryFn: () => getAllUsers(id, params),
    enabled: !!id,
  });
};



export {
  useCreateDepartment,
  useGetAllDepartments,
  useDeleteDepartment,
  
  useGetAllUsers,
  useUpdateDepartment,
};

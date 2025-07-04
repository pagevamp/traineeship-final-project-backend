import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createInternalUser,
  getAllDepartments,
  getAllInternalUsers,
  getAllModules,
  getUserDetailById,
  updateInternalUser,
} from "../api";
import { Obj } from "@/types";
import { CreateUserPayload } from "../types";

const useGetModules = () => {
  return useQuery({
    queryKey: ["allModules"],
    queryFn: getAllModules,
    staleTime: 0,
  });
};

const useGetDepartments = () => {
  return useQuery({
    queryKey: ["allDepartments"],
    queryFn: getAllDepartments,
    staleTime: 0,
  });
};

const useCreateInternalUser = (options: {
  onError?: (error: any, variables: any, context: any) => void;
  onSuccess?: (data: Obj) => void;
}) => {
  return useMutation({
    mutationFn: createInternalUser,
    onError: options.onError,
    onSuccess: options.onSuccess,
  });
};

const useUpdateInternalUser = (options: {
  onError?: (error: any, variables: any, context: any) => void;
  onSuccess?: (data: Obj) => void;
}) => {
  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: CreateUserPayload }) =>
      updateInternalUser(id, body),
    onError: options.onError,
    onSuccess: options.onSuccess,
  });
};

const useGetAllInternalUsers = (params: any) => {
  return useQuery({
    queryKey: ["allInternalUsers", params],
    queryFn: () =>
      getAllInternalUsers({
        limit: params.pagination.recordsPerPage,
        offset: (params.pagination.page - 1) * params.pagination.recordsPerPage,
        search: params.search,
        sortBy: params.filters.sortParams.sortParam,
        order: params.filters.sortParams.sortOrder,
        id: params.id,
      }),
    // enabled: !!params.id,
  });
};

const useGetUserDetail = (id: string) => {
  return useQuery({
    queryKey: ["userDetail", id],
    queryFn: () => getUserDetailById(id),
    enabled: !!id,
  });
};

export {
  useGetModules,
  useGetDepartments,
  useCreateInternalUser,
  useGetAllInternalUsers,
  useUpdateInternalUser,
  useGetUserDetail,
};

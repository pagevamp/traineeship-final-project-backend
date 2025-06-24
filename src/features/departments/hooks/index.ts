import { useMutation, useQuery } from "@tanstack/react-query";
import { createDepartment, getAllDepartments } from "../api";
import { Obj } from "@/types";

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



export { useCreateDepartment, useGetAllDepartments };

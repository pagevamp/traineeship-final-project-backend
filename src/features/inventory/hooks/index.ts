import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createInventory,
  getAllInventoryList,
  getAllUnitOfMeasure,
  getInventoryById,
  updateInventory,
} from "../api";

const useGetAllInventoryList = (params: any) => {
  return useQuery({
    queryKey: ["getAllInventoryList", params],
    queryFn: () =>
      getAllInventoryList({
        searchParam: params.searchParam,
        sortBy: params.filters.sortParams.sortParam,
        order: params.filters.sortParams.sortOrder,
        limit: params.pagination.recordsPerPage,
        offset: (params.pagination.page - 1) * params.pagination.recordsPerPage,
        createdById: params.createdById,
      }),
    enabled: !!params?.createdById,
  });
};

const useGetAllUnitOfMeasure = (params: any) => {
  return useQuery({
    queryKey: ["getAllUnitOfMeasure", params],
    queryFn: () => getAllUnitOfMeasure(params),
    staleTime: 0,
    enabled: !!params?.createdById,
  });
};

const useGetInventoryById = (params: any) => {
  return useQuery({
    queryKey: ["getInventoryById", params],
    queryFn: () => getInventoryById(params),
    staleTime: 0,
    enabled: !!params?.id,
  });
};

const useAddInventory = (options: {
  onError?: (error: any, variables: any, context: any) => void;
  onSuccess?: (data: any) => void;
}) => {
  return useMutation({
    mutationFn: createInventory,
    onError: options.onError,
    onSuccess: options.onSuccess,
  });
};

const useUpdateInventory = (options: {
  onError?: (error: any, variables: any, context: any) => void;
  onSuccess?: (data: any) => void;
}) => {
  return useMutation({
    mutationFn: updateInventory,
    onError: options.onError,
    onSuccess: options.onSuccess,
  });
};

export {
  useGetAllUnitOfMeasure,
  useAddInventory,
  useUpdateInventory,
  useGetInventoryById,
  useGetAllInventoryList,
};

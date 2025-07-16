import { useMutation, useQuery } from "@tanstack/react-query";
import { createOrder, getAllOrdersList, getImporterDetails } from "../api";

const useGetAllOrdersList = (params: any) => {
  return useQuery({
    queryKey: ["getAllOrdersList", params],
    queryFn: () =>
      getAllOrdersList({
        searchParam: params.searchParam,
        sortBy: params.filters.sortParams.sortParam,
        order: params.filters.sortParams.sortOrder,
        limit: params.pagination.recordsPerPage,
        offset: (params.pagination.page - 1) * params.pagination.recordsPerPage,
        customerId: params.customerId,
      }),
    enabled: !!params?.customerId,
  });
};

const useGetImporterDetails = (params: any) => {
  return useQuery({
    queryKey: ["getImporterDetails", params],
    queryFn: () => getImporterDetails(params.id),
    enabled: !!params?.id,
  });
};

const useCreateOrder = (options: {
  onError?: (error: any, variables: any, context: any) => void;
  onSuccess?: (data: any) => void;
}) => {
  return useMutation({
    mutationFn: createOrder,
    onError: options.onError,
    onSuccess: options.onSuccess,
  });
};

export { useGetAllOrdersList, useCreateOrder, useGetImporterDetails };

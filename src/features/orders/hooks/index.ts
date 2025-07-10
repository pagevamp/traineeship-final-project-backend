import { useMutation, useQuery } from "@tanstack/react-query";
import { getAllOrdersList } from "../api";

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

export { useGetAllOrdersList };

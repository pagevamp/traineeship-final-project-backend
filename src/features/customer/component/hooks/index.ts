import { useQuery } from "@tanstack/react-query";
import { getAllMasterProduct } from "../api";

const useGetAllMasterProduct = (params: any) => {
  return useQuery({
    queryKey: ["allMasterProduct", params],
    queryFn: () =>
      getAllMasterProduct({
        limit: params.pagination.recordsPerPage,
        offset: (params.pagination.page - 1) * params.pagination.recordsPerPage,
        search: params.search,
        sortBy: params.filters.sortParams.sortParam,
        order: params.filters.sortParams.sortOrder,
        id: params.id,
        createdById: params.createdById,
      }),
    enabled: !!params.createdById,
  });
};
export { useGetAllMasterProduct };

import { Obj } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createImporter,
  getAllImporters,
  getAllNetTerms,
  getImporterById,
  updateImporter,
} from "../api";
import { ImporterPayload } from "../types";

const useCreateImporter = (options: {
  onError?: (error: any, variables: any, context: any) => void;
  onSuccess?: (data: Obj) => void;
}) => {
  return useMutation({
    mutationFn: createImporter,
    onError: options.onError,
    onSuccess: options.onSuccess,
  });
};
const useGetNetTerms = (params: any) => {
  return useQuery({
    queryKey: ["allNetTerms", params],
    queryFn: () =>
      getAllNetTerms({
        limit: params.pagination.recordsPerPage,
        offset: (params.pagination.page - 1) * params.pagination.recordsPerPage,
        sortBy: params.filters.sortParams.sortParam,
        order: params.filters.sortParams.sortOrder,
      }),
    staleTime: 0,
  });
};

const useGetAllImporters = (params: any) => {
  return useQuery({
    queryKey: ["allImporters", params],
    queryFn: () =>
      getAllImporters({
        limit: params.pagination.recordsPerPage,
        offset: (params.pagination.page - 1) * params.pagination.recordsPerPage,
        search: params.search,
        sortBy: params.filters.sortParams.sortParam,
        order: params.filters.sortParams.sortOrder,
      }),
  });
};

const useGetImporterDetails = (id: string) => {
  return useQuery({
    queryKey: ["importerDetails", id],
    queryFn: () => getImporterById(id),
    enabled: !!id,
  });
};

const useUpdateImporter = (options: {
  onError?: (error: any, variables: any, context: any) => void;
  onSuccess?: (data: Obj) => void;
}) => {
  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: ImporterPayload }) =>
      updateImporter(id, body),
    onError: options.onError,
    onSuccess: options.onSuccess,
  });
};

export {
  useCreateImporter,
  useGetNetTerms,
  useGetAllImporters,
  useGetImporterDetails,
  useUpdateImporter,
};

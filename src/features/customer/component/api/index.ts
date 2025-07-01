import { userListParams } from "@/features/users/types";
import { api } from "@/lib/axios";

export const getAllMasterProduct = (params: userListParams = {}) => {
  const queryParams = new URLSearchParams();

  if (params.search?.trim()) {
    queryParams.append("search", params.search.trim());
  }

  if (params.limit) {
    queryParams.append("limit", params.limit.toString());
  }
  if (params.order?.trim()) {
    queryParams.append("order", params.order.trim());
  }
  if (params.sortBy?.trim()) {
    queryParams.append("sortBy", params.sortBy.trim());
  }

  if (params.offset) {
    queryParams.append("offset", params.offset.toString());
  }
  if (params.createdById) {
    queryParams.append("createdById", params.createdById.toString());
  }

  const url = `/products/master${
    queryParams.toString() ? `?${queryParams.toString()}` : ""
  }`;
  return api.get(url);
};

import { api } from "@/lib/axios";

export const getAllOrdersList = (params: any) => {
  const queryParams = new URLSearchParams();

  if (params.searchParam?.trim()) {
    queryParams.append("search", params.searchParam.trim());
  }

  if (params.order?.trim()) {
    queryParams.append("order", params.order.trim());
  }
  if (params.sortBy?.trim()) {
    queryParams.append("sortBy", params.sortBy.trim());
  }

  if (params.limit) {
    queryParams.append("limit", params.limit.toString());
  }

  if (params.offset) {
    queryParams.append("offset", params.offset.toString());
  }

  if (params.customerId) {
    queryParams.append("customerId", params.customerId.toString());
  }

  const queryString = queryParams.toString();
  const url = `/sales-order/list-order${queryString ? `?${queryString}` : ""}`;

  return api.get(url);
};

export const getOrderById = (id: string) => {
  return api.get(`/sales-order/by-id/${id}`);
};

export const createOrder = (body: any) => {
  return api.post("/sales-order/create", body);
};

export const getAllImporters = (params: any) => {
  const queryParams = new URLSearchParams();

  if (params.searchParam?.trim()) {
    queryParams.append("search", params.searchParam.trim());
  }

  if (params.order?.trim()) {
    queryParams.append("order", params.order.trim());
  }
  if (params.sortBy?.trim()) {
    queryParams.append("sortBy", params.sortBy.trim());
  }

  if (params.limit) {
    queryParams.append("limit", params.limit.toString());
  }

  if (params.offset) {
    queryParams.append("offset", params.offset.toString());
  }

  const queryString = queryParams.toString();
  const url = `/importers${queryString ? `?${queryString}` : ""}`;

  return api.get(url);
};
export const getImporterDetails = (id: string) => {
  return api.get(`/importers/${id}`);
};

export const getProductPrice = (params: any) => {
  const queryParams = new URLSearchParams();

  if (params.searchParam?.trim()) {
    queryParams.append("search", params.searchParam.trim());
  }

  if (params.order?.trim()) {
    queryParams.append("order", params.order.trim());
  }
  if (params.sortBy?.trim()) {
    queryParams.append("sortBy", params.sortBy.trim());
  }

  if (params.limit) {
    queryParams.append("limit", params.limit.toString());
  }

  if (params.offset) {
    queryParams.append("offset", params.offset.toString());
  }

  if (params.productId) {
    queryParams.append("productId", params.productId.toString());
  }

  if (params.customerId) {
    queryParams.append("customerId", params.customerId.toString());
  }

  const queryString = queryParams.toString();
  const url = `/products/customer-price${queryString ? `?${queryString}` : ""}`;

  return api.get(url);
};

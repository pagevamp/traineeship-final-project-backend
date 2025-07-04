import { AxiosError } from "axios";
import { toast } from "sonner";

export const handleError = (error: AxiosError<any, any>): string => {
  const responseData = error?.response?.data;
  const status = error?.response?.status;
  const code = error?.code;

  let message = "SOMETHING WENT WRONG";

  // Handle network-related errors (common with inactive tabs)
  if (code === "NETWORK_ERROR" || code === "ERR_NETWORK") {
    message = "Network connection lost. Please check your internet connection.";
  } else if (code === "ECONNABORTED" || code === "ERR_CANCELED") {
    message = "Request was cancelled. Please try again.";
  } else if (code === "ERR_TIMEOUT") {
    message = "Request timed out. Please try again.";
  }
  // Handle HTTP status errors
  else if (status === 401) {
    message = "Session expired. Please log in again.";
  } else if (status === 403) {
    message =
      "Access denied. You don't have permission to perform this action.";
  } else if (status === 404) {
    message = "Resource not found.";
  } else if (status === 500) {
    message = "Server error. Please try again later.";
  } else if (status === 502 || status === 503 || status === 504) {
    message = "Service temporarily unavailable. Please try again later.";
  }
  // Handle response data errors
  else if (typeof responseData === "string") {
    message = responseData;
  } else if (responseData?.message) {
    message = responseData.message;
  } else if (responseData?.error?.message) {
    message = responseData.error.message;
  } else if (responseData?.error) {
    message = responseData.error;
  }

  // Only show toast for non-retryable errors or after max retries
  // This prevents showing multiple error toasts during retry attempts
  if (status && status >= 400 && status < 500) {
    toast.error(message);
  } else if (code === "NETWORK_ERROR" || code === "ERR_NETWORK") {
    toast.error(message);
  }
  return message;
};

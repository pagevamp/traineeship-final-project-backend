import { AxiosError } from "axios";
import { toast } from "sonner";

export const handleError = (error: AxiosError<any, any>): string => {
  const responseData = error?.response?.data;

  let message = "SOMETHING WENT WRONG";

  if (typeof responseData === "string") {
    message = responseData;
  } else if (responseData?.message) {
    message = responseData.message;
  } else if (responseData?.error?.message) {
    message = responseData.error.message;
  } else if (responseData?.error) {
    message = responseData.error;
  }

  toast.error(message);
  return message;
};

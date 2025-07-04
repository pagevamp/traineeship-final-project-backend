import { DefaultOptions } from "@tanstack/react-query";

export const queryConfig: DefaultOptions = {
  queries: {
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    retry: false,
  },
};

import { DefaultOptions } from "@tanstack/react-query";

export const queryConfig: DefaultOptions = {
  queries: {
    refetchOnWindowFocus: true,
    retry: false,
  },
  mutations: {
    retry: false,
  },
};

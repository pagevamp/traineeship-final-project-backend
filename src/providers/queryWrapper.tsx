"use client";

import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { queryConfig } from "@/lib/reactQuery";
import { handleError } from "@/utils/handlers/error";
import { AxiosError } from "axios";

// Centralized creation of QueryClient
const createQueryClient = () =>
  new QueryClient({
    defaultOptions: queryConfig,
    queryCache: new QueryCache({
      onError: (error) => handleError(error as AxiosError),
    }),
    mutationCache: new MutationCache({
      onError: (error, _variables, _context, mutation) => {
        if (!mutation.options.onError) {
          handleError(error as AxiosError);
        }
      },
    }),
  });

// Singleton pattern for browser (avoid recreating the client)
let browserQueryClient: QueryClient | null = null;

export function getQueryClient() {
  if (typeof window === "undefined") {
    // On the server, always create a new client
    return createQueryClient();
  }
  // On the client, reuse a single instance
  browserQueryClient ||= createQueryClient();
  return browserQueryClient;
}

export default function QueryWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

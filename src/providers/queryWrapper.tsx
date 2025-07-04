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
import { useEffect, useState } from "react";

// Centralized creation of QueryClient
const createQueryClient = () =>
  new QueryClient({
    defaultOptions: queryConfig,
    queryCache: new QueryCache({
      onError: (error, query) => {
        // Only handle errors that aren't being retried
        if (query.state.errorUpdatedAt === query.state.dataUpdatedAt) {
          handleError(error as AxiosError);
        }
      },
    }),
    mutationCache: new MutationCache({
      onError: (error, _variables, _context, mutation) => {
        if (!mutation.options.onError) {
          // Only show error toast for mutations that aren't being retried
          const axiosError = error as AxiosError;
          if (
            axiosError.code === "NETWORK_ERROR" ||
            axiosError.code === "ERR_NETWORK"
          ) {
            handleError(axiosError);
          }
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

// Network status monitoring component
function NetworkStatusMonitor({ queryClient }: { queryClient: QueryClient }) {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      // Refetch all queries when coming back online
      queryClient.refetchQueries();
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    const handleVisibilityChange = () => {
      if (!document.hidden && isOnline) {
        // Refetch stale queries when tab becomes visible and we're online
        queryClient.refetchQueries({
          type: "active",
          stale: true,
        });
      }
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [queryClient, isOnline]);

  return null;
}

export default function QueryWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <NetworkStatusMonitor queryClient={queryClient} />
      {children}
    </QueryClientProvider>
  );
}

"use client";

import { useQuery } from "@tanstack/react-query";
import { authClient } from "@/lib/auth-client";

const STALE_TIME = 1000 * 60 * 30; // 30 minutes
const REFETCH_INTERVAL = 1000 * 60 * 5; // 5 minutes

export const AUTH_STATE_QUERY_KEY = ["auth-state"];

export const getAuthStateQuery = () => {
  return useQuery({
    queryKey: AUTH_STATE_QUERY_KEY,

    queryFn: async () => {
      return await authClient.getSession();
    },

    staleTime: STALE_TIME,
    refetchInterval: REFETCH_INTERVAL,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
};

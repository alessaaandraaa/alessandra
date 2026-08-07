"use client";

import { useQuery } from "@tanstack/react-query";
import { authClient } from "@/lib/auth-client";
const STALE_TIME = 1000 * 60 * 5;

export const getAuthStateQuery = () => {
  return useQuery({
    queryKey: ["auth-state"],
    queryFn: async () => {
      return await authClient.getSession();
    },
    staleTime: STALE_TIME,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};

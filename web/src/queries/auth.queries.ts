"use client";

import { useQuery } from "@tanstack/react-query";
import { authClient } from "@/lib/auth-client";

export const AUTH_STATE_QUERY_KEY = ["auth-state"];

export const getAuthStateQuery = () => {
  return useQuery({
    queryKey: AUTH_STATE_QUERY_KEY,

    queryFn: () => authClient.getSession(),

    staleTime: 1000 * 60 * 30,

    // Periodically verify the server-side session.
    refetchInterval: 1000 * 60 * 5,

    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
};

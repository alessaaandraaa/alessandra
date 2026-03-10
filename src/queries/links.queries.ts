"use client";

import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";

const STALE_TIME = 1000 * 60 * 5;

export const getLinksQuery = () => {
  return useQuery({
    queryKey: ["links"],
    queryFn: async () => {
      const response = await axios.get(
        "https://spotify-backend-eight-pink.vercel.app/api/links",
      );
      return response.data;
    },
    staleTime: STALE_TIME,
  });
};

export const useAddLinksQuery = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, any, { prevLinks?: any[] }>({
    mutationFn: async (data) => {
      const response = await axios.post(
        `https://spotify-backend-eight-pink.vercel.app/api/links`,
        data,
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["links"] });
    },
    onError: (_error, _variables, context: any) => {
      if (context?.prevLinks) {
        queryClient.setQueryData(["links"], context.prevLinks);
      }
    },
  });
};

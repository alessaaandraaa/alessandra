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
      queryClient.refetchQueries({ queryKey: ["links"] });
    },
    onError: (_error, _variables, context: any) => {
      if (context?.prevLinks) {
        queryClient.setQueryData(["links"], context.prevLinks);
      }
    },
  });
};

export const useEditLinksQuery = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, any>({
    mutationFn: async (linkData) => {
      const { id, ...rest } = linkData;
      const { data } = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/links/${id}`,
        rest,
      );
      return data;
    },
    onMutate: async (link: any) => {
      await queryClient.cancelQueries({ queryKey: ["links"] });

      const prevLinks = queryClient.getQueryData(["links"]);
      queryClient.setQueryData(["links"], (old: any) =>
        old.map((l: any) => (l._id === link.id ? { ...l, ...link } : l)),
      );

      return { prevLinks };
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

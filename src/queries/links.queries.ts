"use client";

import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useLinkRepository } from "@/repositories/repo.hooks";

const STALE_TIME = 1000 * 60 * 5;

export const getLinksQuery = () => {
  const { authState, repo } = useLinkRepository();
  return useQuery({
    queryKey: ["links", authState],
    queryFn: async () => {
      return await repo.getLinks();
    },
    staleTime: STALE_TIME,
  });
};

export const useAddLinksQuery = () => {
  const { authState, repo } = useLinkRepository();
  const queryClient = useQueryClient();
  return useMutation<any, Error, any, { prevLinks?: any[] }>({
    mutationFn: async (data) => {
      return await repo.addLinks(data);
    },
    onMutate: async (newLink: any) => {
      await queryClient.cancelQueries({ queryKey: ["links", authState] });

      const prevLinks = queryClient.getQueryData<any[]>(["links", authState]);
      queryClient.setQueryData(["links", authState], (old: any) => [
        ...(old ?? []),
        newLink,
      ]);

      return { prevLinks };
    },
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["links", authState] });
    },
    onError: (_error, _variables, context: any) => {
      if (context?.prevLinks) {
        queryClient.setQueryData(["links", authState], context.prevLinks);
      }
    },
  });
};

export const useEditLinksQuery = () => {
  const { authState, repo } = useLinkRepository();
  const queryClient = useQueryClient();
  return useMutation<any, Error, any>({
    mutationFn: async (linkData) => {
      return await repo.editLinks(linkData);
    },
    onMutate: async (link: any) => {
      await queryClient.cancelQueries({ queryKey: ["links", authState] });

      const prevLinks = queryClient.getQueryData(["links", authState]);
      queryClient.setQueryData(["links", authState], (old: any) =>
        old.map((l: any) => (l._id === link.id ? { ...l, ...link } : l)),
      );

      return { prevLinks };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["links", authState] });
    },
    onError: (_error, _variables, context: any) => {
      if (context?.prevLinks) {
        queryClient.setQueryData(["links", authState], context.prevLinks);
      }
    },
  });
};

export const useDeleteLinksQuery = () => {
  const { authState, repo } = useLinkRepository();
  const queryClient = useQueryClient();
  return useMutation<any, Error, any>({
    mutationFn: async (id) => {
      return await repo.deleteLinks(id);
    },
    onMutate: async (id: string) => {
      await queryClient.cancelQueries({ queryKey: ["links", authState] });

      const prevLinks = queryClient.getQueryData(["links", authState]);
      queryClient.setQueryData(["links", authState], (old: any) =>
        old.filter((l: any) => l._id !== id),
      );

      return { prevLinks };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["links", authState] });
    },
    onError: (_error, _variables, context: any) => {
      if (context?.prevLinks) {
        queryClient.setQueryData(["links", authState], context.prevLinks);
      }
    },
  });
};

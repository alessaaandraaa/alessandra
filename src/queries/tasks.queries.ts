"use client";

import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";

const STALE_TIME = 1000 * 60 * 5;

export const getTasksQuery = () => {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const response = await axios.get(
        "https://spotify-backend-eight-pink.vercel.app/api/tasks",
      );
      return response.data;
    },
    staleTime: STALE_TIME,
  });
};

export const useAddTasksQuery = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, any, { prevTasks?: any[] }>({
    mutationFn: async (data) => {
      const response = await axios.post(
        `https://spotify-backend-eight-pink.vercel.app/api/tasks`,
        data,
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (_error, _variables, context: any) => {
      if (context?.prevTasks) {
        queryClient.setQueryData(["tasks"], context.prevTasks);
      }
    },
  });
};

export const useEditTasksQuery = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, any>({
    mutationFn: async (tasksData) => {
      const { id, ...rest } = tasksData;
      const { data } = await axios.put(
        "https://spotify-backend-eight-pink.vercel.app/api/tasks",
        { id, ...rest },
      );
      return data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },

    onError: (error) => {
      console.error("Error editing task: ", error);
    },
  });
};

export const useDeleteTasksQuery = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, { id: number }>({
    mutationFn: async ({ id }) => {
      const { data } = await axios.delete(
        `https://spotify-backend-eight-pink.vercel.app/api/tasks`,
        {
          data: { id: id },
        },
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (error) => {
      console.error("Error deleting task:", error);
    },
  });
};

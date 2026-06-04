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
    onMutate: async (newTask: any) => {
      await queryClient.cancelQueries({ queryKey: ["tasks"] });

      const prevTasks = queryClient.getQueryData<any[]>(["tasks"]);
      queryClient.setQueryData(["tasks"], (old: any) => [
        ...(old ?? []),
        newTask,
      ]);

      return { prevTasks };
    },
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["tasks"] });
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
      const { _id, ...rest } = tasksData;

      console.log("TASK DATA: ", tasksData);
      const { data } = await axios.put(
        `https://spotify-backend-eight-pink.vercel.app/api/tasks/${_id}`,
        rest,
      );
      return data;
    },
    onMutate: async (task: any) => {
      await queryClient.cancelQueries({ queryKey: ["tasks"] });

      const prevTasks = queryClient.getQueryData(["tasks"]);
      queryClient.setQueryData(["tasks"], (old: any) =>
        old.map((t: any) => (t._id === task.id ? { ...t, ...task } : t)),
      );

      return { prevTasks };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },

    onError: (_error, _variables, context: any) => {
      if (context?.prevTasks) {
        queryClient.setQueryData(["tasks"], context.prevTasks);
      }
      console.error("Error editing task: ", _error);
    },
  });
};

export const useDeleteTasksQuery = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, any>({
    mutationFn: async (taskId) => {
      const { data } = await axios.delete(
        `https://spotify-backend-eight-pink.vercel.app/api/tasks/${taskId}`,
      );
      return data;
    },
    onMutate: async (taskId: string) => {
      await queryClient.cancelQueries({ queryKey: ["tasks"] });

      const prevTasks = queryClient.getQueryData(["tasks"]);
      queryClient.setQueryData(["tasks"], (old: any) =>
        old.filter((t: any) => t._id !== taskId),
      );

      return { prevTasks };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (_error, _variables, context: any) => {
      if (context?.prevTasks) {
        queryClient.setQueryData(["tasks"], context.prevTasks);
      }
      console.error("Error deleting task:", _error);
    },
  });
};

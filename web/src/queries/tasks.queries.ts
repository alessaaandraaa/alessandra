"use client";

import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useTaskRepository } from "@/repositories/repo.hooks";
const STALE_TIME = 1000 * 60 * 30;

export const getTasksQuery = () => {
  const { authState, repo } = useTaskRepository();
  return useQuery({
    queryKey: ["tasks", authState],
    queryFn: async () => {
      return await repo.getTasks();
    },
    staleTime: STALE_TIME,
  });
};

export const useAddTasksQuery = () => {
  const { authState, repo } = useTaskRepository();
  const queryClient = useQueryClient();
  return useMutation<any, Error, any, { prevTasks?: any[] }>({
    mutationFn: async (data) => {
      return await repo.addTask(data);
    },
    onMutate: async (newTask: any) => {
      await queryClient.cancelQueries({
        queryKey: ["tasks", authState],
      });

      const prevTasks = queryClient.getQueryData<any[]>(["tasks", authState]);
      queryClient.setQueryData(["tasks", authState], (old: any) => [
        ...(old ?? []),
        { ...newTask, _id: crypto.randomUUID() },
      ]);

      return { prevTasks };
    },
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["tasks", authState] });
    },
    onError: (_error, _variables, context: any) => {
      if (context?.prevTasks) {
        queryClient.setQueryData(["tasks", authState], context.prevTasks);
      }
    },
  });
};

export const useEditTasksQuery = () => {
  const { authState, repo } = useTaskRepository();
  const queryClient = useQueryClient();
  return useMutation<any, Error, any>({
    mutationFn: async (tasksData) => {
      return await repo.editTask(tasksData);
    },
    onMutate: async (task: any) => {
      await queryClient.cancelQueries({
        queryKey: ["tasks", authState],
      });

      const prevTasks = queryClient.getQueryData(["tasks", authState]);
      queryClient.setQueryData(["tasks", authState], (old: any) =>
        old.map((t: any) => (t._id === task.id ? { ...t, ...task } : t)),
      );

      return { prevTasks };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks", authState] });
    },

    onError: (_error, _variables, context: any) => {
      if (context?.prevTasks) {
        queryClient.setQueryData(["tasks", authState], context.prevTasks);
      }
      console.error("Error editing task: ", _error);
    },
  });
};

export const useDeleteTasksQuery = () => {
  const { authState, repo } = useTaskRepository();
  const queryClient = useQueryClient();

  return useMutation<any, Error, any>({
    mutationFn: async (taskId) => {
      return await repo.deleteTask(taskId);
    },
    onMutate: async (taskId: string) => {
      await queryClient.cancelQueries({
        queryKey: ["tasks", authState],
      });

      const prevTasks = queryClient.getQueryData(["tasks", authState]);
      queryClient.setQueryData(["tasks", authState], (old: any) =>
        old.filter((t: any) => t._id !== taskId),
      );

      return { prevTasks };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks", authState] });
    },
    onError: (_error, _variables, context: any) => {
      if (context?.prevTasks) {
        queryClient.setQueryData(["tasks", authState], context.prevTasks);
      }
      console.error("Error deleting task:", _error);
    },
  });
};

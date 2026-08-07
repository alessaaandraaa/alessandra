import { createContext, useContext, useState, useMemo } from "react";
import type {
  CanvasTask,
  CalendarEvent,
  BasicTask,
} from "@/lib/types/schema.types";
import {
  useEditTasksQuery,
  useAddTasksQuery,
  useDeleteTasksQuery,
} from "@/queries/tasks.queries";

type TasksContextType = {
  canvasTasks: CanvasTask[];
  basicTasks: BasicTask[];
  calendarEvents: CalendarEvent[];

  editTask: (data: any) => void;
  addTask: (data: any) => void;
  deleteTask: (data: string) => void;
};

const TasksContext = createContext<TasksContextType | null>(null);

export function TasksProvider({ children }: { children: React.ReactNode }) {
  const [canvasTasks] = useState<CanvasTask[]>([]);
  const [basicTasks] = useState<BasicTask[]>([]);

  const editTaskMutation = useEditTasksQuery();
  const addTaskMutation = useAddTasksQuery();
  const deleteTaskMutation = useDeleteTasksQuery();

  const calendarEvents = useMemo(() => {
    const normalizedCanvas: CalendarEvent[] = canvasTasks.map((task) => ({
      id: task.id,
      title: task.name,
      start: task.due,
      end: task.due,
      readOnly: true,
    }));

    const normalizedBasic: CalendarEvent[] = basicTasks.map((task) => ({
      _id: task._id,
      title: task.name,
      start: task.dueDate,
      end: task.dueDate,
      readOnly: true,
    }));

    return [...normalizedCanvas, ...normalizedBasic];
  }, [canvasTasks, basicTasks]);

  return (
    <TasksContext.Provider
      value={{
        canvasTasks,
        basicTasks,
        calendarEvents,
        editTask: editTaskMutation.mutate,
        addTask: addTaskMutation.mutate,
        deleteTask: deleteTaskMutation.mutate,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
}

export function useTasksContext() {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error("useTasks must be used within a TasksProvider");
  }
  return context;
}

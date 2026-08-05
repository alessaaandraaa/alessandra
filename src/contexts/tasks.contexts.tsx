import { createContext, useContext, useState, useMemo } from "react";
import type { CanvasTask, CalendarEvent, BasicTask } from "@/lib/types";

type TasksContextType = {
  canvasTasks: CanvasTask[];
  basicTasks: BasicTask[];
  calendarEvents: CalendarEvent[];
};

const TasksContext = createContext<TasksContextType | null>(null);

export function TasksProvider({ children }: { children: React.ReactNode }) {
  const [canvasTasks, setCanvasTasks] = useState<CanvasTask[]>([]);
  const [basicTasks, setBasicTasks] = useState<BasicTask[]>([]);

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
      }}
    >
      {children}
    </TasksContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error("useTasks must be used within a TasksProvider");
  }
  return context;
}

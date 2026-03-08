"use client";

import { getTasksQuery, useAddTasksQuery } from "@/queries/tasks.queries";
import type { BasicTask } from "@/lib/types";
import BaseTask from "./DoableBaseTask";
import TaskSkeleton from "../TaskSkeleton";
import TaskButtonList from "./TaskButtonsBase";

export default function DoableTasks() {
  const { data, isLoading } = getTasksQuery();
  const add = useAddTasksQuery();

  const addTask = (data: any) => {
    add.mutate(data);
  };

  return (
    <>
      <div className="flex-1 w-full flex flex-col bg-white/5 rounded-2xl p-2">
        {isLoading ? (
          <div className="flex flex-1 w-full items-center align-middle justify-center">
            <TaskSkeleton />
          </div>
        ) : (
          data.map((t: BasicTask) => <BaseTask task={t} />)
        )}
      </div>
      <TaskButtonList onAddTasks={addTask} />
    </>
  );
}

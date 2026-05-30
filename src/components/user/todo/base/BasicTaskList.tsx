import BaseTask from "./BaseTask";
import TaskSkeleton from "../TaskSkeleton";
import type { BasicTask } from "@/lib/types";

type CanvasProps = {
  loading: boolean;
  deleteTask: (data: any) => void;
  editTask: (data: any) => void;
  tasks: any;
};

export default function BasicTaskList({
  loading,
  tasks,
  deleteTask,
  editTask,
}: CanvasProps) {
  return (
    <>
      <div>
        {loading ? (
          <div className="flex flex-1 w-full items-center align-middle justify-center">
            <TaskSkeleton />
          </div>
        ) : tasks.length === 0 ? (
          <p className="text-white">No tasks!</p>
        ) : (
          tasks.map((t: BasicTask) => (
            <BaseTask
              task={t}
              onDeleteTasks={deleteTask}
              onEditTasks={editTask}
            />
          ))
        )}
      </div>
    </>
  );
}

import type { BasicTask } from "@/lib/types/schema.types";
import TaskEditButton from "./TaskEditButton";
import { formatReadableDate } from "@/lib/utils";
type TaskProps = {
  task: BasicTask;
  onEditTasks: (data: any) => void;
  onDeleteTasks: (data: any) => void;
};

export default function BaseTask({
  task,
  onEditTasks,
  onDeleteTasks,
}: TaskProps) {
  return (
    <div className="text-white mb-2 flex justify-between items-center bg-red-500/50 rounded-md p-1 px-2 shadow-2xl text-left min-w-60">
      <div>
        <p className="font-bold text-[10px]">{task.name}</p>
        <p className="font-thin text-[8px]">
          {formatReadableDate(String(task.dueDate))}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <TaskEditButton
          taskData={task}
          onEditTasks={onEditTasks}
          onDeleteTasks={onDeleteTasks}
        />
      </div>
    </div>
  );
}

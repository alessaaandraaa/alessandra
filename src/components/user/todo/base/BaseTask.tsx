import type { BasicTask } from "@/lib/types";
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
        ☐
        <TaskEditButton
          taskData={task}
          onEditTasks={onEditTasks}
          onDeleteTasks={onDeleteTasks}
        />
      </div>
    </div>
  );
}

/*
    <div className="bg-black/25 p-5 rounded-2xl gap-3 min-w-2xs shadow-2xl">
      <p className="text-white font-bold text-2xl m-3">TO-DO</p>
      <div className="text-white mb-3 bg-red-500/50 rounded-md p-2 shadow-2xl text-left">
        {/*STANDARD TO-DO 
        <p className="font-bold text-[10px]">TASK NAME</p>
        <p className="font-thin text-[8px]">Date</p>
      </div>

      <div className="text-black mb-3 bg-white rounded-md p-2 shadow-2xl text-left">

        <p className="font-bold text-[10px]">TASK NAME</p>
        <p className="font-thin text-[8px]">Date</p>
      </div>

      <div className="text-black bg-white rounded-md p-2 shadow-2xl text-left">
        <div className="flex gap-2">
          <div className="w-1 bg-blue-500"></div>
          <div>
            {" "}
            <p className="font-bold text-[10px]">TASK NAME</p>
            <p className="font-thin text-[8px]">Date</p>
          </div>
        </div>
      </div>
    </div>
*/

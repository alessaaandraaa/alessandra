import type { CanvasTask } from "@/lib/types/schema.types";
/*import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";*/
import { formatReadableDate } from "@/lib/utils";

type TaskProps = {
  task: CanvasTask;
};

export default function CanvasBaseTask({ task }: TaskProps) {
  return (
    <a href={task.url}>
      {" "}
      <div className="text-white mb-3 bg-emerald-700/50 rounded-md p-2 shadow-2xl text-left min-w-60 hover:border hover:border-white">
        <p className="font-bold text-[10px]">{task.name}</p>
        <p className="font-thin text-[8px]">{formatReadableDate(task.due)}</p>
      </div>
    </a>
  );
}

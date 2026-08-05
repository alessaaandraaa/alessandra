import CanvasBaseTask from "./CanvasBaseTask";
import TaskSkeleton from "../TaskSkeleton";

type CanvasProps = {
  loading: boolean;
  tasks: any;
};

export default function CanvasTasks({ loading, tasks }: CanvasProps) {
  return (
    <>
      {" "}
      <div className="flex flex-col rounded-2xl h-11/12">
        {loading ? (
          <div className="flex flex-1 w-full items-center align-middle justify-center">
            <TaskSkeleton />
          </div>
        ) : tasks.length === 0 ? (
          <p className="text-white">No tasks!</p>
        ) : (
          tasks.map((t: any) => <CanvasBaseTask task={t} key={t.id} />)
        )}
      </div>
    </>
  );
}

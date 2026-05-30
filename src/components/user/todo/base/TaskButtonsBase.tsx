import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import AddTaskForm from "./AddTaskForm";
import { useState } from "react";
import TasksPagination from "./TasksPagination";

type props = {
  onAddTasks: (data: any) => void;
  tasksPerPage: number;
  totalPosts: number;
  currentPage: number;
  noOfPages: number;
  paginate: (pageNumber: number) => void;
};

export default function TaskButtonListBase({
  onAddTasks,
  tasksPerPage,
  totalPosts,
  currentPage,
  noOfPages,
  paginate,
}: props) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl m-2 flex gap-2 justify-center items-center">
      <TasksPagination
        tasksPerPage={tasksPerPage}
        totalPosts={totalPosts}
        currentPage={currentPage}
        paginate={paginate}
        noOfPages={noOfPages}
      />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button
            style={{
              backgroundColor: "rgba(255, 255, 255)",
              fontSize: "10px",
              padding: "1px",
              height: "20px",
              width: "20px",
              borderRadius: "50%",
              fontWeight: "bold",
            }}
          >
            +
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-106.25">
          <DialogTitle>Add Task</DialogTitle>
          <AddTaskForm onAddTasks={onAddTasks} onClose={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

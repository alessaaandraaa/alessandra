import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import AddTaskForm from "./AddTaskForm";

type props = {
  onAddTasks: (data: any) => void;
};

export default function TaskButtonListBase({ onAddTasks }: props) {
  return (
    <div className="rounded-xl m-2 flex gap-2 justify-center items-center">
      <Dialog>
        <DialogTrigger asChild>
          {/* Now the button is the direct child of the flex container! */}
          <button
            style={{
              fontSize: "10px",
              padding: "1px",
              height: "20px",
              width: "20px",
              borderRadius: "50%",
              fontWeight: "bold",
            }}
          >
            -
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-106.25">
          <DialogTitle>Hello</DialogTitle>
          <p>hi</p>
        </DialogContent>
      </Dialog>

      <button
        className="bg-white p-0.5"
        style={{
          fontSize: "10px",
          padding: "1px",
          height: "20px",
          width: "20px",
          borderRadius: "50%",
          fontWeight: "bold",
        }}
      >
        &lt;
      </button>

      <button
        className="bg-white p-0.5"
        style={{
          fontSize: "10px",
          padding: "1px",
          height: "20px",
          width: "20px",
          borderRadius: "50%",
          fontWeight: "bold",
        }}
      >
        &gt;
      </button>

      <Dialog>
        <DialogTrigger asChild>
          <button
            style={{
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
          <AddTaskForm onAddTasks={onAddTasks} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

import Tasks from "./Tasks";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import AddTaskForm from "./AddTaskForm";

export default function TaskButtonList() {
  return (
    <div className="rounded-xl m-2 flex gap-2 justify-center">
      <Dialog>
        <form>
          <DialogTrigger asChild>
            <Button variant="outline">-</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogTitle>Hello</DialogTitle>
            <p>hi</p>
          </DialogContent>
        </form>
      </Dialog>
      <button className="bg-white p-0.5 text-[2px]">&lt;</button>
      <button className="bg-white p-0.5 text-[2px]">&gt;</button>
      <Dialog>
        <form>
          <DialogTrigger asChild>
            <Button variant="outline">+</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogTitle>Add Task</DialogTitle>
            <AddTaskForm />
          </DialogContent>
        </form>
      </Dialog>
    </div>
  );
}

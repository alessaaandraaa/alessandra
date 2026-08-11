import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import EditTaskForm from "./EditTaskForm";
import type { BasicTask } from "@/lib/types/schema.types";

type EditTaskProps = {
  taskData: BasicTask;
};

export default function TaskEditButton({ taskData }: EditTaskProps) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon-sm" className="text-black p-0.5!">
          ⮞
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>
        <EditTaskForm taskData={taskData} onClose={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}

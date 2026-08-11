"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import TaskFormFields, { formSchema } from "./TaskFormFields";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Card, CardContent } from "@/components/ui/card";
import {
  useEditTasksQuery,
  useDeleteTasksQuery,
} from "@/queries/tasks.queries";

type props = {
  taskData: any;
  onClose: () => void;
};

export default function EditTaskForm({ taskData, onClose }: props) {
  const edit = useEditTasksQuery();
  const del = useDeleteTasksQuery();

  async function onDelete() {
    try {
      await del.mutateAsync(taskData._id);
      onClose();
    } catch (error) {
      console.error(error);
    }
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: taskData.name,
      notes: taskData.notes ?? "",
      priority: taskData.priority,
      dueDate: taskData.dueDate,
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const body = {
      ...data,
      _id: taskData._id,
    };

    edit.mutateAsync(body);
    onClose();
    form.reset();
  }

  return (
    <Card className="w-full sm:max-w-md">
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <TaskFormFields
            control={form.control}
            reset={form.reset}
            onDelete={onDelete}
          />
        </form>
      </CardContent>
    </Card>
  );
}

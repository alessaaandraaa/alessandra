"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import TaskFormFields, { formSchema } from "./TaskFormFields";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Card, CardContent } from "@/components/ui/card";

type props = {
  onEditTasks: (data: any) => void;
  taskData: any;
  onDeleteTasks: () => void;
  onClose: () => void;
};

l;

export default function EditTaskForm({
  onEditTasks,
  taskData,
  onDeleteTasks,
  onClose,
}: props) {
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

    console.log("BODY:", body);

    onEditTasks(body);
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
            onDelete={onDeleteTasks}
          />
        </form>
      </CardContent>
    </Card>
  );
}

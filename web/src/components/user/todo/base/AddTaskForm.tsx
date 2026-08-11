"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import TaskFormFields, { formSchema } from "./TaskFormFields";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Card, CardContent } from "@/components/ui/card";
import { useAddTasksQuery } from "@/queries/tasks.queries";

type props = {
  onClose: () => void;
};

export default function AddTaskForm({ onClose }: props) {
  const add = useAddTasksQuery();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "To-Do Task 1",
      notes: "",
      priority: "moderate",
      dueDate: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const body = {
      ...data,
      status: "ongoing",
    };
    add.mutateAsync(body);
    form.reset();
    onClose();
  }

  return (
    <Card className="w-full sm:max-w-md">
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <TaskFormFields control={form.control} reset={form.reset} />
        </form>
      </CardContent>
    </Card>
  );
}

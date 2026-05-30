"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import TaskFormFields, { formSchema } from "./TaskFormFields";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Card, CardContent } from "@/components/ui/card";

type props = {
  onAddTasks: (data: any) => void;
  onClose: () => void;
};

export default function AddTaskForm({ onAddTasks, onClose }: props) {
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
    onAddTasks(body);
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

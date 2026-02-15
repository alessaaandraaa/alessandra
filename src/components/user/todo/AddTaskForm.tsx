"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const priorities = [
  {
    id: "high",
    name: "high",
    color: "text-red-500",
  },
  {
    id: "moderate",
    name: "moderate",
    color: "text-orange-500",
  },
  {
    id: "low",
    name: "low",
    color: "text-green-500",
  },
  {
    id: "backlog",
    name: "backlog",
    color: "text-gray-500",
  },
];

const formSchema = z.object({
  name: z.string().min(1, "Please add a name."),
  notes: z.string(),
  priority: z.string().min(1, "Please choose a priority."),
  dueDate: z.iso.date(),
});

export default function AddTaskForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "To-Do Task 1",
      notes: "",
      priority: "medium",
      dueDate: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const body = {
      ...data,
      status: "ongoing",
      type: "basic",
    };

    console.log("BODY: ", body);

    const response = await fetch(
      "https://spotify-backend-eight-pink.vercel.app/api/tasks",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    const res = await response.json();
    console.log("Response: ", res);
  }

  return (
    <Card className="w-full sm:max-w-md">
      <CardContent>
        <form id="form-add-task" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-add-task-name">
                    Task Name
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="Task Name"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="dueDate"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-add-task-duedate">
                    Due Date
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-title"
                    aria-invalid={fieldState.invalid}
                    type="date"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="priority"
              control={form.control}
              render={({ field, fieldState }) => (
                <FieldSet data-invalid={fieldState.invalid}>
                  <FieldLegend>Priority</FieldLegend>
                  <RadioGroup
                    name={field.name}
                    value={field.value}
                    onValueChange={field.onChange}
                    aria-invalid={fieldState.invalid}
                    className="flex"
                  >
                    {priorities.map((p) => (
                      <FieldLabel key={p.id} htmlFor={`form-add-task-${p.id}`}>
                        <Field
                          orientation="horizontal"
                          data-invalid={fieldState.invalid}
                          style={{ padding: "2px" }}
                          className={p.color}
                        >
                          <FieldContent>
                            <FieldTitle>{p.name}</FieldTitle>
                          </FieldContent>
                          <RadioGroupItem
                            value={p.id}
                            id={`form-add-task-${p.id}`}
                            aria-invalid={fieldState.invalid}
                            style={{ padding: "1px" }}
                          />
                        </Field>
                      </FieldLabel>
                    ))}
                  </RadioGroup>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </FieldSet>
              )}
            />
            <Controller
              name="notes"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-add-task-notes">
                    Other Notes
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupTextarea
                      {...field}
                      id="form-rhf-demo-description"
                      placeholder="Perform this task and do X then do Y"
                      rows={6}
                      className="min-h-24 resize-none"
                      aria-invalid={fieldState.invalid}
                    />
                    <InputGroupAddon align="block-end">
                      <InputGroupText className="tabular-nums">
                        {field.value.length}/100 characters
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                  <FieldDescription></FieldDescription>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset
          </Button>
          <Button type="submit" form="form-add-task" className="text-black">
            Submit
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}

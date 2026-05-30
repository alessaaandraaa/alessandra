import type { Control } from "react-hook-form";
import { Controller } from "react-hook-form";
import * as z from "zod";
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
import { Button } from "@/components/ui/button";

const priorities = [
  { id: "high", name: "high", color: "text-red-500" },
  { id: "moderate", name: "moderate", color: "text-orange-500" },
  { id: "low", name: "low", color: "text-green-500" },
  { id: "backlog", name: "backlog", color: "text-gray-500" },
];

export const formSchema = z.object({
  name: z.string().min(1, "Please add a name."),
  notes: z.string(),
  priority: z.string().min(1, "Please choose a priority."),
  dueDate: z.string().min(1, "Please select a date"),
});

export type TaskFormSchema = z.infer<typeof formSchema>;

type props = {
  control: Control<TaskFormSchema>;
  reset: () => void;
  onDelete?: () => void;
};

export default function TaskFormFields({ control, reset, onDelete }: props) {
  return (
    <>
      <FieldGroup>
        <Controller
          name="name"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-add-task-name">Task Name</FieldLabel>
              <Input
                {...field}
                id="form-add-task-name"
                aria-invalid={fieldState.invalid}
                placeholder="Task Name"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="dueDate"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-add-task-duedate">Due Date</FieldLabel>
              <Input
                {...field}
                id="form-add-task-duedate"
                aria-invalid={fieldState.invalid}
                type="date"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="priority"
          control={control}
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
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </FieldSet>
          )}
        />
        <Controller
          name="notes"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-add-task-notes">Other Notes</FieldLabel>
              <InputGroup>
                <InputGroupTextarea
                  {...field}
                  id="form-add-task-notes"
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
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      <Field orientation="horizontal">
        <Button type="button" variant="outline" onClick={() => reset()}>
          Reset
        </Button>
        {onDelete && (
          <Button type="button" variant="destructive" onClick={onDelete}>
            Delete
          </Button>
        )}
        <Button type="submit" className="text-black bg-white">
          Submit
        </Button>
      </Field>
    </>
  );
}

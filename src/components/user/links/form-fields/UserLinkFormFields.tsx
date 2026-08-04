import type { Control } from "react-hook-form";
import { Controller } from "react-hook-form";
import * as z from "zod";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

const categories = [
  { id: "Main", name: "Main" },
  { id: "Projects", name: "Projects" },
];

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const userLinkFormSchema = z.object({
  name: z.string().min(1, "Please add a name."),
  link: z.url("Please enter a valid URL."),
  image: z
    .any()
    .refine(
      (file) => !file || file?.size <= MAX_FILE_SIZE,
      `Max image size is 5MB.`,
    )
    .refine(
      (file) => !file || ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported.",
    ),
  categories: z.array(z.string()).min(1, "At least one category is required"),
});

export type UserLinkFormSchema = z.infer<typeof userLinkFormSchema>;

type props = {
  control: Control<UserLinkFormSchema>;
  reset: () => void;
};

export default function UserLinkFormFields({ control, reset }: props) {
  return (
    <>
      <FieldGroup className="space-y-0">
        {/* Link Name */}
        <Controller
          name="name"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel className="text-[11px] uppercase tracking-wider text-zinc-500 mb-1">
                Link Name
              </FieldLabel>
              <Input
                {...field}
                className="h-8 text-sm px-2"
                placeholder="Canvas"
              />
              {fieldState.invalid && (
                <FieldError
                  className="text-[10px]"
                  errors={[fieldState.error]}
                />
              )}
            </Field>
          )}
        />

        {/* Link URL */}
        <Controller
          name="link"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel className="text-[11px] uppercase tracking-wider text-zinc-500 mb-1">
                Link URL
              </FieldLabel>
              <Input
                {...field}
                className="h-8 text-sm px-2"
                placeholder="https://..."
              />
              {fieldState.invalid && (
                <FieldError
                  className="text-[10px]"
                  errors={[fieldState.error]}
                />
              )}
            </Field>
          )}
        />

        {/* Link Image */}
        <Controller
          name="image"
          control={control}
          render={({ field: { value, onChange, ...field }, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel className="text-[11px] uppercase tracking-wider text-zinc-500 mb-1">
                Link Image
              </FieldLabel>
              <Input
                {...field}
                type="file"
                accept="image/png, image/jpeg"
                className="h-8 text-xs pt-1 file:mr-2 file:bg-zinc-100 file:border-0 file:text-[10px] file:font-bold cursor-pointer"
                onChange={(e) => onChange(e.target.files?.[0])}
              />
              {fieldState.invalid && (
                <FieldError
                  className="text-[10px]"
                  errors={[fieldState.error]}
                />
              )}
            </Field>
          )}
        />

        {/* Categories - Horizontal */}
        <Controller
          name="categories"
          control={control}
          render={({ field }) => (
            <FieldSet className="pt-1">
              <FieldLegend className="text-[11px] uppercase tracking-wider text-zinc-500 mb-2">
                Categories
              </FieldLegend>
              <div className="flex gap-4">
                {categories.map((cat) => (
                  <div key={cat.id} className="flex items-center gap-2">
                    <Checkbox
                      id={cat.id}
                      // FIX: Force background to be white/zinc and the checkmark icon to be black
                      className="h-4 w-4 border-zinc-300 bg-white data-[state=checked]:bg-zinc-100 data-[state=checked]:text-black"
                      checked={field.value.includes(cat.id)}
                      onCheckedChange={(checked) => {
                        const newValue = checked
                          ? [...field.value, cat.id]
                          : field.value.filter((v) => v !== cat.id);
                        field.onChange(newValue);
                      }}
                    />
                    <label
                      htmlFor={cat.id}
                      className="text-xs font-medium cursor-pointer text-black"
                    >
                      {cat.name}
                    </label>
                  </div>
                ))}
              </div>
            </FieldSet>
          )}
        />
      </FieldGroup>

      {/* Buttons */}
      <div className="flex justify-end gap-2 pt-2 mt-2 border-t border-zinc-100">
        <Button
          type="button"
          variant="ghost"
          className="h-7 text-[11px] px-3"
          onClick={() => reset()}
        >
          Reset
        </Button>
        <Button
          type="submit"
          className="h-7 text-[11px] px-4 bg-white text-black hover:bg-zinc-50"
        >
          Add Link
        </Button>
      </div>
    </>
  );
}

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

const categories = [
  { id: "Main", name: "Main" },
  { id: "Projects", name: "Projects" },
];

type props = {
  onAddLinks: (data: any) => void;
};

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const formSchema = z.object({
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

export default function AddLinksForm({ onAddLinks }: props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "To-Do Task 1",
      link: "",
      image: undefined,
      categories: ["Main"],
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    // Helper function to convert File to Base64
    const fileToBase64 = (file: File): Promise<string> => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file); // This reads the file and includes the metadata (e.g., data:image/png;base64,...)
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
      });
    };

    try {
      let base64Image = "";

      // Only attempt conversion if an image actually exists
      if (data.image instanceof File) {
        base64Image = await fileToBase64(data.image);
      }

      const body = { ...data, image: base64Image };

      // Calculate size in bytes
      const sizeInBytes = new Blob([JSON.stringify(body)]).size;
      const sizeInMB = (sizeInBytes / (1024 * 1024)).toFixed(2);

      if (sizeInBytes > 4500000) {
        console.error("Warning: This exceeds Vercel's 4.5MB limit!");
      }

      onAddLinks(body); // Passing the string-heavy body to your parent component
      form.reset();
    } catch (error) {
      console.error("Error converting image to Base64:", error);
    }
  }

  return (
    <Card className="w-full sm:max-w-md border border-zinc-200 shadow-none p-1">
      <CardContent className="p-2">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-0">
          <FieldGroup className="space-y-0">
            {/* Link Name */}
            <Controller
              name="name"
              control={form.control}
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
              control={form.control}
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
              control={form.control}
              render={({
                field: { value, onChange, ...field },
                fieldState,
              }) => (
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
              control={form.control}
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
              onClick={() => form.reset()}
            >
              Reset
            </Button>
            <Button
              type="submit"
              className="h-7 text-[11px] px-4 bg-white text-black hover:bg-zinc-50"
            >
              SAVE FILE
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

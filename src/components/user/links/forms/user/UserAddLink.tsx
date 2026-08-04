"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Card, CardContent } from "@/components/ui/card";
import UserLinkFormFields from "../../form-fields/UserLinkFormFields";
import { userFormSchema } from "@/lib/types/forms.types";

type props = {
  onAddLinks: (data: any) => void;
};

export default function UserAddLinksForm({ onAddLinks }: props) {
  const form = useForm<z.infer<typeof userFormSchema>>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      name: "Link 1",
      link: "",
      image: undefined,
      categories: ["Main"],
    },
  });

  async function onSubmit(data: z.infer<typeof userFormSchema>) {
    const fileToBase64 = (file: File): Promise<string> => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
      });
    };

    try {
      let base64Image = "";

      if (data.image instanceof File) {
        base64Image = await fileToBase64(data.image);
      }

      const body = { ...data, image: base64Image };

      const sizeInBytes = new Blob([JSON.stringify(body)]).size;

      if (sizeInBytes > 4500000) {
        console.error("Warning: This exceeds Vercel's 4.5MB limit!");
      }

      onAddLinks(body);
      form.reset();
    } catch (error) {
      console.error("Error converting image to Base64:", error);
    }
  }

  return (
    <Card className="w-full sm:max-w-md border border-zinc-200 shadow-none p-1">
      <CardContent className="p-2">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-0">
          <UserLinkFormFields control={form.control} reset={form.reset} />
        </form>
      </CardContent>
    </Card>
  );
}

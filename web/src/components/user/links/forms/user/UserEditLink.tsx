"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Card, CardContent } from "@/components/ui/card";
import UserLinkFormFields from "../../form-fields/UserLinkFormFields";
import { userFormSchema } from "@/lib/types/forms.types";

type Link = {
  id: string;
  name: string;
  link: string;
  imgLink: string;
};

type props = {
  onEditLink: (data: any) => void;
  linkData: Link;
  onClose: () => void;
};

export default function UserEditLinkForm({
  onEditLink,
  linkData,
  onClose,
}: props) {
  const form = useForm<z.infer<typeof userFormSchema>>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      name: linkData.name,
      link: linkData.link,
      image: undefined,
      categories: ["Main"],
    },
  });

  async function onSubmit(data: z.infer<typeof userFormSchema>) {
    // Helper function to convert File to Base64
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

      const id = linkData.id;
      const body = { ...data, id, image: base64Image || linkData.imgLink };

      onEditLink(body);
      onClose();
      form.reset();
    } catch (error) {
      console.error("Error converting image to Base64:", error);
    }
  }

  return (
    <Card className="w-full sm:max-w-md border border-zinc-200 shadow-none p-1">
      <CardContent
        className="p-2"
        style={{
          backgroundColor: "rgba(255, 255, 255)",
        }}
      >
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-0">
          <UserLinkFormFields control={form.control} reset={form.reset} />
        </form>
      </CardContent>
    </Card>
  );
}

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Card, CardContent } from "@/components/ui/card";
import GuestLinkFormFields from "../../form-fields/GuestLinkFormFields";
import { guestFormSchema } from "@/lib/types/forms.types";

type props = {
  onAddLinks: (data: any) => void;
};

export default function GuestAddLinksForm({ onAddLinks }: props) {
  const form = useForm<z.infer<typeof guestFormSchema>>({
    resolver: zodResolver(guestFormSchema),
    defaultValues: {
      name: "Link",
      link: "",
      image: "",
      categories: ["Main"],
    },
  });

  async function onSubmit(data: z.infer<typeof guestFormSchema>) {
    try {
      const body = { ...data };
      onAddLinks(body);
      form.reset();
    } catch (error) {
      console.error("Error.", error);
    }
  }

  return (
    <Card className="w-full sm:max-w-md border border-zinc-200 shadow-none p-1">
      <CardContent className="p-2">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-0">
          <GuestLinkFormFields control={form.control} reset={form.reset} />
        </form>
      </CardContent>
    </Card>
  );
}

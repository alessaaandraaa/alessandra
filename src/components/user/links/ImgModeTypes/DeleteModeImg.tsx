import { useState } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useLinksContext } from "@/contexts/links.contexts";

type EditModeImgProps = {
  imgLink: string;
  name: string;
  id: string;
};

export default function DeleteModeImg({ imgLink, name, id }: EditModeImgProps) {
  const { deleteLink } = useLinksContext();
  const [open, setOpen] = useState(false);

  async function onDelete() {
    try {
      deleteLink(id);
      setOpen(false);
    } catch (error) {
      console.error("Error deleting image.", error);
    }
  }
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <div>
          <img
            src={imgLink}
            alt={name}
            className="object-cover w-13.5 h-13.5 rounded-xl"
          />
          <div className="absolute inset-0 rounded-xl bg-black/40 flex items-center justify-center">
            x
          </div>
        </div>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button onClick={onDelete}>Continue</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

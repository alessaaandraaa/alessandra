import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import EditLinksForm from "../forms/EditLinksForm";
import { useLinksContext } from "@/contexts/links.contexts";

type EditModeImgProps = {
  imgLink: string;
  link: string;
  name: string;
  id: string;
};

export default function EditModeImg({
  imgLink,
  link,
  name,
  id,
}: EditModeImgProps) {
  const { editLink } = useLinksContext();
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div>
          <img
            src={imgLink}
            alt={name}
            className="object-cover w-13.5 h-13.5 rounded-xl"
          />
          <div className="absolute inset-0 rounded-xl bg-black/40 flex items-center justify-center">
            ✎
          </div>
        </div>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Link</DialogTitle>
        </DialogHeader>
        <EditLinksForm
          onEditLink={editLink}
          linkData={{ id, name, link, imgLink }}
          onClose={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}

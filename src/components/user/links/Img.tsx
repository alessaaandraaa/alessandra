import { useLinksContext } from "@/contexts/links.contexts";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import EditLinkForm from "./EditLinkForm";

type ImgProps = {
  imgLink: string;
  link: string;
  name: string;
  id: string;
};

export default function Img({ imgLink, link, name, id }: ImgProps) {
  const { editMode, editLink } = useLinksContext();
  const [open, setOpen] = useState(false);
  return (
    <div className="cursor-pointer group select-none">
      <div className="p-1 rounded-2xl text-[8px] text-white hover:bg-zinc-200 hover:text-[#4c4439ce] flex flex-col items-center align-middle">
        <div className="relative">
          {!editMode ? (
            <a href={link} target="_top" className="no-underline block">
              <img
                src={imgLink}
                alt={name}
                className="object-cover w-13.5 h-13.5 rounded-xl"
              />
            </a>
          ) : (
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
                <EditLinkForm
                  onEditLink={editLink}
                  linkData={{ id, name, link, imgLink }}
                  onClose={() => setOpen(false)}
                />
              </DialogContent>
            </Dialog>
          )}
        </div>

        <p className="mt-2">{name}</p>
      </div>
    </div>
  );
}

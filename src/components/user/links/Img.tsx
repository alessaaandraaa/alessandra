import { useLinksContext } from "@/contexts/links.contexts";
import DefaultImg from "./ImgModeTypes/DefaultImg";
import DeleteModeImg from "./ImgModeTypes/DeleteModeImg";
import EditModeImg from "./ImgModeTypes/EditModeImg";
type ImgProps = {
  imgLink: string;
  link: string;
  name: string;
  id: string;
};

export default function Img({ imgLink, link, name, id }: ImgProps) {
  const { mode } = useLinksContext();
  return (
    <div className="cursor-pointer group select-none">
      <div className="p-1 rounded-2xl text-[8px] text-white hover:bg-zinc-200 hover:text-[#4c4439ce] flex flex-col items-center align-middle">
        <div className="relative">
          {(() => {
            if (mode === "default")
              return <DefaultImg imgLink={imgLink} link={link} name={name} />;
            if (mode === "edit")
              return (
                <EditModeImg
                  imgLink={imgLink}
                  link={link}
                  name={name}
                  id={id}
                />
              );
            return <DeleteModeImg imgLink={imgLink} name={name} id={id} />;
          })()}
        </div>

        <p className="mt-2">{name}</p>
      </div>
    </div>
  );
}

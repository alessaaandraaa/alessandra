type ImgProps = {
  imgLink: string;
  link: string;
  name: string;
};

export default function Img({ imgLink, link, name }: ImgProps) {
  return (
    <div className="cursor-pointer group select-none">
      <a href={link} target="_top" className="no-underline">
        <div className="p-3 rounded-2xl text-[10px] text-white hover:bg-zinc-200 hover:text-[#4c4439ce]">
          <img
            src={imgLink}
            className="object-cover w-16.5 h-16.5 rounded-xl"
          ></img>
          <p className="mt-2">{name}</p>
        </div>
      </a>
    </div>
  );
}

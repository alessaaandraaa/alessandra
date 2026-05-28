type DefaultImgProps = {
  imgLink: string;
  link: string;
  name: string;
};

export default function DefaultImg({ imgLink, link, name }: DefaultImgProps) {
  return (
    <a href={link} target="_top" className="no-underline block">
      <img
        src={imgLink}
        alt={name}
        className="object-cover w-13.5 h-13.5 rounded-xl"
      />
    </a>
  );
}

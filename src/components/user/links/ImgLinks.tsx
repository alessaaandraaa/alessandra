import Img from "./Img";
import TaskSkeleton from "../todo/TaskSkeleton";
type props = {
  links: any;
  isLoading: boolean;
};

export default function ImgLinks({ links, isLoading }: props) {
  return (
    <>
      {isLoading ? (
        <div className="items-center relative group">
          <div className="flex justify-center items-center w-full gap-0.5 p-2 rounded-2xl z-10 bg-zinc-700/50 h-45">
            {" "}
            <TaskSkeleton />
          </div>
        </div>
      ) : (
        <div className="items-center relative group">
          <div className="grid grid-cols-7 grid-rows-2 content-start gap-0.5 p-2 rounded-2xl z-10 bg-zinc-700/50 h-45">
            {links?.map((l: any, index: number) => (
              <Img key={index} imgLink={l.image} link={l.link} name={l.name} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

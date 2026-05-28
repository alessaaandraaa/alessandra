import { useLinksContext } from "@/contexts/links.contexts";
import AddLinksForm from "./AddLinksForm";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
type PaginationProps = {
  tasksPerPage: number;
  totalPosts: number;
  currentPage: number;
  paginate: (pageNumber: number) => void;
  onAddLinks: (data: any) => void;
};

export default function LinksPagination({
  tasksPerPage,
  totalPosts,
  currentPage,
  paginate,
  onAddLinks,
}: PaginationProps) {
  const totalPages = Math.ceil(totalPosts / tasksPerPage);
  const { mode, toggleMode } = useLinksContext();

  return (
    <div className="rounded-xl m-2 flex gap-10 justify-center items-center">
      <button
        className="bg-white p-0.5 hover:bg-black hover:text-white text-black"
        style={{
          backgroundColor: "rgba(255, 255, 255)",
          fontSize: "10px",
          padding: "1px",
          height: "20px",
          width: "20px",
          borderRadius: "50%",
          fontWeight: "bold",
        }}
        onClick={() => paginate(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &lt;
      </button>

      <Dialog>
        <DialogTrigger asChild>
          <button
            className="hover:text-red-800"
            style={{
              backgroundColor: "rgba(255, 255, 255)",
              fontSize: "10px",
              padding: "1px",
              height: "20px",
              width: "20px",
              borderRadius: "50%",
              fontWeight: "bold",
            }}
          >
            +
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-106.25">
          <DialogTitle>Add Task</DialogTitle>
          <AddLinksForm onAddLinks={onAddLinks} />
        </DialogContent>
      </Dialog>
      <button
        className=" hover:text-red-800 text-black"
        style={{
          fontSize: "8px",
          backgroundColor: "rgba(255, 255, 255)",
          padding: "1px",
          height: "20px",
          width: "20px",
          borderRadius: "50%",
        }}
        onClick={() => toggleMode("edit")}
      >
        ✎
      </button>

      <button
        className=" hover:text-red-800 text-black"
        style={{
          fontSize: "8px",
          backgroundColor: "rgba(255, 255, 255)",
          padding: "1px",
          height: "20px",
          width: "20px",
          borderRadius: "50%",
        }}
        onClick={() => toggleMode("delete")}
      >
        🗑
      </button>

      <button
        className=" p-0.5 hover:text-red-800"
        style={{
          backgroundColor: "rgba(255, 255, 255)",
          fontSize: "10px",
          padding: "1px",
          height: "20px",
          width: "20px",
          borderRadius: "50%",
          fontWeight: "bold",
        }}
        onClick={() => paginate(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        &gt;
      </button>
    </div>
  );
}

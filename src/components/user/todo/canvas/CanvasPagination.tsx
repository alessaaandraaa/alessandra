type PaginationProps = {
  tasksPerPage: number;
  totalPosts: number;
  currentPage: number;
  noOfPages: number;
  paginate: (pageNumber: number) => void;
};

export default function CanvasPagination({
  tasksPerPage,
  totalPosts,
  currentPage,
  noOfPages,
  paginate,
}: PaginationProps) {
  const totalPages = Math.ceil(totalPosts / tasksPerPage);

  return (
    <div className="rounded-xl m-2 flex gap-2 justify-center items-center">
      <button
        className="bg-white p-0.5"
        style={{
          fontSize: "10px",
          padding: "1px",
          height: "20px",
          width: "20px",
          borderRadius: "50%",
          fontWeight: "bold",
          backgroundColor: "white",
        }}
        onClick={() => paginate(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &lt;
      </button>

      <p className="text-white font-bold text-sm">
        {currentPage} of {noOfPages}
      </p>

      <button
        className="bg-white p-0.5"
        style={{
          backgroundColor: "white",
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

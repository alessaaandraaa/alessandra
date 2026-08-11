"use client";

import { useState } from "react";
import CanvasTasks from "./CanvasTasks";
import CanvasPagination from "./CanvasPagination";
import { getCanvasQuery } from "@/queries/canvas.queries";

export default function CanvasMain() {
  const { data, isLoading } = getCanvasQuery();

  const [page, setPage] = useState(1);
  const [tasksPerPage] = useState(4);

  const indexOfLastTask = page * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = (data || []).slice(indexOfFirstTask, indexOfLastTask);
  const length = (data || []).length;

  const noOfPages = Math.max(1, Math.ceil(length / tasksPerPage));

  const paginate = (pageNumber: number) => setPage(pageNumber);

  return (
    <>
      {" "}
      <div className="flex-1 w-full flex flex-col bg-white/5 rounded-2xl p-2 h-11/12">
        <CanvasTasks loading={isLoading} tasks={currentTasks} />
      </div>
      <CanvasPagination
        tasksPerPage={tasksPerPage}
        totalPosts={length}
        currentPage={page}
        paginate={paginate}
        noOfPages={noOfPages}
      />
    </>
  );
}

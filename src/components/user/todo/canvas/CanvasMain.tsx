"use client";

import { useState, useEffect } from "react";
import CanvasTasks from "./CanvasTasks";
import axios from "axios";
import CanvasPagination from "./CanvasPagination";

export default function CanvasMain() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [tasksPerPage] = useState(4);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      const res = await axios.get(
        "https://spotify-backend-eight-pink.vercel.app/api/canvas",
      );
      console.log(res.data);

      setTasks(res.data);
      setLoading(false);
    };

    fetchTasks();
  }, []);

  const indexOfLastTask = page * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

  const paginate = (pageNumber: number) => setPage(pageNumber);

  return (
    <>
      {" "}
      <div className="flex-1 w-full flex flex-col bg-white/5 rounded-2xl p-2 h-11/12">
        <CanvasTasks loading={loading} tasks={currentTasks} />
      </div>
      <CanvasPagination
        tasksPerPage={tasksPerPage}
        totalPosts={tasks.length}
        currentPage={page}
        paginate={paginate}
      />
    </>
  );
}

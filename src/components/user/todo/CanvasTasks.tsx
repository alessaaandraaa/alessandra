"use client";

import { useState, useEffect } from "react";
import type { CanvasTask } from "@/lib/types";
import CanvasBaseTask from "./CanvasBaseTask";
import axios from "axios";
import TaskSkeleton from "./TaskSkeleton";

export default function CanvasTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

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

  return (
    <div className="flex-1 w-full flex flex-col bg-white/5 rounded-2xl p-2">
      {loading ? (
        <div className="flex flex-1 w-full items-center align-middle justify-center">
          <TaskSkeleton />
        </div>
      ) : tasks.length === 0 ? (
        <p className="text-white">No tasks!</p>
      ) : (
        tasks.map((t) => <CanvasBaseTask task={t} />)
      )}
    </div>
  );
}

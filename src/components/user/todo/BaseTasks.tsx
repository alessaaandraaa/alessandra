"use client";

import { useState, useEffect } from "react";
import type { BasicTask } from "@/lib/types";
import BaseTask from "./DoableBaseTask";
import axios from "axios";
import TaskSkeleton from "./TaskSkeleton";

export default function DoableTasks() {
  const [tasks, setTasks] = useState<BasicTask[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      const res = await axios.get(
        "https://spotify-backend-eight-pink.vercel.app/api/tasks",
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
      ) : (
        tasks.map((t) => <BaseTask task={t} />)
      )}
    </div>
  );
}

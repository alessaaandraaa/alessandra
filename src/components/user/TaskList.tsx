"use client";

import { useState, useEffect } from "react";
import type { BasicTask } from "@/lib/types";
import BaseTask from "./Tasks";
import axios from "axios";

export default function TaskList() {
  const [tasks, setTasks] = useState<BasicTask[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const res = await axios.get("/api/tasks");
      console.log(res.data);

      setTasks(res.data);
    };

    fetchTasks();
  }, []);

  return (
    <div className="bg-black/25 p-5 rounded-2xl gap-3 min-w-2xs shadow-2xl">
      <p className="text-white font-bold text-2xl m-3">TO-DO</p>
      {tasks.map((t) => (
        <BaseTask task={t} />
      ))}
    </div>
  );
}

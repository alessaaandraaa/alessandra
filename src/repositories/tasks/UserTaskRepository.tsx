import type { BasicTask } from "@/lib/types";
import type { TaskRepository } from "./TaskRepository";
import axios from "axios";
export class UserTaskRepository implements TaskRepository {
  async getTasks() {
    const response = await axios.get(
      "https://spotify-backend-eight-pink.vercel.app/api/tasks",
      {
        withCredentials: true,
      },
    );
    return response.data;
  }

  async addTask(task: BasicTask) {
    const response = await axios.post(
      `https://spotify-backend-eight-pink.vercel.app/api/tasks`,
      task,
      {
        withCredentials: true,
      },
    );
    return response.data;
  }

  async editTask(task: BasicTask) {
    const { _id, ...rest } = task;
    const { data } = await axios.put(
      `https://spotify-backend-eight-pink.vercel.app/api/tasks/${_id}`,
      rest,
      {
        withCredentials: true,
      },
    );
    return data;
  }

  async deleteTask(taskId: string) {
    const { data } = await axios.delete(
      `https://spotify-backend-eight-pink.vercel.app/api/tasks/${taskId}`,
      {
        withCredentials: true,
      },
    );
    return data;
  }
}

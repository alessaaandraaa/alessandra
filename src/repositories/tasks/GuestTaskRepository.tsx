import type { BasicTask } from "@/lib/types";
import type { TaskRepository } from "./TaskRepository";

export class GuestTaskRepository implements TaskRepository {
  async getTasks() {
    return JSON.parse(localStorage.getItem("tasks") ?? "[]");
  }

  async addTask(task: BasicTask) {
    const tasks = await this.getTasks();
    const updated = [...tasks, task];

    localStorage.setItem("tasks", JSON.stringify(updated));

    return task;
  }

  async editTask(task: BasicTask) {
    const tasks = await this.getTasks();

    const updated = tasks.map((t: any) => (t._id === task._id ? task : t));

    localStorage.setItem("tasks", JSON.stringify(updated));

    return task;
  }

  async deleteTask(taskId: string) {
    const tasks = await this.getTasks();

    const updated = tasks.filter((t: any) => t._id !== taskId);

    localStorage.setItem("tasks", JSON.stringify(updated));
  }
}

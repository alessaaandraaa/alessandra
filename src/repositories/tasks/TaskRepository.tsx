import type { BasicTask } from "@/lib/types/schema.types";

export interface TaskRepository {
  getTasks(): Promise<BasicTask[]>;
  addTask(task: BasicTask): Promise<BasicTask>;
  editTask(task: BasicTask): Promise<BasicTask>;
  deleteTask(taskId: string): Promise<void>;
}

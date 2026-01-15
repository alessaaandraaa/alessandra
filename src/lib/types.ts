export interface BaseTask {
  _id: string;
  type: "school" | "subscription" | "basic";
  name: string;
  status: "ongoing" | "done";
  priority: "high" | "moderate" | "low" | "backlog";
  dueDate: Date;
  createdAt: string;
  updatedAt: string;
}

export interface BasicTask extends BaseTask {
  notes: string;
}

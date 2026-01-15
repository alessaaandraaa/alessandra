import mongoose from "mongoose";

export interface TaskBase extends mongoose.Document {
  type: "school" | "subscription" | "basic";
  name: string;
  status: "ongoing" | "done";
  priority: "high" | "moderate" | "low" | "backlog";
  dueDate: Date;
}

const TaskSchema = new mongoose.Schema<TaskBase>(
  {
    name: {
      type: String,
      required: [true, "Task needs a name!"],
    },
    dueDate: {
      type: Date,
      required: [true, "Task needs a due date!"],
    },
    status: {
      type: String,
      enum: ["ongoing", "done"],
      default: "ongoing",
    },
    type: {
      type: String,
      required: true,
      enum: ["school", "subscription", "basic"],
    },
    priority: {
      type: String,
      required: true,
      default: "moderate",
      enum: ["high", "moderate", "low", "backlog"],
    },
  },
  {
    timestamps: true,
    discriminatorKey: "type",
  }
);

export const Task = mongoose.model<TaskBase>("Task", TaskSchema);

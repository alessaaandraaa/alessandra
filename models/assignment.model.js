import mongoose from "mongoose";
import { Task } from "./task.model.ts";

const AssignmentTaskSchema = new mongoose.Schema({
  course: {
    type: String,
    required: true,
  },
  activityType: {
    type: String,
    required: true,
  },
});

export const AssignmentTask = Task.discriminator(
  "assignment",
  AssignmentTaskSchema
);

import mongoose from "mongoose";
import { Task } from "./task.model.ts";

const BasicTaskSchema = new mongoose.Schema({
  notes: {
    type: String,
  },
});

export const BasicTask = Task.discriminator("basic", BasicTaskSchema);

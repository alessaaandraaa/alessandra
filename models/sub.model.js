import mongoose from "mongoose";
import { Task } from "./task.model.ts";

const SubscriptionTaskSchema = new mongoose.Schema({
  frequency: {
    type: String,
    enum: ["weekly", "monthly", "yearly", "seasonal"],
  },
});

export const SubscriptionTask = Task.discriminator(
  "subscription",
  SubscriptionTaskSchema
);

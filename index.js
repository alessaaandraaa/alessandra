import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import taskRoute from "./routes/tasks.route.js";
dotenv.config();
const port = 3000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/tasks", taskRoute);

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("Connected to DB");
    app.listen(port, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch(() => {
    console.log("Failed to connect.");
  });

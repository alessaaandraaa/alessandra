import express from "express";
const router = express.Router();

import TasksController from "../controllers/tasks.controller.js";

const taskController = new TasksController();

router.get("/", taskController.getTasks);
router.get("/:id", taskController.getTask);
router.post("/", taskController.addTask);
router.put("/:id", taskController.editTask);
router.delete("/:id", taskController.deleteTask);

export default router;

import { Task } from "../models/task.model.js";
import { BasicTask } from "../models/todo.model.js";

const taskTypes = {
  basic: BasicTask,
};

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;
  return mongoose.connect(process.env.DATABASE_URL);
};

class TasksController {
  async getTasks(req, res) {
    try {
      await connectDB();
      const tasks = await Task.find({});
      res.status(200).json(tasks);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  async getTask(req, res) {
    try {
      await connectDB();
      const { id } = req.params;
      const newTask = await Task.findById(id);
      res.status(200).json(newTask);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  async addTask(req, res) {
    try {
      await connectDB();
      const { type } = req.body;

      const taskType = taskTypes[type];
      if (!taskType)
        return res.status(400).json({ error: "Invalid task type." });

      const task = await taskType.create(req.body);
      return res.status(200).json(task);
    } catch (e) {
      console.error(e);
      return res.status(500).json({
        error: "Error adding task",
      });
    }
  }

  async editTask(req, res) {
    try {
      await connectDB();
      const { id } = req.params;

      const existingTask = await Task.findById(id);
      if (!existingTask) {
        return res.status(404).json({ error: "Task not found" });
      }

      const taskType = taskTypes[existingTask.type];
      if (!taskType) {
        return res.status(400).json({ error: "Invalid task type" });
      }

      const { type, ...updates } = req.body;

      const updatedTask = await taskType.findByIdAndUpdate(id, updates, {
        new: true,
        runValidators: true,
      });

      res.status(200).json(updatedTask);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Error editing task" });
    }
  }

  async deleteTask(req, res) {
    try {
      await connectDB();
      const { id } = req.params;
      const deletedTask = await Task.findByIdAndDelete(id);

      if (!deletedTask) {
        return res.status(404).send("No task found.", e);
      }

      res.status(200).json({ message: "Task successfully deleted:" });
    } catch (e) {
      res.status(500).send("Error deleting task: ", e);
    }
  }
}

export default TasksController;

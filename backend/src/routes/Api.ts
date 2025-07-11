import express from "express";
import {
  getTasks,
  createTask,
  updateTask,
  toggleTask,
  deleteTask,
} from "../controllers/TaskController";

const router = express.Router();

router.get("/tasks", getTasks);
router.post("/tasks", createTask);
router.put("/tasks/:id", updateTask);
router.patch("/tasks/:id/toggle", toggleTask);
router.delete("/tasks/:id", deleteTask);

export default router;

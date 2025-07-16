import { Request, Response } from "express";
import Task from "../models/Tasks";
import { Tasks } from "../types";

// Get all tasks
export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Create task
export const createTask = async (req: Request, res: Response) => {
  try {
    const { title, isCompleted = false, priority = "p2" }: Tasks = req.body;

    const task = await Task.create({
      id: Date.now(),
      title,
      isCompleted,
      priority,
    });

    res.status(201).json(task);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// Update task
export const updateTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData: Tasks = req.body;

    const task = await Task.findOneAndUpdate({ id: parseInt(id) }, updateData, {
      new: true,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// Toggle task completion
export const toggleTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const task = await Task.findOne({ id: parseInt(id) });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.isCompleted = !task.isCompleted;
    const savedTask = await task.save();

    res.json(savedTask);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// Delete task
export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const task = await Task.findOneAndDelete({ id: parseInt(id) });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted successfully" });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

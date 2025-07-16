import express from "express";
import {
  getTasks,
  createTask,
  updateTask,
  toggleTask,
  deleteTask,
} from "../controllers/TaskController";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Todo task management endpoints
 */

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get all tasks
 *     description: Retrieve a list of all todo tasks
 *     tags: [Tasks]
 *     responses:
 *       200:
 *         description: List of tasks retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.get("/tasks", getTasks);

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create a new task
 *     description: Create a new todo task with title and optional priority
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TaskInput'
 *           examples:
 *             basic:
 *               summary: Basic task
 *               value:
 *                 title: "Complete project documentation"
 *             with-priority:
 *               summary: Task with high priority
 *               value:
 *                 title: "Fix critical bug"
 *                 priority: "p1"
 *     responses:
 *       201:
 *         description: Task created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.post("/tasks", createTask);

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Update a task
 *     description: Update an existing task's title, completion status, or priority
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Task ID
 *         schema:
 *           type: string
 *           example: "64f123abc456def789012345"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TaskUpdate'
 *           examples:
 *             update-title:
 *               summary: Update task title
 *               value:
 *                 title: "Updated task title"
 *             complete-task:
 *               summary: Mark task as completed
 *               value:
 *                 isCompleted: true
 *             change-priority:
 *               summary: Change task priority
 *               value:
 *                 priority: "p1"
 *     responses:
 *       200:
 *         description: Task updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.put("/tasks/:id", updateTask);

/**
 * @swagger
 * /tasks/{id}/toggle:
 *   patch:
 *     summary: Toggle task completion
 *     description: Toggle the completion status of a task (completed ↔ not completed)
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Task ID
 *         schema:
 *           type: string
 *           example: "64f123abc456def789012345"
 *     responses:
 *       200:
 *         description: Task completion status toggled successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.patch("/tasks/:id/toggle", toggleTask);

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Delete a task
 *     description: Permanently delete a task from the database
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Task ID
 *         schema:
 *           type: string
 *           example: "64f123abc456def789012345"
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Task deleted successfully"
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.delete("/tasks/:id", deleteTask);

export default router;

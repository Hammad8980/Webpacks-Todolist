import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/Db";
import apiRoutes from "./routes/Api";
import { errorHandler, notFound } from "./middleware/errorHandler";
import { setupSwagger } from "./config/swagger";

// Load environment variables
dotenv.config();

// Create Express application
const app = express();
const PORT = parseInt(process.env.PORT || "5000", 10);

// Connect to MongoDB
connectDB();

// Basic middleware
app.use(cors());
app.use(express.json());

// Setup Swagger Documentation
setupSwagger(app);

// Health check endpoint for Render.com
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || "development",
  });
});

/**
 * @swagger
 * /:
 *   get:
 *     summary: Get API information
 *     description: Returns basic information about the Todo List API and available endpoints
 *     tags: [Info]
 *     responses:
 *       200:
 *         description: API information retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 */
// Root route
app.get("/", (req, res) => {
  res.json({
    message: "Todo List API is running!",
    documentation: "/api-docs",
    endpoints: {
      getTasks: "GET /api/tasks",
      createTask: "POST /api/tasks",
      updateTask: "PUT /api/tasks/:id",
      toggleTask: "PATCH /api/tasks/:id/toggle",
      deleteTask: "DELETE /api/tasks/:id",
    },
  });
});

// API routes
app.use("/api", apiRoutes);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// For local development
if (process.env.NODE_ENV !== "production") {
  const PORT = parseInt(process.env.PORT || "5000", 10);
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}

export default app;

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/Db";
import apiRoutes from "./routes/Api";
import { errorHandler, notFound } from "./middleware/errorHandler";

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

// Root route
app.get("/", (req, res) => {
  res.json({
    message: "Todo List API is running!",
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

// Error handling middleware (must be last)
app.use(notFound);
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

export default app;

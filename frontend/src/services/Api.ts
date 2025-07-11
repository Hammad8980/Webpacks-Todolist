import axios from 'axios';
import { Task } from '../features/todos/TodoTaskTypes';

// Create axios instance with base configuration
const api = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? 'https://your-backend-domain.com/api'
      : 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// API service functions
export const todoAPI = {
  // Get all tasks
  getTasks: async (): Promise<Task[]> => {
    const response = await api.get<Task[]>('/tasks');
    return response.data;
  },

  // Create a new task
  createTask: async (task: {
    title: string;
    isCompleted?: boolean;
    priority?: 'p1' | 'p2' | 'p3';
  }): Promise<Task> => {
    const response = await api.post<Task>('/tasks', task);
    return response.data;
  },

  // Update a task
  updateTask: async (
    id: number,
    updates: { title?: string; isCompleted?: boolean; priority?: 'p1' | 'p2' | 'p3' }
  ): Promise<Task> => {
    const response = await api.put<Task>(`/tasks/${id}`, updates);
    return response.data;
  },

  // Toggle task completion
  toggleTask: async (id: number): Promise<Task> => {
    const response = await api.patch<Task>(`/tasks/${id}/toggle`);
    return response.data;
  },

  // Delete a task
  deleteTask: async (id: number): Promise<void> => {
    await api.delete(`/tasks/${id}`);
  },
};

// Error handling helper
export const handleAPIError = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    if (error.response?.data?.message) {
      return error.response.data.message;
    }
    if (error.message) {
      return error.message;
    }
  }
  if (error instanceof Error) {
    return error.message;
  }
  return 'An unexpected error occurred';
};

export default todoAPI;

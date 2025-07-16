import type { Meta, StoryObj } from '@storybook/react-webpack5';
import React, { useState } from 'react';
import TodoInput from '../../components/todo/TodoInput';
import TodoList from '../../components/todo/TodoList';
import { Task } from './TodoTaskTypes';

// Full interactive TodosSection with complete functionality
const InteractiveTodosSection: React.FC<{
  initialTodos: Task[];
  initialLoading?: boolean;
  initialError?: string | null;
}> = ({ initialTodos, initialLoading = false, initialError = null }) => {
  const [todos, setTodos] = useState<Task[]>(initialTodos);
  const [isLoading, setIsLoading] = useState(initialLoading);
  const [error, setError] = useState<string | null>(initialError);

  // Generate unique ID for new tasks
  const getNextId = () => {
    return todos.length > 0 ? Math.max(...todos.map(t => t.id)) + 1 : 1;
  };

  // Add new task functionality
  const handleAddTask = (title: string) => {
    const newTask: Task = {
      id: getNextId(),
      title: title.trim(),
      isCompleted: false,
      priority: 'p2', // Default priority
    };

    setTodos(prevTodos => [...prevTodos, newTask]);
    setError(null); // Clear any existing errors
  };

  // Delete task functionality
  const handleDeleteTask = (id: number) => {
    setTodos(prevTodos => prevTodos.filter(task => task.id !== id));
  };

  // Toggle task completion
  const handleToggleTask = (id: number) => {
    setTodos(prevTodos =>
      prevTodos.map(task => (task.id === id ? { ...task, isCompleted: !task.isCompleted } : task))
    );
  };

  // Update task title
  const handleUpdateTask = (id: number, newTitle: string) => {
    setTodos(prevTodos =>
      prevTodos.map(task => (task.id === id ? { ...task, title: newTitle } : task))
    );
  };

  // Simulate loading state (for testing)
  const simulateLoading = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  // Simulate error state (for testing)
  const simulateError = () => {
    setError('Simulated network error - click to dismiss');
  };

  const clearError = () => setError(null);

  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg min-h-screen">
      {/* Demo controls for testing different states */}
      <div className="mb-6 p-4 bg-gray-800 rounded-lg border-l-4 border-blue-500">
        <h3 className="text-sm font-semibold text-blue-400 mb-2">Demo Controls</h3>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={simulateLoading}
            className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
          >
            Test Loading
          </button>
          <button
            onClick={simulateError}
            className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
          >
            Test Error
          </button>
          <button
            onClick={clearError}
            className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
          >
            Clear Error
          </button>
        </div>
      </div>

      {/* Actual TodosSection content */}
      <TodoInput tasks={todos} onAddTask={handleAddTask} />

      <h2 className="text-xl font-bold mt-8 mb-6 text-gray-200 flex items-center gap-2">
        <svg
          className="w-6 h-6 text-blue-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
        Your Tasks ({todos.filter(t => !t.isCompleted).length} pending,{' '}
        {todos.filter(t => t.isCompleted).length} completed)
      </h2>

      {error && (
        <div
          className="mb-4 p-4 bg-red-500/20 border border-red-500/30 rounded-lg cursor-pointer"
          onClick={clearError}
        >
          <div className="flex items-center gap-2 text-red-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="font-medium">Error:</span>
            <span>{error}</span>
            <span className="text-xs ml-auto">(click to dismiss)</span>
          </div>
        </div>
      )}

      {isLoading && (
        <div className="flex justify-center py-8" role="status">
          <svg
            aria-hidden="true"
            className="w-10 h-10 text-gray-600 animate-spin fill-blue-500"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C0 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        </div>
      )}

      <TodoList
        tasks={todos}
        onDelete={handleDeleteTask}
        onToggle={handleToggleTask}
        onUpdate={handleUpdateTask}
      />
    </div>
  );
};

// Mock todo data
const mockTodos: Task[] = [
  {
    id: 1,
    title: 'Complete project documentation',
    isCompleted: false,
    priority: 'p1',
  },
  {
    id: 2,
    title: 'Review pull requests',
    isCompleted: true,
    priority: 'p2',
  },
  {
    id: 3,
    title: 'Update dependencies',
    isCompleted: false,
    priority: 'p3',
  },
];

const meta: Meta<typeof InteractiveTodosSection> = {
  title: 'Features/TodosSection',
  component: InteractiveTodosSection,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
**Interactive TodosSection - Full Todo App Experience**

This is a fully functional todo application section where you can:

- ➕ **Add Tasks**: Type in the input field and press Enter or click Add
- ✅ **Toggle Completion**: Check/uncheck tasks 
- ✏️ **Edit Tasks**: Click on task text to edit inline
- 🗑️ **Delete Tasks**: Remove tasks with the delete button
- 🔄 **Test States**: Use demo controls to test loading and error states
- 📊 **Live Counters**: See pending and completed task counts update

**Try it out:**
1. Add a new task using the input field
2. Toggle tasks between completed/pending
3. Edit task titles by clicking on them
4. Delete tasks you no longer need
5. Use the demo controls to test different UI states

All interactions use real state management and Tailwind CSS styling!
        `,
      },
    },
  },
  argTypes: {
    initialTodos: {
      description: 'Initial tasks to start with',
      control: 'object',
    },
    initialLoading: {
      description: 'Start in loading state',
      control: 'boolean',
    },
    initialError: {
      description: 'Start with an error message',
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof InteractiveTodosSection>;

/**
 * Default interactive todo section with sample tasks
 * Try adding, editing, toggling, and deleting tasks!
 */
export const Default: Story = {
  args: {
    initialTodos: mockTodos,
    initialLoading: false,
    initialError: '\n',
  },
};

/**
 * Empty state - start with no tasks
 * Perfect for testing the add functionality
 */
export const Empty: Story = {
  args: {
    initialTodos: [],
    initialLoading: false,
    initialError: null,
  },
};

/**
 * Loading state demonstration
 */
export const Loading: Story = {
  args: {
    initialTodos: [],
    initialLoading: true,
    initialError: null,
  },
};

/**
 * Error state demonstration
 */
export const WithError: Story = {
  args: {
    initialTodos: mockTodos,
    initialLoading: false,
    initialError: 'Failed to sync with server. Working offline.',
  },
};

/**
 * Productivity scenario - many tasks to manage
 */
export const ProductivityMode: Story = {
  args: {
    initialTodos: [
      { id: 1, title: 'Review morning emails', isCompleted: true, priority: 'p2' },
      { id: 2, title: 'Team standup meeting', isCompleted: true, priority: 'p1' },
      { id: 3, title: 'Complete feature implementation', isCompleted: false, priority: 'p1' },
      { id: 4, title: 'Code review for PR #123', isCompleted: false, priority: 'p2' },
      { id: 5, title: 'Update project documentation', isCompleted: false, priority: 'p3' },
      { id: 6, title: 'Plan next sprint', isCompleted: false, priority: 'p2' },
      { id: 7, title: 'Respond to client feedback', isCompleted: false, priority: 'p1' },
    ],
    initialLoading: false,
    initialError: null,
  },
};

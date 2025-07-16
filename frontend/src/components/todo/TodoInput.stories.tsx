import type { Meta, StoryObj } from '@storybook/react-webpack5';
import React, { useState } from 'react';
import TodoInput from './TodoInput';
import { Task } from '../../features/todos/TodoTaskTypes';

// Interactive wrapper for TodoInput
const InteractiveTodoInput: React.FC<{ initialTasks: Task[] }> = ({ initialTasks }) => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [addedTasks, setAddedTasks] = useState<string[]>([]);

  const handleAddTask = (taskName: string) => {
    // Generate new task with unique ID
    const newTask: Task = {
      id: tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1,
      title: taskName,
      isCompleted: false,
      priority: 'p2',
    };

    setTasks(prevTasks => [...prevTasks, newTask]);
    setAddedTasks(prev => [...prev, taskName]);
  };

  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg">
      <h3 className="text-lg font-semibold mb-4 text-blue-400">Interactive Todo Input</h3>

      <TodoInput tasks={tasks} onAddTask={handleAddTask} />

      {/* Show existing tasks */}
      {tasks.length > 0 && (
        <div className="mt-6">
          <h4 className="text-md font-medium mb-2 text-gray-300">Current Tasks:</h4>
          <div className="space-y-2">
            {tasks.map(task => (
              <div key={task.id} className="flex items-center gap-2 p-2 bg-gray-800 rounded">
                <span
                  className={`text-sm ${addedTasks.includes(task.title) ? 'text-green-400' : 'text-gray-300'}`}
                >
                  {addedTasks.includes(task.title) && '✨ '}
                  {task.title}
                </span>
                <span className="text-xs text-gray-500">({task.priority})</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="mt-6 p-4 bg-gray-800 rounded border-l-4 border-blue-500">
        <h4 className="text-sm font-semibold text-blue-400 mb-2">Try it out:</h4>
        <ul className="text-sm text-gray-300 space-y-1">
          <li>• Type a task name and press Enter or click &quot;Add Task&quot;</li>
          <li>• Try adding a duplicate task to see validation</li>
          <li>• Try adding an empty task to see error handling</li>
          <li>• Tasks marked with ✨ were added in this session</li>
        </ul>
      </div>
    </div>
  );
};

const existingTasks: Task[] = [
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
];

const meta: Meta<typeof InteractiveTodoInput> = {
  title: 'Components/Todo/TodoInput',
  component: InteractiveTodoInput,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Interactive TodoInput component with real validation and state management.',
      },
    },
  },
  argTypes: {
    initialTasks: {
      description: 'Initial tasks to start with',
      control: 'object',
    },
  },
};

export default meta;
type Story = StoryObj<typeof InteractiveTodoInput>;

export const Default: Story = {
  args: {
    initialTasks: existingTasks,
  },
};

export const EmptyState: Story = {
  args: {
    initialTasks: [],
  },
};

export const WithManyTasks: Story = {
  args: {
    initialTasks: [
      { id: 1, title: 'Complete project documentation', isCompleted: false, priority: 'p1' },
      { id: 2, title: 'Review pull requests', isCompleted: true, priority: 'p2' },
      { id: 3, title: 'Update dependencies', isCompleted: false, priority: 'p3' },
      { id: 4, title: 'Write unit tests', isCompleted: false, priority: 'p1' },
    ],
  },
};

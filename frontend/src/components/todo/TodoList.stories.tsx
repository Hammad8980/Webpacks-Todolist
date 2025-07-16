import type { Meta, StoryObj } from '@storybook/react-webpack5';
import React, { useState } from 'react';
import TodoList from './TodoList';
import { Task } from '../../features/todos/TodoTaskTypes';

// Interactive wrapper component that manages state
const InteractiveTodoList: React.FC<{ initialTasks: Task[] }> = ({ initialTasks }) => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const handleDelete = (id: number) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };

  const handleToggle = (id: number) => {
    setTasks(prevTasks =>
      prevTasks.map(task => (task.id === id ? { ...task, isCompleted: !task.isCompleted } : task))
    );
  };

  const handleUpdate = (id: number, newTitle: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task => (task.id === id ? { ...task, title: newTitle } : task))
    );
  };

  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg">
      <TodoList
        tasks={tasks}
        onDelete={handleDelete}
        onToggle={handleToggle}
        onUpdate={handleUpdate}
      />
    </div>
  );
};

// Mock data
const mockTasks: Task[] = [
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
  {
    id: 4,
    title: 'Write unit tests',
    isCompleted: false,
    priority: 'p1',
  },
];

const meta: Meta<typeof InteractiveTodoList> = {
  title: 'Components/Todo/TodoList',
  component: InteractiveTodoList,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
**Interactive TodoList Component**

This component demonstrates the full functionality of TodoList with real state management:

- ✅ **Toggle Tasks**: Click the checkbox to mark tasks as complete/incomplete
- 🗑️ **Delete Tasks**: Click the delete button to remove tasks
- ✏️ **Edit Tasks**: Click on task text to edit inline
- 🎨 **Tailwind Styling**: Dark theme with proper hover states and animations

**Try the interactions:**
1. Check/uncheck tasks to see completion states
2. Click delete buttons to remove tasks
3. Click on task titles to edit them
4. See how empty state appears when all tasks are deleted
        `,
      },
    },
  },
  argTypes: {
    initialTasks: {
      description: 'Initial tasks to display',
      control: 'object',
    },
  },
};

export default meta;
type Story = StoryObj<typeof InteractiveTodoList>;

/**
 * Default interactive TodoList with multiple tasks
 * Try toggling, editing, and deleting tasks!
 */
export const Default: Story = {
  args: {
    initialTasks: mockTasks,
  },
};

/**
 * Empty state - starts with no tasks
 */
export const EmptyList: Story = {
  args: {
    initialTasks: [],
  },
};

/**
 * Single task for focused testing
 */
export const SingleTask: Story = {
  args: {
    initialTasks: [mockTasks[0]],
  },
};

/**
 * All completed tasks - see how completed state looks
 */
export const AllCompleted: Story = {
  args: {
    initialTasks: mockTasks.map(task => ({ ...task, isCompleted: true })),
  },
};

/**
 * Mixed priority tasks showing different priority levels
 */
export const MixedPriorities: Story = {
  args: {
    initialTasks: [
      {
        id: 1,
        title: 'Critical bug fix - High priority',
        isCompleted: false,
        priority: 'p1',
      },
      {
        id: 2,
        title: 'Feature enhancement - Medium priority',
        isCompleted: false,
        priority: 'p2',
      },
      {
        id: 3,
        title: 'Code cleanup - Low priority',
        isCompleted: true,
        priority: 'p3',
      },
    ],
  },
};

/**
 * Long task list for testing scroll and performance
 */
export const LongList: Story = {
  args: {
    initialTasks: Array.from({ length: 15 }, (_, i) => ({
      id: i + 1,
      title: `Task ${i + 1}: ${
        [
          'Complete important project milestone',
          'Review team code submissions',
          'Update project documentation',
          'Conduct client meeting',
          'Prepare quarterly report',
          'Optimize application performance',
        ][i % 6]
      }`,
      isCompleted: i % 4 === 0,
      priority: (['p1', 'p2', 'p3'] as const)[i % 3],
    })),
  },
};

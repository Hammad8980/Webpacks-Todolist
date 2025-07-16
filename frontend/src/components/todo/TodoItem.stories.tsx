import type { Meta, StoryObj } from '@storybook/react-webpack5';

import TodoItem from './TodoItem';
import { Task } from '../../features/todos/TodoTaskTypes';

// Mock functions
const mockHandlers = {
  onDelete: (id: number) => console.log('Delete task:', id),
  onToggle: (id: number) => console.log('Toggle task:', id),
  onUpdate: (id: number, title: string) => console.log('Update task:', id, title),
};
const mockTask: Task = {
  id: 1,
  title: 'Complete project documentation',
  isCompleted: false,
  priority: 'p1',
};

const completedTask: Task = {
  id: 2,
  title: 'Review pull requests',
  isCompleted: true,
  priority: 'p2',
};

const lowPriorityTask: Task = {
  id: 3,
  title: 'Update dependencies',
  isCompleted: false,
  priority: 'p3',
};

const meta = {
  title: 'Components/Todo/TodoItem',
  component: TodoItem,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'An individual todo item component with toggle, edit, and delete functionality.',
      },
    },
  },
  argTypes: {
    task: {
      description: 'The todo task object to display',
      control: { type: 'object' },
    },
    onDelete: {
      description: 'Callback function called when the task is deleted',
      action: 'deleted',
    },
    onToggle: {
      description: 'Callback function called when the task completion status is toggled',
      action: 'toggled',
    },
    onUpdate: {
      description: 'Callback function called when the task is updated',
      action: 'updated',
    },
  },
} satisfies Meta<typeof TodoItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    task: mockTask,
    onDelete: mockHandlers.onDelete,
    onToggle: mockHandlers.onToggle,
    onUpdate: mockHandlers.onUpdate,
  },
};

export const Completed: Story = {
  args: {
    task: completedTask,
    onDelete: mockHandlers.onDelete,
    onToggle: mockHandlers.onToggle,
    onUpdate: mockHandlers.onUpdate,
  },
};

export const HighPriority: Story = {
  args: {
    task: mockTask,
    onDelete: mockHandlers.onDelete,
    onToggle: mockHandlers.onToggle,
    onUpdate: mockHandlers.onUpdate,
  },
};

export const MediumPriority: Story = {
  args: {
    task: { ...mockTask, priority: 'p2' },
    onDelete: mockHandlers.onDelete,
    onToggle: mockHandlers.onToggle,
    onUpdate: mockHandlers.onUpdate,
  },
};

export const LowPriority: Story = {
  args: {
    task: lowPriorityTask,
    onDelete: mockHandlers.onDelete,
    onToggle: mockHandlers.onToggle,
    onUpdate: mockHandlers.onUpdate,
  },
};

export const LongTitle: Story = {
  args: {
    task: {
      ...mockTask,
      title:
        'This is a very long task title that might wrap to multiple lines and we need to see how it displays in the component',
    },
    onDelete: mockHandlers.onDelete,
    onToggle: mockHandlers.onToggle,
    onUpdate: mockHandlers.onUpdate,
  },
};

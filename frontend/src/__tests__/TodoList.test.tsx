import { render, screen } from '@testing-library/react';
import TodoList from '../components/todo/TodoList';
import type { Task } from '../features/todos/TodoTaskTypes';

// Mock the useTodos hook
jest.mock('../features/todos/hooks/useTodos', () => ({
  useTodos: jest.fn(() => ({
    isLoading: false,
  })),
}));

// Mock TodoItem component to simplify testing
jest.mock('../components/todo/TodoItem', () => {
  return function MockTodoItem({ task }: { task: Task }) {
    return <div data-testid={`todo-item-${task.id}`}>{task.title}</div>;
  };
});

describe('TodoList', () => {
  const mockOnDelete = jest.fn();
  const mockOnToggle = jest.fn();
  const mockOnUpdate = jest.fn();

  const defaultProps = {
    tasks: [] as Task[],
    onDelete: mockOnDelete,
    onToggle: mockOnToggle,
    onUpdate: mockOnUpdate,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows empty state when no tasks are provided', () => {
    const { container } = render(<TodoList {...defaultProps} />);
    const svg = document.querySelector('svg');

    expect(screen.getByText('No tasks yet!')).toBeInTheDocument();
    expect(screen.getByText('Add your first task above to get started.')).toBeInTheDocument();
    expect(container).toMatchSnapshot();

    expect(svg).toBeInTheDocument();
  });

  it('renders tasks when provided', () => {
    const tasks: Task[] = [
      { id: 1, title: 'Task 1', isCompleted: false, priority: 'p1' },
      { id: 2, title: 'Task 2', isCompleted: true, priority: 'p2' },
      { id: 3, title: 'Task 3', isCompleted: false, priority: 'p3' },
    ];

    const { container } = render(<TodoList {...defaultProps} tasks={tasks} />);

    expect(screen.getByTestId('todo-item-1')).toBeInTheDocument();
    expect(screen.getByTestId('todo-item-2')).toBeInTheDocument();
    expect(screen.getByTestId('todo-item-3')).toBeInTheDocument();

    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
    expect(screen.getByText('Task 3')).toBeInTheDocument();
  });

  it('renders tasks in the order provided', () => {
    const tasks: Task[] = [
      { id: 3, title: 'Third task', isCompleted: false, priority: 'p1' },
      { id: 1, title: 'First task', isCompleted: false, priority: 'p2' },
      { id: 2, title: 'Second task', isCompleted: true, priority: 'p3' },
    ];

    render(<TodoList {...defaultProps} tasks={tasks} />);

    const todoItems = screen.getAllByTestId(/todo-item-/);
    expect(todoItems).toHaveLength(3);

    expect(todoItems[0]).toHaveAttribute('data-testid', 'todo-item-3');
    expect(todoItems[1]).toHaveAttribute('data-testid', 'todo-item-1');
    expect(todoItems[2]).toHaveAttribute('data-testid', 'todo-item-2');
  });

  it('updates when tasks prop changes', () => {
    const initialTasks: Task[] = [{ id: 1, title: 'Task 1', isCompleted: false, priority: 'p1' }];

    const { rerender } = render(<TodoList {...defaultProps} tasks={initialTasks} />);

    expect(screen.getByTestId('todo-item-1')).toBeInTheDocument();
    expect(screen.queryByText('No tasks yet!')).not.toBeInTheDocument();

    // Update to empty tasks
    rerender(<TodoList {...defaultProps} tasks={[]} />);

    expect(screen.queryByTestId('todo-item-1')).not.toBeInTheDocument();
    expect(screen.getByText('No tasks yet!')).toBeInTheDocument();

    // Update to new tasks
    const newTasks: Task[] = [{ id: 2, title: 'New Task', isCompleted: true, priority: 'p3' }];

    rerender(<TodoList {...defaultProps} tasks={newTasks} />);

    expect(screen.getByTestId('todo-item-2')).toBeInTheDocument();
    expect(screen.getByText('New Task')).toBeInTheDocument();
    expect(screen.queryByText('No tasks yet!')).not.toBeInTheDocument();
  });
});

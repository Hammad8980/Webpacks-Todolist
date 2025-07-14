import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoItem from '../components/todo/TodoItem';
import type { Task } from '../features/todos/TodoTaskTypes';

describe('TodoItem', () => {
  const mockOnDelete = jest.fn();
  const mockOnToggle = jest.fn();
  const mockOnUpdate = jest.fn();

  const defaultTask: Task = {
    id: 1,
    title: 'Test task',
    isCompleted: false,
    priority: 'p2',
  };

  const defaultProps = {
    task: defaultTask,
    onDelete: mockOnDelete,
    onToggle: mockOnToggle,
    onUpdate: mockOnUpdate,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders task title and controls', () => {
    const { container } = render(<TodoItem {...defaultProps} />);

    expect(screen.getByText('Test task')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).toBeInTheDocument();

    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(2); // edit and delete buttons
    expect(container).toMatchSnapshot();
  });

  it('shows completed task with line-through style', () => {
    const completedTask = { ...defaultTask, isCompleted: true };
    const { container } = render(<TodoItem {...defaultProps} task={completedTask} />);

    const taskTitle = screen.getByText('Test task');
    expect(screen.getByRole('checkbox')).toBeChecked();
    expect(taskTitle).toHaveClass('line-through');
    expect(taskTitle).toHaveClass('text-gray-400');
    expect(container).toMatchSnapshot();
  });

  it('calls onToggle when checkbox is clicked', async () => {
    const user = userEvent.setup();
    render(<TodoItem {...defaultProps} />);

    const checkbox = screen.getByRole('checkbox');
    await user.click(checkbox);

    expect(mockOnToggle).toHaveBeenCalledWith(1);
  });

  it('checkbox reflects task completion status', () => {
    const { rerender } = render(<TodoItem {...defaultProps} />);

    let checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();

    const completedTask = { ...defaultTask, isCompleted: true };
    rerender(<TodoItem {...defaultProps} task={completedTask} />);

    checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  it('opens edit modal when edit button is clicked', async () => {
    const user = userEvent.setup();
    const { container } = render(<TodoItem {...defaultProps} />);

    const buttons = screen.getAllByRole('button');
    const editButton = buttons[0]; // First button is edit
    await user.click(editButton);

    expect(screen.getByText('Edit Task')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Test task')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('closes edit modal when cancel button is clicked', async () => {
    const user = userEvent.setup();
    render(<TodoItem {...defaultProps} />);

    const buttons = screen.getAllByRole('button');
    const editButton = buttons[0];
    await user.click(editButton);

    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    await user.click(cancelButton);

    expect(screen.queryByText('Edit Task')).not.toBeInTheDocument();
  });

  it('saves task when Enter key is pressed in edit input', async () => {
    const user = userEvent.setup();
    render(<TodoItem {...defaultProps} />);

    const buttons = screen.getAllByRole('button');
    const editButton = buttons[0];
    await user.click(editButton);

    const input = screen.getByDisplayValue('Test task');
    await user.clear(input);
    await user.type(input, 'Updated task{enter}');

    expect(mockOnUpdate).toHaveBeenCalledWith(1, 'Updated task');
    expect(screen.queryByText('Edit Task')).not.toBeInTheDocument();
  });

  it('updates task title when save button is clicked', async () => {
    const user = userEvent.setup();
    render(<TodoItem {...defaultProps} />);

    const buttons = screen.getAllByRole('button');
    const editButton = buttons[0];
    await user.click(editButton);

    const input = screen.getByDisplayValue('Test task');
    await user.clear(input);
    await user.type(input, 'Updated task');

    const saveButton = screen.getByRole('button', { name: /save changes/i });
    await user.click(saveButton);

    expect(mockOnUpdate).toHaveBeenCalledWith(1, 'Updated task');
    expect(screen.queryByText('Edit Task')).not.toBeInTheDocument();
  });

  it('does not save empty task', async () => {
    const user = userEvent.setup();
    render(<TodoItem {...defaultProps} />);

    const buttons = screen.getAllByRole('button');
    const editButton = buttons[0];
    await user.click(editButton);

    const input = screen.getByDisplayValue('Test task');
    await user.clear(input);

    const saveButton = screen.getByRole('button', { name: /save changes/i });
    await user.click(saveButton);

    expect(mockOnUpdate).not.toHaveBeenCalled();
    expect(screen.getByText('Edit Task')).toBeInTheDocument();
  });

  it('calls onDelete when delete button is clicked', async () => {
    jest.useFakeTimers();
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    render(<TodoItem {...defaultProps} />);

    const buttons = screen.getAllByRole('button');
    const deleteButton = buttons[1]; // Second button is delete
    await user.click(deleteButton);

    // Advance through animation
    jest.advanceTimersByTime(1200);

    await waitFor(() => {
      expect(mockOnDelete).toHaveBeenCalledWith(1);
    });

    jest.useRealTimers();
  });
});

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoInput from '../components/todo/TodoInput';
import type { Task } from '../features/todos/TodoTaskTypes';

describe('TodoInput', () => {
  const mockOnAddTask = jest.fn();

  const defaultProps = {
    tasks: [] as Task[],
    onAddTask: mockOnAddTask,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders input field and submit button', () => {
    const { container } = render(<TodoInput {...defaultProps} />);

    expect(screen.getByPlaceholderText('What needs to be done?')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('calls onAddTask when form is submitted using click or enter with valid input', async () => {
    const user = userEvent.setup();
    render(<TodoInput {...defaultProps} />);

    const input = screen.getByPlaceholderText('What needs to be done?');
    const submitButton = screen.getByRole('button');

    await user.type(input, 'New task');
    await user.click(submitButton);

    await user.type(input, 'New task{enter}');

    expect(mockOnAddTask).toHaveBeenCalledWith('New task');
    expect(mockOnAddTask).toHaveBeenCalledTimes(2);
    expect(input).toHaveValue('');
  });

  it('shows error message when trying to submit empty task', async () => {
    const user = userEvent.setup();
    const { container } = render(<TodoInput {...defaultProps} />);

    const submitButton = screen.getByRole('button');
    await user.click(submitButton);

    expect(screen.getByText('Please enter a task')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
    expect(mockOnAddTask).not.toHaveBeenCalled();
  });

  it('shows error message when trying to add duplicate task', async () => {
    const user = userEvent.setup();
    const existingTasks: Task[] = [
      { id: 1, title: 'Existing task', isCompleted: false, priority: 'p2' },
    ];

    render(<TodoInput {...defaultProps} tasks={existingTasks} />);

    const input = screen.getByPlaceholderText('What needs to be done?');
    const submitButton = screen.getByRole('button');

    await user.type(input, 'Existing task');
    await user.click(submitButton);

    expect(screen.getByText('Task already exists!')).toBeInTheDocument();
    expect(input).toHaveValue('');
    expect(mockOnAddTask).not.toHaveBeenCalled();
  });

  it('error message disappears after timeout', async () => {
    jest.useFakeTimers();
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    const existingTasks: Task[] = [
      { id: 1, title: 'Existing task', isCompleted: false, priority: 'p2' },
    ];

    render(<TodoInput {...defaultProps} tasks={existingTasks} />);

    const input = screen.getByPlaceholderText('What needs to be done?');
    const submitButton = screen.getByRole('button');

    await user.type(input, 'Existing task');
    await user.click(submitButton);

    expect(screen.getByText('Task already exists!')).toBeInTheDocument();

    jest.advanceTimersByTime(2500);

    await waitFor(() => {
      expect(screen.queryByText('Task already exists!')).not.toBeInTheDocument();
    });

    jest.useRealTimers();
  });
});

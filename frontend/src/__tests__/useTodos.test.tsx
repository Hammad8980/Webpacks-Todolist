import { renderHook, act, waitFor } from '@testing-library/react';
import { useTodos } from '../features/todos/hooks/useTodos';
import { todoReducer, TodoState, Action } from '../features/todos/TodoReducer';
import { todoAPI } from '../services/Api';
import type { Task } from '../features/todos/TodoTaskTypes';
import axios from 'axios';


jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

jest.mock('../services/Api', () => ({
  todoAPI: {
    getTasks: jest.fn(),
    createTask: jest.fn(),
    updateTask: jest.fn(),
    toggleTask: jest.fn(),
    deleteTask: jest.fn(),
  },
  handleAPIError: jest.fn(() => 'API Error'),
}));

const mockTodoAPI = todoAPI as jest.Mocked<typeof todoAPI>;

describe('useTodos', () => {
  const mockTasks: Task[] = [
    { id: 1, title: 'Task 1', isCompleted: false, priority: 'p1' },
    { id: 2, title: 'Task 2', isCompleted: true, priority: 'p2' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    // Clear axios mocks
    mockedAxios.create.mockClear?.();
    mockedAxios.get?.mockClear?.();
    mockedAxios.post?.mockClear?.();
    mockedAxios.put?.mockClear?.();
    mockedAxios.patch?.mockClear?.();
    mockedAxios.delete?.mockClear?.();
  });

  it('initializes with loading state and empty todos', () => {
    mockTodoAPI.getTasks.mockResolvedValue([]);

    const { result } = renderHook(() => useTodos());

    expect(result.current.isLoading).toBe(true);
    expect(result.current.todos).toEqual([]);
    expect(result.current.error).toBe(null);
  });

  it('loads todos on mount', async () => {
    mockTodoAPI.getTasks.mockResolvedValue(mockTasks);

    const { result } = renderHook(() => useTodos());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.todos).toEqual(mockTasks);
    expect(result.current.error).toBe(null);
    expect(mockTodoAPI.getTasks).toHaveBeenCalledTimes(1);
  });

  it('handles loading error', async () => {
    mockTodoAPI.getTasks.mockRejectedValue(new Error('Network error'));

    const { result } = renderHook(() => useTodos());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.error).toBe('API Error');
    expect(result.current.todos).toEqual([]);
  });

  it('adds a new task', async () => {
    const newTask: Task = { id: 3, title: 'New Task', isCompleted: false, priority: 'p2' };

    mockTodoAPI.getTasks.mockResolvedValue(mockTasks);
    mockTodoAPI.createTask.mockResolvedValue(newTask);

    const { result } = renderHook(() => useTodos());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    await act(async () => {
      await result.current.onAddTask('New Task');
    });

    expect(mockTodoAPI.createTask).toHaveBeenCalledWith({
      title: 'New Task',
      isCompleted: false,
      priority: 'p2',
    });
    expect(result.current.todos).toContainEqual(newTask);
    expect(result.current.error).toBe(null);
  });

  it('does not add task with empty title', async () => {
    mockTodoAPI.getTasks.mockResolvedValue([]);

    const { result } = renderHook(() => useTodos());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    await act(async () => {
      await result.current.onAddTask('');
    });

    expect(mockTodoAPI.createTask).not.toHaveBeenCalled();
  });

  it('deletes a task', async () => {
    mockTodoAPI.getTasks.mockResolvedValue(mockTasks);
    mockTodoAPI.deleteTask.mockResolvedValue();

    const { result } = renderHook(() => useTodos());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    await act(async () => {
      await result.current.onDeleteTask(1);
    });

    expect(mockTodoAPI.deleteTask).toHaveBeenCalledWith(1);
    expect(result.current.todos).not.toContainEqual(mockTasks[0]);
    expect(result.current.error).toBe(null);
  });

  it('toggles a task', async () => {
    const toggledTask: Task = { ...mockTasks[0], isCompleted: true };

    mockTodoAPI.getTasks.mockResolvedValue(mockTasks);
    mockTodoAPI.toggleTask.mockResolvedValue(toggledTask);

    const { result } = renderHook(() => useTodos());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    await act(async () => {
      await result.current.onToggleTask(1);
    });

    expect(mockTodoAPI.toggleTask).toHaveBeenCalledWith(1);
    expect(result.current.todos.find(t => t.id === 1)?.isCompleted).toBe(true);
    expect(result.current.error).toBe(null);
  });

  it('updates a task', async () => {
    const updatedTask: Task = { ...mockTasks[0], title: 'Updated Task' };

    mockTodoAPI.getTasks.mockResolvedValue(mockTasks);
    mockTodoAPI.updateTask.mockResolvedValue(updatedTask);

    const { result } = renderHook(() => useTodos());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    await act(async () => {
      await result.current.onUpdateTask(1, 'Updated Task');
    });

    expect(mockTodoAPI.updateTask).toHaveBeenCalledWith(1, { title: 'Updated Task' });
    expect(result.current.todos.find(t => t.id === 1)?.title).toBe('Updated Task');
    expect(result.current.error).toBe(null);
  });

  it('does not update task with empty title', async () => {
    mockTodoAPI.getTasks.mockResolvedValue(mockTasks);

    const { result } = renderHook(() => useTodos());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    await act(async () => {
      await result.current.onUpdateTask(1, '');
    });

    expect(mockTodoAPI.updateTask).not.toHaveBeenCalled();
  });

  it('handles axios network errors properly', async () => {
    const mockAxiosInstance = {
      get: jest.fn().mockRejectedValue(new Error('Network Error')),
      post: jest.fn(),
      put: jest.fn(),
      patch: jest.fn(),
      delete: jest.fn(),
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mockedAxios.create.mockReturnValue(mockAxiosInstance as any);

    // Since the API service is already mocked, we test that axios errors
    // would be handled by our error handler
    mockTodoAPI.getTasks.mockRejectedValue(new Error('Network Error'));

    const { result } = renderHook(() => useTodos());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.error).toBe('API Error');
    expect(result.current.todos).toEqual([]);
  });

  describe('TodoReducer', () => {
    const initialState: TodoState = {
      todos: [],
      isLoading: false,
      error: null,
    };

    const sampleTasks: Task[] = [
      { id: 1, title: 'Task 1', isCompleted: false, priority: 'p1' },
      { id: 2, title: 'Task 2', isCompleted: true, priority: 'p2' },
    ];

    it('handles ADD_TASK action', () => {
      const newTask: Task = { id: 3, title: 'New Task', isCompleted: false, priority: 'p2' };
      const action: Action = { type: 'ADD_TASK', payload: newTask };

      const newState = todoReducer(initialState, action);

      expect(newState.todos).toContainEqual(newTask);
      expect(newState.error).toBe(null);
    });

    it('handles UPDATE_TASK action', () => {
      const state: TodoState = { ...initialState, todos: sampleTasks };
      const updatedTask: Task = { ...sampleTasks[0], title: 'Updated Task' };
      const action: Action = { type: 'UPDATE_TASK', payload: updatedTask };

      const newState = todoReducer(state, action);

      expect(newState.todos.find(t => t.id === 1)?.title).toBe('Updated Task');
      expect(newState.error).toBe(null);
    });

    it('handles DELETE_TASK action', () => {
      const state: TodoState = { ...initialState, todos: sampleTasks };
      const action: Action = { type: 'DELETE_TASK', payload: 1 };

      const newState = todoReducer(state, action);

      expect(newState.todos).not.toContainEqual(sampleTasks[0]);
      expect(newState.todos).toHaveLength(1);
      expect(newState.error).toBe(null);
    });

    it('handles TOGGLE_TASK action', () => {
      const state: TodoState = { ...initialState, todos: sampleTasks };
      const toggledTask: Task = { ...sampleTasks[0], isCompleted: true };
      const action: Action = { type: 'TOGGLE_TASK', payload: toggledTask };

      const newState = todoReducer(state, action);

      expect(newState.todos.find(t => t.id === 1)?.isCompleted).toBe(true);
      expect(newState.error).toBe(null);
    });

    it('handles SET_TASKS action', () => {
      const action: Action = { type: 'SET_TASKS', payload: sampleTasks };

      const newState = todoReducer(initialState, action);

      expect(newState.todos).toEqual(sampleTasks);
      expect(newState.error).toBe(null);
    });

    it('handles SET_LOADING action', () => {
      const action: Action = { type: 'SET_LOADING', payload: true };

      const newState = todoReducer(initialState, action);

      expect(newState.isLoading).toBe(true);
    });

    it('handles SET_ERROR action', () => {
      const state: TodoState = { ...initialState, isLoading: true };
      const action: Action = { type: 'SET_ERROR', payload: 'Error message' };

      const newState = todoReducer(state, action);

      expect(newState.error).toBe('Error message');
      expect(newState.isLoading).toBe(false);
    });

    it('does not mutate original state', () => {
      const state: TodoState = { ...initialState, todos: sampleTasks };
      const newTask: Task = { id: 3, title: 'New Task', isCompleted: false, priority: 'p2' };
      const action: Action = { type: 'ADD_TASK', payload: newTask };

      const newState = todoReducer(state, action);

      expect(state.todos).toHaveLength(2);
      expect(newState.todos).toHaveLength(3);
      expect(state.todos).not.toBe(newState.todos);
    });

    it('preserves other todos when updating one', () => {
      const state: TodoState = { ...initialState, todos: sampleTasks };
      const updatedTask: Task = { ...sampleTasks[0], title: 'Updated Task' };
      const action: Action = { type: 'UPDATE_TASK', payload: updatedTask };

      const newState = todoReducer(state, action);

      expect(newState.todos).toHaveLength(2);
      expect(newState.todos.find(t => t.id === 2)).toEqual(sampleTasks[1]);
    });

    it('returns original state for unknown action type', () => {
      const action = { type: 'UNKNOWN_ACTION' } as unknown as Action;

      const newState = todoReducer(initialState, action);

      expect(newState).toBe(initialState);
    });

    it('clears error on successful operations', () => {
      const state: TodoState = {
        ...initialState,
        todos: sampleTasks,
        error: 'Previous error',
      };

      const newTask: Task = { id: 3, title: 'New Task', isCompleted: false, priority: 'p2' };
      const action: Action = { type: 'ADD_TASK', payload: newTask };

      const newState = todoReducer(state, action);

      expect(newState.error).toBe(null);
    });
  });
});

import { useReducer, useEffect } from 'react';
import { todoReducer, TodoState } from '../TodoReducer';
import { todoAPI, handleAPIError } from '../../../services/Api';

const initialState: TodoState = {
  todos: [],
  isLoading: true,
  error: null,
};

export function useTodos() {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  // Load todos from API on mount
  useEffect(() => {
    const loadTodos = async () => {
      try {
        dispatch({ type: 'SET_LOADING', payload: true });
        const todos = await todoAPI.getTasks();
        dispatch({ type: 'SET_TASKS', payload: todos });
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: handleAPIError(error) });
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    loadTodos();
  }, []);

  const onAddTask = async (title: string) => {
    if (title.trim() === '') return;

    try {
      dispatch({ type: 'SET_ERROR', payload: null });
      const newTask = await todoAPI.createTask({
        title: title.trim(),
        isCompleted: false,
        priority: 'p2',
      });
      dispatch({ type: 'ADD_TASK', payload: newTask });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: handleAPIError(error) });
    }
  };

  const onDeleteTask = async (id: number) => {
    try {
      dispatch({ type: 'SET_ERROR', payload: null });
      await todoAPI.deleteTask(id);
      dispatch({ type: 'DELETE_TASK', payload: id });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: handleAPIError(error) });
    }
  };

  const onToggleTask = async (id: number) => {
    try {
      dispatch({ type: 'SET_ERROR', payload: null });
      const updatedTask = await todoAPI.toggleTask(id);
      dispatch({ type: 'TOGGLE_TASK', payload: updatedTask });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: handleAPIError(error) });
    }
  };

  const onUpdateTask = async (id: number, title: string) => {
    if (title.trim() === '') return;

    try {
      dispatch({ type: 'SET_ERROR', payload: null });
      const updatedTask = await todoAPI.updateTask(id, { title: title.trim() });
      dispatch({ type: 'UPDATE_TASK', payload: updatedTask });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: handleAPIError(error) });
    }
  };

  return {
    todos: state.todos,
    isLoading: state.isLoading,
    error: state.error,
    onAddTask,
    onDeleteTask,
    onToggleTask,
    onUpdateTask,
  };
}

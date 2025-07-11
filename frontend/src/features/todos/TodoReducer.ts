import type { Task } from './TodoTaskTypes';

export type TodoState = {
  todos: Task[];
  isLoading: boolean;
  error: string | null;
};

export type Action =
  | { type: 'ADD_TASK'; payload: Task }
  | { type: 'UPDATE_TASK'; payload: Task }
  | { type: 'DELETE_TASK'; payload: number }
  | { type: 'TOGGLE_TASK'; payload: Task }
  | { type: 'SET_TASKS'; payload: Task[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null };

export function todoReducer(state: TodoState, action: Action): TodoState {
  switch (action.type) {
    case 'ADD_TASK':
      return {
        ...state,
        todos: [...state.todos, action.payload],
        error: null,
      };
    case 'UPDATE_TASK':
      return {
        ...state,
        todos: state.todos.map(todo => (todo.id === action.payload.id ? action.payload : todo)),
        error: null,
      };
    case 'DELETE_TASK':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload),
        error: null,
      };
    case 'TOGGLE_TASK':
      return {
        ...state,
        todos: state.todos.map(todo => (todo.id === action.payload.id ? action.payload : todo)),
        error: null,
      };
    case 'SET_TASKS':
      return {
        ...state,
        todos: action.payload,
        error: null,
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
}

import { useTodos } from '../../features/todos/hooks/useTodos';
import { type Task } from '../../features/todos/TodoTaskTypes';
import TodoItem from './TodoItem';

type TodoListProps = {
  tasks: Task[];
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
  onUpdate: (id: number, title: string) => void;
};

export default function TodoList({
  tasks,
  onDelete,
  onToggle,
  onUpdate,
}: TodoListProps) {
  const {
    isLoading,
  } = useTodos();

  if (tasks.length === 0 && !isLoading) {
    return (
      <div className="text-center py-12">
        <div className="mb-4">
          <svg
            className="w-16 h-16 text-gray-600 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <p className="text-gray-400 text-lg">No tasks yet!</p>
        <p className="text-gray-500 text-sm mt-1">
          Add your first task above to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TodoItem
          key={task.id}
          task={task}
          onDelete={onDelete}
          onToggle={onToggle}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
}

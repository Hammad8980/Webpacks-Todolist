import { useState } from 'react';
import type { PropsWithChildren } from 'react';
import type { Task } from '../../features/todos/TodoTaskTypes';
import Button from '../ui/Button';

type DeletePhase =
  | 'idle'
  | 'expanding'
  | 'spreading'
  | 'transforming'
  | 'fading'
  | 'complete';

type TodoItemProps = PropsWithChildren<{
  task: Task;
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
  onUpdate: (id: number, title: string) => void;
}>;

export default function TodoItem({
  task,
  children,
  onDelete,
  onToggle,
  onUpdate,
}: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [deletePhase, setDeletePhase] = useState<DeletePhase>('idle');

  const handleSave = () => {
    if (editTitle.trim() !== '') {
      onUpdate(task.id, editTitle.trim());
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditTitle(task.title);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (deletePhase !== 'idle') return;

    setDeletePhase('expanding');

    // Phase 1: Expand red background (0.3s)
    setTimeout(() => {
      setDeletePhase('spreading');
    }, 300);

    // Phase 2: Continue expanding and start icon transformation (0.2s)
    setTimeout(() => {
      setDeletePhase('transforming');
    }, 500);

    // Phase 3: Show checkmark and prepare for fade (0.3s)
    setTimeout(() => {
      setDeletePhase('fading');
    }, 800);

    // Phase 4: Complete fade out and remove (0.4s)
    setTimeout(() => {
      setDeletePhase('complete');
      onDelete(task.id);
    }, 1200);
  };

  return (
    <>
      <div
        className={`relative flex items-center gap-3 p-4 rounded-xl border transition-all duration-200 shadow-sm hover:shadow-md overflow-hidden ${
          deletePhase === 'fading'
            ? 'animate-fadeOut'
            : deletePhase === 'idle'
              ? 'bg-gray-700 hover:bg-gray-650 border-gray-600'
              : 'bg-gray-700 border-gray-600'
        }`}
      >
        {/* Red expanding background */}
        <div
          className={`absolute inset-0 bg-red-600 transition-all duration-500 ease-out ${
            deletePhase === 'expanding'
              ? 'scale-x-50 opacity-80'
              : deletePhase === 'spreading'
                ? 'scale-x-100 opacity-90'
                : deletePhase === 'transforming' || deletePhase === 'fading'
                  ? 'scale-100 opacity-95'
                  : 'scale-x-0 opacity-0'
          }`}
          style={{
            transformOrigin: 'right center',
            borderRadius: 'inherit',
          }}
        />

        {/* Content layer */}
        <div className="relative z-10 flex items-center gap-3 w-full">
          <input
            type="checkbox"
            checked={task.isCompleted}
            onChange={() => onToggle(task.id)}
            className="h-5 w-5 text-blue-500 bg-gray-600 border-gray-500 rounded focus:ring-blue-400 focus:ring-2"
            disabled={deletePhase !== 'idle'}
          />
          <span
            className={`flex-grow text-lg transition-colors duration-200 text-justify break-all ${
              task.isCompleted ? 'line-through text-gray-400' : 'text-gray-200'
            } ${deletePhase !== 'idle' ? 'text-white' : ''}`}
          >
            {task.title}
          </span>
          <div className="flex gap-2">
            <Button
              onClick={() => setIsEditing(true)}
              disabled={deletePhase !== 'idle'}
              className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </Button>

            {/* Advanced Delete Button */}
            <Button
              onClick={handleDelete}
              disabled={deletePhase !== 'idle'}
              className={`relative p-2 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md disabled:cursor-not-allowed overflow-hidden ${
                deletePhase === 'expanding' ||
                deletePhase === 'spreading' ||
                deletePhase === 'transforming'
                  ? 'bg-red-700 scale-110'
                  : deletePhase === 'idle'
                    ? 'bg-red-600 hover:bg-red-700 text-white'
                    : 'bg-red-600 text-white'
              }`}
            >
              {/* Trash Icon */}
              <svg
                className={`w-4 h-4 transition-all duration-300 ${
                  deletePhase === 'transforming' || deletePhase === 'fading'
                    ? 'opacity-0 scale-0 rotate-180'
                    : 'opacity-100 scale-100 rotate-0'
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>

              {/* Checkmark Icon */}
              <svg
                className={`absolute inset-0 m-auto w-4 h-4 text-white transition-all duration-300 ${
                  deletePhase === 'transforming'
                    ? 'opacity-100 scale-110 animate-bounce'
                    : deletePhase === 'fading'
                      ? 'opacity-100 scale-100'
                      : 'opacity-0 scale-0'
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </Button>
          </div>
        </div>
        {children}
      </div>

      {isEditing && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn rounded-xl !mt-[0]"
          onClick={handleCancel}
        >
          <div
            className="bg-gray-800 border border-gray-600 rounded-xl p-6 w-full max-w-md mx-4 shadow-2xl animate-slideIn"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-semibold mb-6 text-gray-200 flex items-center gap-2">
              <svg
                className="w-5 h-5 text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              Edit Task
            </h3>

            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="w-full p-4 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none mb-6 transition-all duration-200"
              placeholder="Enter task title..."
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSave();
                if (e.key === 'Escape') handleCancel();
              }}
            />

            <div className="flex gap-3 justify-end">
              <Button
                onClick={handleCancel}
                className="px-6 py-3 text-gray-300 bg-gray-700 hover:bg-gray-600 border border-gray-600 rounded-lg transition-all duration-200"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

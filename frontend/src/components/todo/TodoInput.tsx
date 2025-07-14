import { useState, type FormEvent } from 'react';
import { Task } from '../../features/todos/TodoTaskTypes';
import Button from '../ui/Button';

type TodoInputProps = {
  tasks: Task[];
  onAddTask: (taskName: string) => void;
};

function TodoInput({ tasks, onAddTask }: TodoInputProps) {
  const [taskName, setTaskName] = useState('');
  const [error, setError] = useState('');

  const handleAddTasks = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // This is to prevent the browser from refreshing the page

    setError('');

    if (!taskName.trim()) {
      setError('Please enter a task');
      return;
    }

    const isDuplicate = tasks.some(
      task => task.title.toLowerCase().trim() === taskName.toLowerCase().trim()
    );

    if (isDuplicate) {
      setError('Task already exists!');
      setTaskName(''); // Clear input field
      setTimeout(() => setError(''), 2500);
      return;
    }
    onAddTask(taskName);
    setTaskName('');
  };
  return (
    <div className="space-y-2">
      <form className="flex" onSubmit={handleAddTasks}>
        <input
          type="text"
          value={taskName}
          placeholder="What needs to be done?"
          onChange={e => setTaskName(e.target.value)}
          className="flex-grow p-3 bg-gray-700 border border-gray-600 rounded-l-lg text-white placeholder-gray-400 focus:outline-none focus:ring-0 focus:ring-inset focus:border-blue-500"
        />

        <Button
          className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-r-lg transition-all duration-200 shadow-lg hover:shadow-xl"
          type="submit"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </Button>
      </form>

      {/* Error message display */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-md animate-fade-in">
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <span className="font-medium">{error}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default TodoInput;

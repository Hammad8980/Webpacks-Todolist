import { useState, type FormEvent } from 'react';
import Button from '../ui/Button';
type TodoInputProps = {
  onAddTask: (taskName: string) => void;
};

function TodoInput({ onAddTask }: TodoInputProps) {
  const [taskName, setTaskName] = useState('');
  const handleAddTasks = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Sometimes page is refreshed upon trigger of Event so this property is to prevent the browser from doing that
    onAddTask(taskName);
    setTaskName('');
  };
  return (
    <form className="flex" onSubmit={handleAddTasks}>
      {/*Below is the traditional onKeyDown method Commented for learning purposes*/}
      {/* <input
          value={taskName}
          placeholder='Enter text...'
          onChange={(e) => setTaskName(e.target.value)}
          onKeyDown={(e)=> { if (e.key === "Enter") { handleAddTasks(); }}} // Enter key is send
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold ml-2 pb-0.5 px-2 rounded"
          onClick={handleAddTasks}
        >
          +
        </button> */}
      <input
        type="text"
        value={taskName}
        placeholder="What needs to be done?"
        onChange={(e) => setTaskName(e.target.value)}
        className="flex-grow p-3 bg-gray-700 border border-gray-600 rounded-l-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
      />
      <Button
        className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-r-lg transition-all duration-200 shadow-lg hover:shadow-xl"
        type="submit"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
      </Button>
    </form>
  );
}

export default TodoInput;

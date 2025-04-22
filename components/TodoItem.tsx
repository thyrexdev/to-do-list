import { motion } from 'framer-motion';
import { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  const priorityColors = {
    low: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      layout
      className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100"
    >
      <div className="flex items-center gap-4 flex-1">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="w-5 h-5 rounded-full border-gray-300 focus:ring-blue-500 text-blue-600 cursor-pointer"
        />
        <div className="flex flex-col flex-1">
          <div className="flex items-center gap-3">
            <span className={`${
              todo.completed 
                ? 'line-through text-gray-400 font-medium' 
                : 'text-gray-700 font-medium'
            }`}>
              {todo.text}
            </span>
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${priorityColors[todo.priority]}`}>
              {todo.priority}
            </span>
          </div>
          <div className="flex gap-4 text-xs text-gray-400 mt-1">
            <span>Created: {new Date(todo.createdAt).toLocaleString()}</span>
          </div>
        </div>
      </div>
      <button
        onClick={() => onDelete(todo.id)}
        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors duration-200 ml-4"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
      </button>
    </motion.div>
  );
} 
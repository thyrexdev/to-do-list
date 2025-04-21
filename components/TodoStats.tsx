import { Todo } from '../types/todo';

interface TodoStatsProps {
  todos: Todo[];
}

export default function TodoStats({ todos }: TodoStatsProps) {
  const completed = todos.filter(todo => todo.completed).length;
  const total = todos.length;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-2xl font-bold text-blue-600">{total}</p>
          <p className="text-gray-600">Total Tasks</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-green-600">{completed}</p>
          <p className="text-gray-600">Completed</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-purple-600">{percentage}%</p>
          <p className="text-gray-600">Progress</p>
        </div>
      </div>
      <div className="mt-4 bg-gray-200 rounded-full h-2">
        <div 
          className="bg-blue-600 h-2 rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
} 
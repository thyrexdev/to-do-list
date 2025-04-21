'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Todo } from '../types/todo';
import TodoItem from './TodoItem';

type SortOption = 'date' | 'alphabetical' | 'completed';
type FilterOption = 'all' | 'active' | 'completed';

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('date');
  const [filterBy, setFilterBy] = useState<FilterOption>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('low');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const savedTodos = localStorage.getItem('todos');
      if (savedTodos) {
        setTodos(JSON.parse(savedTodos));
      }
    } catch (err) {
      setError('Failed to load todos');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      const newTodo: Todo = {
        id: Date.now().toString(),
        text: input.trim(),
        completed: false,
        createdAt: new Date(),
        priority: priority
      };
      setTodos([...todos, newTodo]);
      setInput('');
      setPriority('low');
    }
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const sortTodos = (todos: Todo[]) => {
    switch (sortBy) {
      case 'date':
        return [...todos].sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case 'alphabetical':
        return [...todos].sort((a, b) => a.text.localeCompare(b.text));
      case 'completed':
        return [...todos].sort((a, b) => Number(b.completed) - Number(a.completed));
      default:
        return todos;
    }
  };

  const filterTodos = (todos: Todo[]) => {
    let filtered = todos;
    
    // Filter by status
    if (filterBy !== 'all') {
      filtered = filtered.filter(todo => 
        filterBy === 'completed' ? todo.completed : !todo.completed
      );
    }
    
    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(todo => 
        todo.text.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return filtered;
  };

  const processedTodos = sortTodos(filterTodos(todos));

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-gray-100">
        <h1 className="text-4xl text-gray-800 font-bold mb-8 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Task Manager
        </h1>
        
        <form onSubmit={addTodo} className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="What needs to be done?"
              className="flex-1 p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-600 placeholder-gray-400 bg-white/50"
            />
            <button
              type="submit"
              className="px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 font-medium shadow-md hover:shadow-lg"
            >
              Add Task
            </button>
          </div>

          <div className="flex flex-wrap gap-4 mt-4">
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
              className="p-3 border border-gray-200 rounded-xl text-gray-600 bg-white/50 hover:bg-white transition-colors duration-200"
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
          </div>
        </form>

        <div className="flex flex-wrap gap-4 mb-8">
          <div className="flex-1 min-w-[200px] bg-white rounded-xl p-4 shadow-sm">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="w-full p-3 border border-gray-200 rounded-xl text-gray-600 bg-white hover:bg-gray-50 transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="date">Sort by Date</option>
              <option value="alphabetical">Sort Alphabetically</option>
              <option value="completed">Sort by Completed</option>
            </select>
          </div>

          <div className="flex-1 min-w-[200px] bg-white rounded-xl p-4 shadow-sm">
            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value as FilterOption)}
              className="w-full p-3 border border-gray-200 rounded-xl text-gray-600 bg-white hover:bg-gray-50 transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Tasks</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div className="flex-1 min-w-[200px] bg-white rounded-xl p-4 shadow-sm">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tasks..."
              className="w-full p-3 border border-gray-200 rounded-xl text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
            />
          </div>
        </div>

        {isLoading && (
          <div className="text-center py-10">
            <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"/>
            <p className="text-gray-500 mt-4">Loading your tasks...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 text-red-500 p-4 rounded-xl mb-4 border border-red-100">
            {error}
          </div>
        )}

        <div className="space-y-3">
          <AnimatePresence>
            {processedTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
              />
            ))}
          </AnimatePresence>
          
          {processedTodos.length === 0 && !isLoading && (
            <div className="text-center py-16 bg-gray-50 rounded-2xl">
              <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <p className="text-gray-500 text-lg">No tasks found. Add some tasks to get started!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 
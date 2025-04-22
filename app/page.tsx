import TodoList from '../components/Todo';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-gray-50 to-purple-50 py-12">
      <TodoList />
    </main>
  );
}

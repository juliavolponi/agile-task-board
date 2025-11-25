import React, { useState } from 'react';
import { Plus, Loader2, Save, X } from 'lucide-react';
import { useTaskBoard } from './hooks/useTaskBoard.ts';
import TaskColumn from './components/TaskColumn.tsx';
import type { TaskStatus } from './types/TaskTypes.ts';

// --- Modal Component (Kept here for simplicity, but could be separate) ---
const AddTaskModal: React.FC<{ isOpen: boolean; onClose: () => void; onAddTask: (task: { title: string; description: string }) => void }> = ({ isOpen, onClose, onAddTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (title.trim().length < 3) {
      setError('Title must be at least 3 characters long.');
      return;
    }
    onAddTask({ title: title.trim(), description: description.trim() });
    setTitle('');
    setDescription('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-lg m-4 transform transition-all duration-300" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4 border-b pb-3">
          <h2 className="text-2xl font-bold text-gray-800">Add New Task</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-red-500 p-2 transition-colors"><X size={24} /></button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-1">Title (Required)</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
              placeholder="e.g., Prepare LinkedIn post"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-1">Description (Optional)</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
              placeholder="Detailed steps for the task..."
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-4 font-medium">{error}</p>}
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-bold transition-all duration-200 shadow-md flex items-center justify-center">
            <Save size={20} className="mr-2" /> Save Task
          </button>
        </form>
      </div>
    </div>
  );
};

// --- Main App Component ---

export const App = () => {
  const { tasks, loading, handleAddTask, handleMoveTask, handleDeleteTask } = useTaskBoard();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Loader2 className="animate-spin text-blue-500" size={48} />
        <span className="ml-4 text-xl font-medium text-gray-700">Loading Task Data...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans p-4 sm:p-8">
      <header className="flex flex-col sm:flex-row justify-between items-center mb-8 border-b pb-4">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4 sm:mb-0">
          Professional Task Board
          <span className="text-blue-600 text-2xl font-light block sm:inline sm:ml-4">
             (React & TypeScript)
          </span>
        </h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-xl font-bold transition-all duration-200 shadow-lg flex items-center hover:shadow-xl"
        >
          <Plus size={20} className="mr-2" />
          Add New Task
        </button>
      </header>

      <main className="flex flex-col md:flex-row gap-6 overflow-x-auto pb-4">
        {/* Render columns dynamically using the keys defined in TaskStatus */}
        {(Object.keys(tasks) as TaskStatus[]).map(statusKey => (
          <TaskColumn
            key={statusKey}
            status={statusKey}
            tasks={tasks[statusKey]}
            handleMoveTask={handleMoveTask}
            handleDeleteTask={handleDeleteTask}
          />
        ))}
      </main>
      
      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddTask={handleAddTask}
      />
    </div>
  );
};

export default App;
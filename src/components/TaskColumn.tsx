import React, { useCallback, useMemo } from 'react';
import { Trash2 } from 'lucide-react';
import type { Task, TaskStatus } from '../types/TaskTypes.ts';
import { STATUS_TITLES, STATUS_COLORS } from '../types/TaskTypes.ts';
import type { TaskBoardAPI } from '../hooks/useTaskBoard.ts';

// reusable utility button for clean component structure
const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, className = '', ...props }) => (
  <button
    className={`px-3 py-1 font-medium text-white text-xs rounded-md shadow-sm transition-transform duration-100 ease-in-out transform hover:scale-[1.05] active:scale-[0.98] ${className}`}
    {...props}
  >
    {children}
  </button>
);

// --- Task Card Sub-Component ---

interface TaskCardProps {
    task: Task;
    handleMoveTask: TaskBoardAPI['handleMoveTask'];
    handleDeleteTask: TaskBoardAPI['handleDeleteTask'];
}

const TaskCard: React.FC<TaskCardProps> = React.memo(({ task, handleMoveTask, handleDeleteTask }) => {
  
  const timeDisplay = useMemo(() => new Date(task.createdAt).toLocaleTimeString(), [task.createdAt]);

  const availableStatuses = useMemo(() => 
    (Object.keys(STATUS_TITLES) as TaskStatus[]).filter(s => s !== task.status)
  , [task.status]);

  const handleDelete = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    handleDeleteTask(task.id);
  }, [task.id, handleDeleteTask]);

  return (
    <div className="p-4 mb-3 bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 border-t-4 border-t-blue-500/80">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-bold text-gray-800 break-words pr-8">{task.title}</h3>
        <button
          onClick={handleDelete}
          className="text-red-400 hover:text-red-600 transition-colors p-1 rounded-full hover:bg-red-50"
          aria-label={`Delete task ${task.title}`}
        >
          <Trash2 size={18} />
        </button>
      </div>
      <p className="mt-1 text-sm text-gray-600 mb-3 break-words">
        {task.description || 'No description provided.'}
      </p>
      <div className="flex flex-wrap items-center justify-between pt-2 border-t border-gray-100">
        <span className="text-xs text-gray-500">Created: {timeDisplay}</span>
        
        {availableStatuses.length > 0 && (
          <div className="flex space-x-1">
            {availableStatuses.map(status => (
              <Button
                key={status}
                onClick={() => handleMoveTask(task.id, status)}
                className={`text-xs ${STATUS_COLORS[status]}`}
              >
                Move to {STATUS_TITLES[status].split(' ')[0]}
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
});

// --- Main Task Column Component ---

interface TaskColumnProps {
    status: TaskStatus;
    tasks: Task[];
    handleMoveTask: TaskBoardAPI['handleMoveTask'];
    handleDeleteTask: TaskBoardAPI['handleDeleteTask'];
}

const TaskColumn: React.FC<TaskColumnProps> = ({ status, tasks, handleMoveTask, handleDeleteTask }) => {
  return (
    <div className="flex-1 min-w-[300px] p-4 bg-gray-50 rounded-2xl shadow-inner mx-2 border border-gray-200">
      <h2 className={`text-xl font-extrabold mb-4 p-3 text-white rounded-lg text-center shadow-lg ${STATUS_COLORS[status]}`}>
        {STATUS_TITLES[status]} ({tasks.length})
      </h2>
      <div className="min-h-[100px]">
        {tasks.length === 0 ? (
          <p className="text-center text-gray-400 p-6 border border-dashed border-gray-300 rounded-xl bg-white/50">
            No tasks here.
          </p>
        ) : (
          tasks.map((task) => (
            <TaskCard 
              key={task.id} 
              task={task} 
              handleMoveTask={handleMoveTask}
              handleDeleteTask={handleDeleteTask} 
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TaskColumn;
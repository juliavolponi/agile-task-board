// Union Type: Defines the possible states (columns) for a Task.
export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'DONE';

/**
 * Interface defining the structure of a single Task object.
 */
export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: number; // Timestamp for sorting and display
}

/**
 * Type defining the data structure for the entire application state.
 */
export type TaskBoardState = Record<TaskStatus, Task[]>;

// Constants used across the application
export const STATUS_TITLES: Record<TaskStatus, string> = {
  TODO: 'To Do',
  IN_PROGRESS: 'In Progress',
  DONE: 'Done',
};

export const STATUS_COLORS: Record<TaskStatus, string> = {
  TODO: 'bg-red-500 hover:bg-red-600',
  IN_PROGRESS: 'bg-yellow-500 hover:bg-yellow-600',
  DONE: 'bg-green-500 hover:bg-green-700',
};

export const initialTasks: TaskBoardState = {
  TODO: [
    { id: '1', title: 'Refine Commit Plan', description: 'Ensure history looks professional.', status: 'TODO', createdAt: Date.now() - 3600000 },
  ],
  IN_PROGRESS: [
    { id: '2', title: 'Review TypeScript Types', description: 'Confirm strong typing across all interfaces.', status: 'IN_PROGRESS', createdAt: Date.now() - 1800000 },
  ],
  DONE: [
    { id: '3', title: 'Vite Project Initialization', description: 'Base setup completed successfully.', status: 'DONE', createdAt: Date.now() - 7200000 },
  ],
};

export const STORAGE_KEY = 'kanban_task_board';
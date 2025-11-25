import { useState, useEffect, useCallback, useMemo } from 'react';
import type { Task, TaskStatus, TaskBoardState } from '../types/TaskTypes.ts';
import { initialTasks, STORAGE_KEY } from '../types/TaskTypes.ts';
/**
 * Utility function to safely load tasks from localStorage.
 */
const loadTasks = (): TaskBoardState => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    // If data exists, parse it. Otherwise, return the initial set.
    return data ? JSON.parse(data) : initialTasks;
  } catch (error) {
    console.error('Error loading tasks from localStorage, returning default state:', error);
    return initialTasks;
  }
};

/**
 * Utility function to safely save tasks to localStorage.
 */
const saveTasks = (tasks: TaskBoardState): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error('Error saving tasks to localStorage:', error);
  }
};

// Interface for the exposed values and handlers from the hook
export interface TaskBoardAPI {
    tasks: TaskBoardState;
    loading: boolean;
    handleAddTask: (task: Omit<Task, 'id' | 'status' | 'createdAt'>) => void;
    handleMoveTask: (taskId: string, newStatus: TaskStatus) => void;
    handleDeleteTask: (taskId: string) => void;
}

/**
 *custom React Hook for managing all Task Board state and persistence logic
 */
export const useTaskBoard = (): TaskBoardAPI => {
    const [tasks, setTasks] = useState<TaskBoardState>(initialTasks);
    const [loading, setLoading] = useState(false);
    const [isDataLoaded, setIsDataLoaded] = useState(false);

    // --- useEffect 1: Initial Load (Demonstrates async/await fetch pattern) ---
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                await new Promise(resolve => setTimeout(resolve, 500)); 

                const storedTasks = loadTasks(); 
                setTasks(storedTasks);
            } catch (error) {
                console.error('Simulated API call failed or data corrupted.', error);
                setTasks(initialTasks); // Fallback
            } finally {
                setLoading(false);
                setIsDataLoaded(true);
            }
        };
        fetchData();
    }, []);

    //useEffect Persistence (Saves to localStorage whenever tasks change) ---
    useEffect(() => {
        // save if data has finished its initial load to prevent overwriting
        if (isDataLoaded) {
            saveTasks(tasks);
        }
    }, [tasks, isDataLoaded]);


    const handleAddTask = useCallback((newTask: Omit<Task, 'id' | 'status' | 'createdAt'>) => {
        const task: Task = {
            ...newTask,
            id: crypto.randomUUID(),
            status: 'TODO',
            createdAt: Date.now(),
        };
        setTasks(prev => ({
            ...prev,
            TODO: [task, ...prev.TODO], // Add new task to the start of TODO list
        }));
    }, []);

    const handleMoveTask = useCallback((taskId: string, newStatus: TaskStatus) => {
        setTasks(prev => {
            let taskToMove: Task | null = null;
            const newTasks: TaskBoardState = { ...prev };

            // Find and remove the task from its source column
            for (const status in newTasks) {
                const key = status as TaskStatus;
                const index = newTasks[key].findIndex(t => t.id === taskId);
                if (index !== -1) {
                    [taskToMove] = newTasks[key].splice(index, 1); 
                    break;
                }
            }

            //Insert into the target column and update its status
            if (taskToMove) {
                taskToMove.status = newStatus;
                // Add to target and sort by creation time (newest first)
                newTasks[newStatus] = [taskToMove, ...newTasks[newStatus]];
            }

            return newTasks;
        });
    }, []);

    const handleDeleteTask = useCallback((taskId: string) => {
        setTasks(prev => {
            const newTasks: TaskBoardState = { ...prev };
            // Filter out the task in all columns (guarantees removal)
            for (const status in newTasks) {
                const key = status as TaskStatus;
                newTasks[key] = newTasks[key].filter(t => t.id !== taskId);
            }
            return newTasks;
        });
    }, []);

    return {
        tasks,
        loading,
        handleAddTask,
        handleMoveTask,
        handleDeleteTask,
    };
};
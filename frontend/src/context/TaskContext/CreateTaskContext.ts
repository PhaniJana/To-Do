import { createContext } from "react";


export type Task = {
    _id: string;
    title: string;
    description: string;
    completed: boolean;
}

export type CreateTaskContextType = {
    tasks: Task[];
    setTasks: (tasks: Task[]) => void;
    addTask: (title: string, description: string) => Promise<void>;
    toggleComplete: (id: string) => Promise<void>;
    deleteTask: (id: string) => Promise<void>;
    updateTask: (task: Task) => Promise<void>;
    loading: boolean;
    setLoading: (loading: boolean) => void;
}

export const TaskContext = createContext<CreateTaskContextType | null>(null);
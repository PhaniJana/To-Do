import { useEffect, useState } from "react";
import { TaskContext, type Task } from "./CreateTaskContext";
import api from "../../api/client";
import { useUserData } from "../userContext/useUserData";



interface TaskContextProviderProps {
    children: React.ReactNode;
}


export const TaskContextProvider: React.FC<TaskContextProviderProps> = ({ children }) => {
  const { isAuthenticated } = useUserData();
  const [loading, setLoading] = useState(false);
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
      const fetchTasks = async () => {
        if (!isAuthenticated) {
          setTasks([]);
          return;
        }
        setLoading(true);
        try {
          const response = await api.get("/api/tasks");
          setTasks(response.data as Task[]);
        } finally {
          setLoading(false);
        }
      };

      fetchTasks();
    }, [isAuthenticated]);

    const toggleComplete = async (id: string) => {
      const task = tasks.find((item) => item._id === id);
      if (!task) {
        return;
      }
      const nextCompleted = !task.completed;
      const response = await api.patch(`/api/tasks/${id}/completed`, {
        completed: nextCompleted,
      });
      const updated = response.data as Task;
      setTasks((prev) => prev.map((item) => (item._id === id ? updated : item)));
    };

    const deleteTask = async (id: string) => {
      await api.delete(`/api/tasks/${id}`);
      setTasks((prev) => prev.filter((task) => task._id !== id));
    };

    const updateTask = async (task: Task) => {
      const response = await api.put(`/api/tasks/${task._id}`, {
        title: task.title,
        description: task.description,
        completed: task.completed,
      });
      const updated = response.data as Task;
      setTasks((prev) => prev.map((item) => (item._id === updated._id ? updated : item)));
    };

    const addTask = async (title: string, description: string) => {
      setLoading(true);
      try {
        const response = await api.post("/api/tasks", { title, description });
        const created = response.data as Task;
        setTasks((prev) => [created, ...prev]);
      } finally {
        setLoading(false);
      }
    }

  return <TaskContext.Provider value={{ tasks, setTasks, toggleComplete, deleteTask, updateTask, addTask, loading, setLoading }}>
        {children}
    </TaskContext.Provider>

}


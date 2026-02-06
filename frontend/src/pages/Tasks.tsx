import AddTask from "../components/AddTask";
import Navbar from "../components/Navbar";
import TaskCard from "../components/TaskCard";
import type { Task } from "../context/TaskContext/CreateTaskContext";
import { useTaskData } from "../context/TaskContext/useTaskData";

const Tasks = () => {
  const { tasks, toggleComplete, deleteTask, updateTask, loading } = useTaskData();

  return (
    <div className="bg-white dark:bg-slate-900 min-h-screen text-black dark:text-white transition-colors">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 pb-10">
        {loading && (
          <div className="text-sm text-gray-500 dark:text-gray-300 mt-4">Loading tasks...</div>
        )}

        {tasks.map((task: Task) => (
          <TaskCard
            key={task._id}
            task={task}
            onToggleComplete={toggleComplete}
            onDelete={deleteTask}
            onUpdate={updateTask}
          />
        ))}

        <AddTask />
      </div>
    </div>
  );
};

export default Tasks;

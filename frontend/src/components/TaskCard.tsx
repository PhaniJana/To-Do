import {
  Card,
  CardContent,
  Typography,
  Checkbox,
  Button,
  Box,
} from "@mui/material";
import { useState } from "react";
import type { Task } from "../context/TaskContext/CreateTaskContext";



type TaskCardProps = {
  task: Task;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (task: Task) => void;
};

const TaskCard = ({
  task,
  onToggleComplete,
  onDelete,
  onUpdate,
}: TaskCardProps) => {
  const [openUpdate, setOpenUpdate] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const handleOpenUpdate = () => {
    setTitle(task.title);
    setDescription(task.description);
    setOpenUpdate(true);
  };

  const handleUpdateSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      return;
    }
    onUpdate({ ...task, title, description });
    setOpenUpdate(false);
  };

  return (
    <>
      <Card className="my-4 p-4 bg-white dark:bg-slate-800! transition-colors">
        <CardContent>

        {/* Task Title */}
        <Typography
          variant="h6"
          className={`font-semibold dark:text-blue-300
${
            task.completed ? "line-through opacity-60" : ""
          }`}
        >
          {task.title}
        </Typography>

        {/* Task Description */}
        <Typography
          variant="body2"
          className="text-gray-600 dark:text-gray-300 mt-1"
        >
          {task.description}
        </Typography>

        {/* Actions */}
        <Box className="flex items-center justify-between mt-4">

          {/* Completed Checkbox */}
          <Box className="flex items-center gap-2">
            <Checkbox
              checked={task.completed}
              onChange={() => onToggleComplete(task._id)}
            />
            <Typography>Completed</Typography>
          </Box>

          {/* Buttons */}
          <Box className="flex gap-2">
            <Button
              variant="outlined"
              onClick={handleOpenUpdate}
            >
              Update
            </Button>

            <Button
              variant="contained"
              color="error"
              onClick={() => onDelete(task._id)}
            >
              Delete
            </Button>
          </Box>

        </Box>
        </CardContent>
      </Card>

      {openUpdate && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setOpenUpdate(false)}
          />

          <div className="relative bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg w-100 transition-all">
            <h2 className="text-xl font-semibold mb-4 dark:text-white">
              Update Task
            </h2>

            <form onSubmit={handleUpdateSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Task Title"
                className="p-2 border border-gray-300 dark:border-slate-600 rounded bg-white dark:bg-slate-700 dark:text-white"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <textarea
                placeholder="Description"
                className="p-2 border border-gray-300 dark:border-slate-600 rounded bg-white dark:bg-slate-700 dark:text-white"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <Button type="submit" variant="contained" color="success">
                Save Changes
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default TaskCard;

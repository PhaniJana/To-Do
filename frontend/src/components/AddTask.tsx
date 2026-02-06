import Button from "@mui/material/Button"
import AddIcon from '@mui/icons-material/Add';
import {  useState } from "react";
import { useTaskData } from "../context/TaskContext/useTaskData";


const AddTask = () => {
const [open, setOpen] = useState(false);
const [title, setTitle] = useState("");
const [description, setDescription] = useState("");
const {addTask,loading} = useTaskData();
const handleClick = () => {
  setOpen(true);
};
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

  e.preventDefault();
  console.log("Adding task with title:", title, "and description:", description);
  if (!title.trim() || !description.trim()) {
    return;
  }
  await addTask(title, description);
  setTitle("");
  setDescription("");
  setOpen(false);
}

return (
  <div className="flex justify-center">

    {/* Add Button */}
    <Button
    
      size="large"
      onClick={handleClick}
      loading={loading}
      loadingPosition="start"
      startIcon={<AddIcon />}
      variant="contained"
      sx={{
        marginTop: 4,
        backgroundColor: "#bbf7d0",
        color: "#064e3b",
        "&:hover": {
          backgroundColor: "#86efac",
        },
        ".dark &": {
          backgroundColor: "#22c55e",
          "&:hover": {
            backgroundColor: "#16a34a",
          },
        },
      }}
    >
      Add
    </Button>


    {/* Modal */}
    {open && (
      <div className="fixed inset-0 flex items-center justify-center z-50">

        {/* Background Blur Overlay */}
        <div
          className="absolute inset-0 bg-black/30 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />

        {/* Modal Box */}
        <div className="relative bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg w-100 transition-all">

          <h2 className="text-xl font-semibold mb-4 dark:text-white">
            Add New Task
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

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
              value ={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <Button type='submit' variant="contained" color="success">
              Save Task
            </Button>

          </form>

        </div>

      </div>
    )}

  </div>
);
}

export default AddTask
import { Button } from "@mui/material";

interface DialogBoxProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    title: string;
    setTitle: React.Dispatch<React.SetStateAction<string>>;
    description: string;
    setDescription: React.Dispatch<React.SetStateAction<string>>;
    handleSubmit: (e: React.SubmitEvent) => Promise<void>;
} 

const DialogBox:React.FC<DialogBoxProps> = ({open, setOpen, title, setTitle, description, setDescription, handleSubmit}) => {
  return (
    <div>
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
  )
}

export default DialogBox
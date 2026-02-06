import { useContext } from "react";
import { TaskContext, type CreateTaskContextType } from "./CreateTaskContext";

export const useTaskData = ():CreateTaskContextType => {
    const context= useContext(TaskContext);
    if(!context){
        throw new Error("useTaskData must be used within a TaskContextProvider");
    }
    return context;
}
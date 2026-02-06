import { useContext } from "react"
import { userContext, type CreateUserContextType } from "./CreateUserContext";

export const useUserData = ():CreateUserContextType => {
    const context= useContext(userContext);
    if(!context){
        throw new Error("useUserData must be used within a UserContextProvider");
    }
    return context;
}
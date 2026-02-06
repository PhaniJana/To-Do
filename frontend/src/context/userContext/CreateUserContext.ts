import { createContext } from "react";



export type User = {
    id: string;
    name: string;
    email: string;
}

export type CreateUserContextType = {
    user: User | null;
    setUser: (user: User | null) => void;
    LoginUser: (email: string,password: string) => Promise<void>;
    LogoutUser: () => Promise<void>;
    RegisterUser: (name: string,email: string,password: string) => Promise<void>;
    isAuthenticated: boolean;
    darkMode: boolean;
    toggleTheme: () => void;
    setDarkMode: (darkMode: boolean) => void;
}

export const userContext = createContext<CreateUserContextType | null>(null);
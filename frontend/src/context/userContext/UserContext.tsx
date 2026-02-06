import { useEffect, useState } from "react";
import { userContext, type User } from "./CreateUserContext";
import api from "../../api/client";
import { useNavigate } from "react-router-dom";


interface UserContextProviderProps {
    children: React.ReactNode;
}

export const UserContextProvider: React.FC<UserContextProviderProps> = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(() => {
      const saved = localStorage.getItem("user");
      return saved ? (JSON.parse(saved) as User) : null;
    });
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
      return Boolean(localStorage.getItem("token"));
    });
    const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem("theme") === "dark";
  });
  


  useEffect(() => {
    const root = document.documentElement;

    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(prev => !prev);
  };

    const LoginUser = async (email: string, password: string) => {
      const response = await api.post("/api/auth/login", { email, password });
      const { token, user: loggedInUser } = response.data as { token: string; user: User };
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(loggedInUser));
      setUser(loggedInUser);
      setIsAuthenticated(true);
    }
    const LogoutUser = async () => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
      setIsAuthenticated(false);
      navigate("/login");
    }
    const RegisterUser = async (name: string, email: string, password: string) => {
      const response = await api.post("/api/auth/register", { name, email, password });
      const { token, user: registeredUser } = response.data as { token: string; user: User };
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(registeredUser));
      setUser(registeredUser);
      setIsAuthenticated(true);
    }
    return <userContext.Provider value={{ user, setUser, LoginUser, LogoutUser, RegisterUser, isAuthenticated, darkMode, toggleTheme, setDarkMode }}>
        {children}
    </userContext.Provider>
}
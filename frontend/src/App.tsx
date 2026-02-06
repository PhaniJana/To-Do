import { Navigate, Route, Routes } from "react-router-dom";
import { useUserData } from "./context/userContext/useUserData";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Tasks from "./pages/Tasks";
function App() {
  const { isAuthenticated } = useUserData();
  return (
    <Routes>
      <Route
        path="/"
        element={isAuthenticated ? <Tasks /> : <Navigate to="/login" replace />}
      />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserData } from "../context/userContext/useUserData";

const Login = () => {
  const navigate = useNavigate();
  const { LoginUser } = useUserData();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await LoginUser(email, password);
      navigate("/");
    } catch (err) {
      setError("Login failed. Check your credentials.");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 text-black dark:text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white dark:bg-slate-800 shadow-lg rounded-xl p-8">
        <h1 className="text-2xl font-semibold mb-6">Welcome back</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="p-2 border border-gray-300 dark:border-slate-600 rounded bg-white dark:bg-slate-700 dark:text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="p-2 border border-gray-300 dark:border-slate-600 rounded bg-white dark:bg-slate-700 dark:text-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <div className="text-sm text-red-600 dark:text-red-400">{error}</div>}

          <button
            type="submit"
            className="bg-emerald-500 hover:bg-emerald-600 text-white py-2 rounded"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        <div className="text-sm mt-4">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="text-emerald-600 hover:underline">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;

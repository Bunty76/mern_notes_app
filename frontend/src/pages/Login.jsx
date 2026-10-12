import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = form.email.trim();
    const password = form.password;

    if (!email || !password) {
      toast.error("Please enter email and password");
      return;
    }

    setIsLoading(true);
    try {
      // Send login request to backend
      const res = await axiosInstance.post("/auth/login", { email, password });

      // Save JWT token in localStorage
      if (res.data?.token) {
        localStorage.setItem("token", res.data.token);
      }

      toast.success("Login successful!");
      // Redirect to home page
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      const serverMessage =
        error.response?.data?.message || "Invalid email or password";
      toast.error(serverMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-base-200 ">
      <div className="card w-96 bg-base-100 shadow-xl p-6">
        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="input input-bordered mb-3 w-full"
            value={form.email}
            onChange={handleChange}
            disabled={isLoading}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="input input-bordered mb-3 w-full"
            value={form.password}
            onChange={handleChange}
            disabled={isLoading}
            required
          />

          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
        <div className="text-center mt-4">
          <p>
            Don't have an account?{" "}
            <Link to="/register" className="link link-primary">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;

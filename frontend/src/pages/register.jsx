import React, { useState } from "react";

import { useNavigate ,Link } from "react-router-dom";
import toast from "react-hot-toast";
import axiosInstance from "../lib/axios";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const username = formData.username.trim();
    const email = formData.email.trim();
    const password = formData.password;

    // Client-side validations
    if (!username || !email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    if (username.length < 3) {
      toast.error("Username must be at least 3 characters long");
      return;
    }

    if (username.length > 30) {
      toast.error("Username cannot exceed 30 characters");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    setIsLoading(true);
    try {
      const res = await axiosInstance.post("/auth/register", {
        username,
        email,
        password,
      });

      if (res.data?.token) {
        localStorage.setItem("token", res.data.token);
      }
      toast.success("Account created successfully!");
      navigate("/");
    } catch (error) {
      console.error("Registration error:", error);
      const serverMessage =
        error.response?.data?.message || "Registration failed. Please try again.";
      toast.error(serverMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center text-2xl">Sign Up</h2>

          <form onSubmit={handleSubmit}>
            <div className="form-control mb-3">
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <input
                type="text"
                name="username"
                placeholder="Enter username (min. 3 chars)"
                className="input input-bordered"
                value={formData.username}
                onChange={handleChange}
                disabled={isLoading}
                required
              />
            </div>

            <div className="form-control mb-3">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter email address"
                className="input input-bordered"
                value={formData.email}
                onChange={handleChange}
                disabled={isLoading}
                required
              />
            </div>

            {/* Password */}
            <div className="form-control mb-5">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter password (min. 6 chars)"
                className="input input-bordered"
                value={formData.password}
                onChange={handleChange}
                disabled={isLoading}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isLoading}
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </button>
          </form>
          <div className="text-center mt-4">
            <p>
              Already have an account?{" "}
              <Link to="/login" className="link link-primary">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Register;

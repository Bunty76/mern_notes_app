import React, { useState } from "react";

import { useNavigate ,Link } from "react-router-dom";
import toast from "react-hot-toast";
import axiosInstance from "../lib/axios";

const Register = () => {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post("/auth/register", formData);
      localStorage.setItem("token", res.data.token);
      toast.success("Registration successful!");
      navigate("/login");
    } catch (error) {
      console.error(error);
      toast.error("Registration failed");
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
                placeholder="Enter username"
                className="input input-bordered"
                value={formData.username}
                onChange={handleChange}
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
                placeholder="Enter email"
                className="input input-bordered"
                value={formData.email}
                onChange={handleChange}
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
                placeholder="Enter password"
                className="input input-bordered"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-full">Create Account</button>
          </form>
          <div className="text-center mt-4">
            <p>Already have an account? <Link to="/login" className="link link-primary">Log in</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}


export default Register;

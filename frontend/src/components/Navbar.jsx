import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { PlusIcon, LogOutIcon } from "lucide-react";
import axiosInstance from "../lib/axios";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/auth/logout");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("token");
      setIsLoggedIn(false);
      navigate("/login");
    }
  };

  return (
    <header className="bg-base-300 border-b border-base-content/10">
      <div className="mx-auto max-w-6xl p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-primary font-mono tracking-tight">
            ThinkBoard
          </h1>
          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <>
                <Link to={"/create"} className="btn btn-primary">
                  <PlusIcon className="size-5" />
                  <span>New Note</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="btn btn-outline btn-error"
                >
                  <LogOutIcon className="size-5" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link to={"/login"} className="btn btn-ghost">
                  Login
                </Link>
                <Link to={"/register"} className="btn btn-primary">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

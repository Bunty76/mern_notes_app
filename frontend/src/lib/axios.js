import axios from "axios";

// Normalize API base URL: ensure /api is included whether VITE_API_URL has it or not
const rawBaseURL = import.meta.env.VITE_API_URL?.trim();
const baseURL = rawBaseURL
  ? (rawBaseURL.replace(/\/+$/, "").endsWith("/api")
      ? rawBaseURL.replace(/\/+$/, "")
      : `${rawBaseURL.replace(/\/+$/, "")}/api`)
  : "/api";

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});

// Attach JWT token from localStorage to every outgoing request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default axiosInstance;

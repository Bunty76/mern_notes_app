import axios from "axios";

// Use environment variable for API URL, fallback to /api for dev proxy
const BaseURL = import.meta.env.VITE_API_URL || "/api";
const axiosInstance = axios.create({
  baseURL: BaseURL,
});

export default axiosInstance;

import axios from "axios";

//in there production no localhost so make it dynamic
const BaseURL =
  import.meta.env.MODE === "prodoction" ? "http://localhost:5000/api" : "/api";
const axiosInstance = axios.create({
  baseURL: BaseURL,
});

export default axiosInstance;

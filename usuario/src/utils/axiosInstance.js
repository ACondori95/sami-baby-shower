import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://sami-baby-shower-backend.onrender.com",
  headers: {"Content-Type": "application/json"},
});

export default axiosInstance;

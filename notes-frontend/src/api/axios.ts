import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`, // 👈 add /api here
  withCredentials: true,
});

export default api;

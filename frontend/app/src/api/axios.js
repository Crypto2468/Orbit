  import axios from "axios";

  const api = axios.create({
    baseURL: import.meta.env.PROD 
      ? "https://orbit-backend-x8z2.onrender.com/api" 
      : "http://localhost:8000/api",
  });

  api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  api.interceptors.response.use(
    (res) => res,
    (err) => {
      if (err.response?.status === 401) {
        const path = window.location.pathname;
        if (path !== "/login" && path !== "/register" && path !== "/") {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          window.location.href = "/login";
        }
      }
      return Promise.reject(err);
    }
  );

  export default api;


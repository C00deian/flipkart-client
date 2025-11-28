// src/lib/axios.ts
import axios, { AxiosError } from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// 🟦 Request Interceptor: Attach Token to Header
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// 🟥 Response Interceptor: Handle errors globally
axiosInstance.interceptors.response.use(
  (response: any) => response,
  async (error: AxiosError) => {
    // If token expired (401)
    if (error.response?.status === 401) {
      console.warn("Unauthorized! Token may be expired.");

      // OPTIONAL: Auto logout
      localStorage.removeItem("token");

      // OPTIONAL: redirect
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;

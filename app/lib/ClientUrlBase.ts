// src/lib/axios.ts
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

// ----------------------------------------------------------------------
// 1️⃣ PUBLIC API INSTANCE (For Login, Register, Public Products)

export const publicApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ----------------------------------------------------------------------
// 2️⃣ SECURED API INSTANCE (For Profile, Orders, Add Product)

export const securedApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 🟦 Request Interceptor: Attach Token ONLY for securedApi
securedApi.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Check if running in browser to access localStorage
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// 🟥 Response Interceptor: Handle 401 Errors ONLY for securedApi
securedApi.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    // If token expired or invalid (401 Unauthorized)
    if (error.response?.status === 401) {
      console.warn("Unauthorized! Token expired or invalid.");

      if (typeof window !== "undefined") {
        // 1. Clear invalid token
        localStorage.removeItem("token");
        
        // 2. Redirect to Login (User experience ke liye full reload better hai taaki state clear ho)
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);
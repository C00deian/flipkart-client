import api from "@/app/lib/axios";
import type { LoginRequest, RegisterRequest, RegisterResponse } from "../types/User";
import axios from "axios";

export const signUp = async (data: RegisterRequest): Promise<RegisterResponse> => {
  const res = await axios.post<RegisterResponse>(
    "http://localhost:8081/auth/register",
    data
  );
  
  return res.data;
};

export const login = async (data: LoginRequest): Promise<RegisterResponse> => {
  const res = await axios.post<RegisterResponse>(
    "http://localhost:8081/auth/login",
    data
  );

  return res.data;
};

export const getCurrentUser = async() => {
  const res = await api.get("http://localhost:8081/auth/me");
  return res;
};




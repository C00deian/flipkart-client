import api from "@/app/lib/axios";
import axios from "axios";

export const registerUser = async (data: any) => {
  const res = await axios.post("http://localhost:8082/users/register", data);
  return res;
};

export const loginUser = async (data: any) => {
  const res = await axios.post("http://localhost:8081/auth/login", data);
  return res;
};

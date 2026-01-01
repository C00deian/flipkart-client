
import axios from "axios";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export const securedServerApi = (token: string) =>
  axios.create({
    baseURL: BASE_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

import axios from "axios";

const apiUrl = import.meta.env.VITE_VERCEL_URL;

export const api = axios.create({
  baseURL: `${apiUrl}/api`,
  withCredentials: true,
});

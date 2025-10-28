import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const verceUrl = process.env.VERCEL_URL;

export const api = axios.create({
  baseURL: `${verceUrl}/api`,
  withCredentials: true,
});

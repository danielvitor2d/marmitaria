import axios from "axios";

export const api = axios.create({
  baseURL: "http://192.168.0.24:3000",
  // baseURL: "https://marmitaria-backend.fly.dev",
});

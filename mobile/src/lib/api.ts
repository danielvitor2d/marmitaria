import axios from "axios";

export const api = axios.create({
  baseURL: "http://172.25.239.235:3000",
  // baseURL: "https://marmitaria-backend.fly.dev",
});

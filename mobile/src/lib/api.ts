import axios from "axios";

export const api = axios.create({
  baseURL: "http://172.25.225.164:3000",
});

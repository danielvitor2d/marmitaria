import { AxiosResponse } from "axios";
import { api } from "../lib/api";

export interface Meal {
  id: string;
  name: string;
  desc: string;
  value: string;
}

interface RegisterInput {
  name: string;
  desc: string;
  value: string;
}

interface RegisterResponse {
  registered: boolean;
  meal: Meal;
}

async function register({ name, desc, value }: RegisterInput) {
  try {
    const response = await api.post<{}, AxiosResponse<RegisterResponse>>(
      "/meals",
      {
        name,
        desc,
        value,
      }
    );
    return response.data;
  } catch (err) {
    console.error(err);
    return {
      registered: false,
      meal: null,
    };
  }
}

export { register };

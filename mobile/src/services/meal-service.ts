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

interface UpdateInput {
  id: string;
  name: string;
  desc: string;
  value: string;
}

interface RegisterResponse {
  registered: boolean;
  meal: Meal;
}

interface UpdateResponse {
  updated: boolean;
  meal: Meal | null;
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

async function update({
  id,
  name,
  desc,
  value,
}: UpdateInput) {
  try {
    const response = await api.patch<{}, AxiosResponse<UpdateResponse>>(
      `/meals/${id}`,
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
      updated: false,
      meal: null,
    };
  }
}

export {
  register,
  update,
};

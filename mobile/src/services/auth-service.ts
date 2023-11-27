import { AxiosResponse } from "axios";

import { api } from "../lib/api";

interface User {
  id: string;
  email: string;
  name: string;
  lastName: string;
  address: string;
  type?: string;
  favorites: Array<string>;
}

interface LoginInput {
  email: string;
  pwd: string;
}

interface UpdateInput {
  id: string;
  name: string;
  lastName: string;
  address: string;
  email: string;
}

interface RegisterInput {
  name: string;
  lastName: string;
  address: string;
  email: string;
  pwd: string;
}

interface LoginResponse {
  logged: boolean;
  user: User | null;
}

interface UpdateResponse {
  updated: boolean;
  user: User | null;
}

interface RegisterResponse {
  registered: boolean;
}

async function login({ email, pwd }: LoginInput): Promise<LoginResponse> {
  try {
    const response = await api.post<{}, AxiosResponse<LoginResponse>>(
      "/users/session",
      { email, pwd }
    );
    return response.data;
  } catch (err) {
    console.error(err);
    return {
      logged: false,
      user: null,
    };
  }
}

async function update({
  id,
  address,
  email,
  lastName,
  name,
}: Partial<UpdateInput>): Promise<UpdateResponse> {
  try {
    const response = await api.patch<{}, AxiosResponse<UpdateResponse>>(
      `/users/${id}`,
      {
        name,
        lastName,
        address,
        email,
      }
    );
    return response.data;
  } catch (err) {
    console.error(err);
    return {
      updated: false,
      user: null,
    };
  }
}

async function register({
  address,
  email,
  lastName,
  name,
  pwd,
}: RegisterInput): Promise<RegisterResponse> {
  try {
    const response = await api.post<{}, AxiosResponse<RegisterResponse>>(
      "/users",
      {
        name,
        lastName,
        address,
        email,
        pwd,
      }
    );
    return response.data;
  } catch (err) {
    console.error(err);
    return {
      registered: false,
    };
  }
}

export { login, update, register };

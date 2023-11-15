import { AxiosResponse } from "axios";
import { api } from "../lib/api";

interface LoginInput {
  email: string;
  pwd: string;
}

interface RegisterInput {
  name: string;
  lastname: string;
  address: string;
  email: string;
  pwd: string;
}

interface LoginResponse {
  isLogged: boolean;
}

interface RegisterResponse {
  registered: boolean; 
}

async function serviceLogin({ email, pwd }: LoginInput): Promise<LoginResponse> {
  try {
    const response = 
      await api.post<{}, AxiosResponse<LoginResponse>>('/users/session', { email, pwd })
    return response.data
  } catch (err) {
    console.error(err);
    return {
      isLogged: false,
    }
  }
}

async function serviceRegister({
  address,
  email,
  lastname,
  name,
  pwd
}: RegisterInput): Promise<RegisterResponse> {
  try {
    const response =
      await api.post<{}, AxiosResponse<RegisterResponse>>('/users', {
        name,
        lastname,
        address,
        email,
        pwd,
      })
    return response.data
  } catch (err) {
    console.error(err);
    return {
      registered: false,
    }
  }
}

export {
  serviceLogin,
  serviceRegister,
};

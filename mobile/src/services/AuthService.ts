interface LoginInput {
  email: string;
  password: string;
}

interface RegisterInput {
  name: string;
  lastname: string;
  address: string;
  email: string;
  pwd: string;
}

interface LoginResponse {

}

interface RegisterResponse {
  
}

export async function Login(loginInput: LoginInput): Promise<LoginResponse> {
  return {} as Promise<LoginResponse>
}

export async function Register(registerInput: RegisterInput): Promise<RegisterResponse> {
  return {} as Promise<RegisterResponse>
}

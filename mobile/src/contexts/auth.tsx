import { createContext, useState } from "react";

import * as auth from "../services/AuthService";

interface AuthProps {
  children: React.ReactNode;
}

interface UserType {
  id: string;
  email: string;
  name: string;
  lastName: string;
  address: string;
}

export interface AuthContextData {
  signed: boolean;
  user: UserType | null;
  signIn: (email: string, pwd: string) => Promise<boolean>;
  update: (user: UserType) => Promise<boolean>
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData | null>(null);

export const AuthProvider = ({ children }: AuthProps) => {
  const [signed, setSigned] = useState<boolean>(false);
  const [user, setUser] = useState<UserType | null>(null);

  async function signIn(email: string, pwd: string) {
    const response = await auth.login({ email, pwd });
    // console.log(`LOGIN:`, response)
    if (response.logged) {
      setSigned(true);
      setUser(response.user);
      return true;
    }
    return false;
  }

  async function update(user: UserType) {
    const response = await auth.update({ ...user });
    // console.log(`UPDATE:`, response)
    if (response.updated) {
      setUser(response.user);
      return true;
    }
    return false;
  }

  async function logout() {
    setSigned(false);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ signed, user, update, signIn, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

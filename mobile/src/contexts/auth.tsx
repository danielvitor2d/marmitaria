import { createContext, useState } from "react";

import { Restaurant } from "../../app/restaurants";
import * as auth from "../services/auth-service";
import { refetch } from "../services/user-service";

interface AuthProps {
  children: React.ReactNode;
}

export interface UserType {
  id: string;
  email: string;
  name: string;
  lastName: string;
  address: string;
  type?: string;
  favorites: Array<string>;
}

export interface AuthContextData {
  signed: boolean;
  user: UserType | null;
  isAdmin: boolean;
  rest: Restaurant | null;
  signIn: (
    email: string,
    pwd: string
  ) => Promise<{ logged: boolean; isAdmin: boolean }>;
  setRest: React.Dispatch<React.SetStateAction<Restaurant | null>>;
  update: (user: UserType) => Promise<boolean>;
  refetchUser: () => Promise<void>
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData | null>(null);

export const AuthProvider = ({ children }: AuthProps) => {
  const [signed, setSigned] = useState<boolean>(false);
  const [user, setUser] = useState<UserType | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const [currentRest, setCurrentRest] = useState<Restaurant | null>(null);

  async function signIn(email: string, pwd: string) {
    const response = await auth.login({ email, pwd });
    // console.log(`LOGIN:`, response.user?.favorites);
    if (response.logged) {
      if (response.user?.type === "admin") setIsAdmin(true);
      else setIsAdmin(false);
      setSigned(true);
      setUser(response.user);
      return {
        logged: true,
        isAdmin: response.user?.type === "admin",
      };
    }
    return {
      logged: false,
      isAdmin: false,
    };
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

  async function refetchUser() {
    if (!user) return

    const response = await refetch(user.id);
    if (response) {
      console.log(response)
      setUser(response);
    }
  }

  async function logout() {
    setSigned(false);
    setUser(null);
    setIsAdmin(false);
  }

  return (
    <AuthContext.Provider
      value={{
        signed,
        user,
        isAdmin,
        update,
        signIn,
        logout,
        refetchUser,
        rest: currentRest,
        setRest: setCurrentRest,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

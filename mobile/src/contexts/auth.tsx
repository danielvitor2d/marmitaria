import { createContext, useState } from "react";

import { Meal, Restaurant } from "../../app/restaurants";
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
  meal: Meal | null;
  signIn: (
    email: string,
    pwd: string
  ) => Promise<{ logged: boolean; isAdmin: boolean }>;
  setRest: React.Dispatch<React.SetStateAction<Restaurant | null>>;
  setMeal: React.Dispatch<React.SetStateAction<Meal | null>>;
  update: (user: Partial<UserType>) => Promise<boolean>;
  refetchUser: () => Promise<void>;
  logout: () => Promise<void>;
  suggestion: object;
  setSuggestion: React.Dispatch<React.SetStateAction<object>>;
}

const AuthContext = createContext<AuthContextData | null>(null);

export const AuthProvider = ({ children }: AuthProps) => {
  const [signed, setSigned] = useState<boolean>(false);
  const [user, setUser] = useState<UserType | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const [currentRest, setCurrentRest] = useState<Restaurant | null>(null);
  const [currentMeal, setCurrentMeal] = useState<Meal | null>(null);

  const [suggestion, setSuggestion] = useState<object>({})

  async function signIn(email: string, pwd: string) {
    const response = await auth.login({ email, pwd });
    // console.log(`LOGIN:`, response.user?.favorites);
    if (response.logged) {
      if (response.user?.type === "admin") setIsAdmin(true);
      else setIsAdmin(false);
      setSigned(true);
      setUser(response.user);
      setCurrentMeal(null);
      setCurrentRest(null);
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

  async function update(user: Partial<UserType>) {
    const response = await auth.update({ ...user });
    // console.log(`UPDATE:`, response)
    if (response.updated) {
      setUser(response.user);
      return true;
    }
    return false;
  }

  async function refetchUser() {
    if (!user) return;

    const response = await refetch(user.id);
    if (response) {
      console.log(response);
      setUser(response);
    }
  }

  async function logout() {
    setSigned(false);
    setUser(null);
    setIsAdmin(false);
    setCurrentMeal(null);
    setCurrentRest(null);
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
        meal: currentMeal,
        setRest: setCurrentRest,
        setMeal: setCurrentMeal,
        suggestion,
        setSuggestion,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

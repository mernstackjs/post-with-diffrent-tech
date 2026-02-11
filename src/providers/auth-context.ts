import { createContext, useContext } from "react";

type UsersProps = {
  id: number;
  full_name: string;
  password: string;
  email: string;
};

type AuthContextT = {
  users: UsersProps[];
  getUsers: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
};

export const AuthContext = createContext<AuthContextT>({
  users: [],
  isLoading: true,
  error: "",
  getUsers: async () => {},
  signIn: async () => {},
});

export const useAuth = () => useContext(AuthContext);

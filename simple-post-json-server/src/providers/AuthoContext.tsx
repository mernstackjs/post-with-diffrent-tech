import axios from "axios";
import { useEffect, useState } from "react";
import type { PropsWithChildren } from "react";
import { AuthContext } from "./auth-context";
type UsersProps = {
  id: number;
  full_name: string;
  password: string;
  email: string;
};

type CurrentUser = {
  id: number;
  email: string;
  full_name: string;
  isAuthenticated: boolean;
};
export default function AuthProvider({ children }: PropsWithChildren) {
  const [users, setUsers] = useState<UsersProps[]>([]);
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(() => {
    const user = localStorage.getItem("user_info");
    return user ? JSON.parse(user) : null;
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const getUsers = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get("http://localhost:6060/users");
      setUsers(res.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch users");
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (email: string, password: string): Promise<boolean> => {
    const user = users.find(
      (u) => u.email === email && u.password === password,
    );
    if (!user) {
      alert("Invalid email or password");
      return false;
    }

    const loggedInUser: CurrentUser = {
      id: user.id,
      email: user.email,
      full_name: user.full_name,
      isAuthenticated: true,
    };

    setCurrentUser(loggedInUser);
    localStorage.setItem("user_info", JSON.stringify(loggedInUser));

    return true;
  };

  const logOut = () => {
    setCurrentUser(null);
    localStorage.removeItem("user_info");
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        users,
        isLoading,
        error,
        currentUser,
        getUsers,
        signIn,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

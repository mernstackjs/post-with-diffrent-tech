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

export default function AuthProvider({ children }: PropsWithChildren) {
  const [users, setUsers] = useState<UsersProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>("");
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

  const signIn = async (email: string, password: string) => {
    try {
      const res = await axios.post("http://localhost:6060/users", {
        email,
        password,
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <AuthContext.Provider value={{ users, isLoading, error, getUsers, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}

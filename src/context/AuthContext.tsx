"use client";
import { useRouter } from "next/navigation";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import Cookies from "js-cookie";

interface AuthContextType {
  isAuthenticated: boolean;
  loading: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  loading: true,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const auth = () => {
      const token = Cookies.get("token");
      setIsAuthenticated(!!token);
      setLoading(false);
    };

    auth();
  }, []);

  const login = (token: string) => {
    Cookies.set("token", token, {
      expires: 1,
      sameSite: "strict",
      path: "/",
    });
    setIsAuthenticated(true);
  };

  const logout = () => {
    // Remove with same options as when setting to ensure proper removal
    Cookies.remove("token", {
      path: "/",
      sameSite: "strict",
    });

    // Also try removing without options as a fallback
    Cookies.remove("token");

    // For stubborn cookies, try document.cookie approach
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    setIsAuthenticated(false);
    router.push("/signup");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

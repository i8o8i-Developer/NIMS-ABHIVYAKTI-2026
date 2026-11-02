import React, { createContext, useContext, useState, useEffect } from "react";
import { Api, SetAccessToken, GetAccessToken } from "@/Lib/Api";

export type UserRole = "super_admin" | "coordinator" | "judge" | "operator" | "viewer";

export interface AuthUser {
  id: number;
  email: string;
  full_name: string;
  role: UserRole;
  is_active: boolean;
}

interface AuthContextType {
  user: AuthUser | null;
  role: UserRole | null;
  isLoading: boolean;
  login: (token: string, refresh: string, user: AuthUser) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = GetAccessToken();
      const savedUser = typeof window !== "undefined" ? localStorage.getItem("abhivyakti_staff_user") : null;

      if (token && savedUser) {
        try {
          setUser(JSON.parse(savedUser));
          const res = await Api.get<AuthUser>("/auth/me/");
          setUser(res.data);
          localStorage.setItem("abhivyakti_staff_user", JSON.stringify(res.data));
        } catch {
          SetAccessToken(null);
          setUser(null);
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const login = (token: string, refresh: string, userData: AuthUser) => {
    SetAccessToken(token);
    if (typeof window !== "undefined") {
      localStorage.setItem("abhivyakti_staff_refresh", refresh);
      localStorage.setItem("abhivyakti_staff_user", JSON.stringify(userData));
    }
    setUser(userData);
  };

  const logout = async () => {
    try {
      await Api.post("/auth/logout/");
    } catch {
      // Ignored
    } finally {
      SetAccessToken(null);
      if (typeof window !== "undefined") {
        localStorage.removeItem("abhivyakti_staff_refresh");
        localStorage.removeItem("abhivyakti_staff_user");
      }
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role || null,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth Must Be Used Within An AuthProvider");
  }
  return context;
};

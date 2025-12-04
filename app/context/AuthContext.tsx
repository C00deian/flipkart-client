"use client";

import { createContext, useState, useEffect, useCallback } from "react";
import { getCurrentUser } from "@/app/services/auth.service";
import { useRouter } from "next/navigation";

export const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const fetchUser = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setCurrentUser(null);
        setLoading(false);
        return;
      }

      const res = await getCurrentUser();

      setCurrentUser(res.data);

      console.log("current user", res.data);

    } catch (error) {
      setCurrentUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // Run on first mount
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  // 🟢 Login ke baad turant call karoge
  const refreshUser = async () => {
    await fetchUser();
  };

  const logout = () => {
    localStorage.removeItem("token");
    setCurrentUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ currentUser, refreshUser, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

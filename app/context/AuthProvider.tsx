"use client";

import { useState, useEffect, useCallback } from "react";
import { getCurrentUser } from "@/app/services/auth.service";
import { useRouter } from "next/navigation";
import { AuthContext } from "./AuthContext";
import { CurrentUser } from "@/app/types/User";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const router = useRouter();

  const fetchUser = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setCurrentUser(null);
        return;
      }

      const user = await getCurrentUser();
      setCurrentUser(user);

      console.log("current user", user);
    } catch (error) {
      setCurrentUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const refreshUser = async () => {
    setIsLoading(true);
    await fetchUser();
  };

  const logout = () => {
    localStorage.removeItem("token");
    setCurrentUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isLoading,
        refreshUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

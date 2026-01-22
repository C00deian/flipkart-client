"use client";

import { useContext, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthContext } from "@/app/context/AuthContext";

export default function AuthSuccess() {
  const params = useSearchParams();
  const router = useRouter();
  const auth = useContext(AuthContext);

  useEffect(() => {
    const login = async () => {
      const token = params.get("token");

      if (!token || !auth) return;

      // ✅ Store token
      localStorage.setItem("token", token);

      // ✅ Refresh user properly
      await auth.refreshUser();

      // ✅ Redirect AFTER user is loaded
      router.push("/cart");
    };

    login();
  }, [auth, params, router]);

  return <p>Logging you in...</p>;
}

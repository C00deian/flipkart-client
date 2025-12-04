"use client";

import { useContext, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthContext } from "@/app/context/AuthContext";

export default function AuthSuccess() {
    const params = useSearchParams();
    const router = useRouter();

    const { refreshUser } = useContext(AuthContext);

    useEffect(() => {
        const token = params.get("token");

        if (!token) return;

        // Store token
        localStorage.setItem("token", token);

        // 🔥 MOST IMPORTANT STEP
        refreshUser().then(() => {
            // Refresh ho gaya → user mil gaya
            router.push("/cart");
        });

    }, []);

    return <p>Logging you in...</p>;
}

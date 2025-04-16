"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";

export default function SyncUser() {
  const { user, isSignedIn } = useUser();

  useEffect(() => {
    if (!user || !isSignedIn) return;

    const syncUser = async () => {
      try {
        const res = await fetch("/api/sync-user", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: user.id,
            name: user.fullName,
            email: user.emailAddresses[0]?.emailAddress,
          }),
        });

        const data = await res.json();

        if (data.message === "Usuario creado y sincronizado") {
          window.location.reload(); 
        }
      } catch (error) {
        console.error("Error sincronizando usuario:", error);
      }
    };

    syncUser();
  }, [user, isSignedIn]);

  return null;
}

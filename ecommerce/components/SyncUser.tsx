"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";

export default function SyncUser() {
  const { user } = useUser();

  useEffect(() => {
    if (!user) return;

    const syncUser = async () => {
      try {
        await fetch("/api/sync-user", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: user.id,
            name: user.fullName,
            email: user.emailAddresses[0]?.emailAddress,
          }),
        });
      } catch (error) {
        console.error("Error sincronizando usuario:", error);
      }
    };

    syncUser();
  }, [user]);

  return null; // Este componente no renderiza nada
}

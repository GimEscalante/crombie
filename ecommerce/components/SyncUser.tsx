"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";

export default function SyncUser() {
  const { user } = useUser();

  useEffect(() => {
    if (!user) return;

    fetch("/api/sync-user", {
      method: "POST",
      body: JSON.stringify({
        clerkId: user.id,
        name: user.fullName,
        email: user.primaryEmailAddress?.emailAddress,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }, [user]);

  return null;
}


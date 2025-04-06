"use client";

import ProfileCard from "../../../../components/ProfileCard";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { user, isSignedIn, isLoaded } = useUser();
  const router = useRouter();
  const [hasSynced, setHasSynced] = useState(false);

  useEffect(() => {
    // Redirige si el usuario no está autenticado y ya cargó el estado
    if (!isSignedIn && isLoaded) {
      router.push("/sign-in");
    }

    // Sincroniza con tu base de datos
    if (user && !hasSynced) {
      fetch("/api/sync-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: user.id,
          name: user.fullName,
          email: user.primaryEmailAddress?.emailAddress,
        }),
      }).then(() => setHasSynced(true));
    }
  }, [user, isSignedIn, isLoaded, hasSynced, router]);

  if (!isSignedIn) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-200 text-gray-800 p-8">
        <p>Cargando...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-200 text-gray-800 p-8">
      <section className="text-center">
        <h1 className="text-2xl mb-4">Bienvenido, {user.firstName}</h1>

        <ProfileCard 
          name={user.fullName ?? ""}
          avatar={user.imageUrl}
          email={user.primaryEmailAddress?.emailAddress ?? ""}
        />
      </section>
    </main>
  );
}

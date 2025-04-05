"use client";
import ProfileCard from "../../../../components/ProfileCard";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";

export default function ProfilePage() {
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      fetch("/api/sync-user", {
        method: "POST",
        body: JSON.stringify({
          id: user.id,
          name: user.fullName,
          email: user.primaryEmailAddress?.emailAddress,
        }),
      });
    }
  }, [user]);




    return(
        <main className="min-h-screen flex items-center justify-center bg-gray-200 text-gray-800 p-8">
            <section className="text-center">
                <h1>Bienvenido, {user?.firstName}</h1>

                <ProfileCard 
                name="Gimena Escalante"
                avatar="https://randomuser.me/api/portraits/women/32.jpg"
                email="gimeescalante1@gmail.com"
                />
            </section>
        </main>

    )
}
"use client";

import ProfileCard from "../../../../components/ProfileCard";

export default function ProfilePage(){
    return(
        <main className="min-h-screen flex items-center justify-center bg-gray-200 text-gray-800 p-8">
            <section className="text-center">
                <h1 className="text-4xl font-bold mb-8 text-blue-600">Profile Page</h1>
                <ProfileCard 
                name="Gimena Escalante"
                avatar="https://randomuser.me/api/portraits/women/32.jpg"
                email="gimeescalante1@gmail.com"
                />
            </section>
        </main>

    );
}


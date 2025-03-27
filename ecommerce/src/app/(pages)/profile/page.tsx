"use client";

import ProfileCard from "../../../../components/ProfileCard";

export default function ProfilePage(){
    return(
        <main className="min-h-screen bg-gray-400 text-gray-800 p-8">
            <section className="max-w-4xl mx-auto text-center">
                <h1 className="text-4xl font-bold mb-8 text-blue-600">Profile Page</h1>
                <ProfileCard 
                    name="Gimena Escalante"
                    avatar="https://randomuser.me/api/portraits/women/32.jpg"
                    email="gimeescalante1@gmail.com"
                >

                </ProfileCard>
            </section>
        </main>

    );
}


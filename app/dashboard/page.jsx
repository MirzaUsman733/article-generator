'use client'
import { useState, useEffect } from 'react';
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
export default function page() {
    const [userData, setUserData] = useState([]);
    const { data: session, status } = useSession();
    const router = useRouter();
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (typeof window === 'undefined' && status !== "authenticated" && !session) {
                    return router.push('/auth');
                }
                const response = await fetch('/api/users', {
                    method: 'POST', 
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                setUserData(data.userData);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchData();
    }, [session, status, router]);
    if (session && session.user && session.user.role === 'user') {
        router.push('/');
    }
    return (
        <div className="grid place-items-center h-screen">
            <div className="shadow-2xl shadow-slate-700 text-white p-8 bg-opacity-20 bg-zince-300/10 flex flex-col gap-2 my-6">
                <h1 className="text-2xl font-bold mb-4">All Users</h1>
                {userData.map((user) => (
                    <div key={user._id}>
                        <div>
                            Name: <span className="font-bold">{user.name}</span>
                        </div>
                        <div>
                            Email: <span className="font-bold">{user.email}</span>
                        </div>
                        <div>
                            Role: <span className="font-bold">{user.role}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

'use client'
import { useState, useEffect } from 'react';

export default function page() {
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/users', {
                    method: 'POST', // Assuming you are using a POST request for fetching all users
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
    }, []);

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
                    </div>
                ))}
            </div>
        </div>
    );
}

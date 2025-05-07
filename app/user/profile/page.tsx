"use client";

import { useEffect, useState } from 'react';

const ProfilePage = () => {
    const [name, setName] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>(null);

    useEffect(() => {
        const storedName = localStorage.getItem('name');
        const storedEmail = localStorage.getItem('email');
        setName(storedName);
        setEmail(storedEmail);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold mb-4">Profile Page</h1>
                <div className="flex items-center mb-4">
                    <svg className="w-10 h-10 text-gray-500 mr-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10 2a6 6 0 100 12A6 6 0 0010 2zM8 14a8 8 0 00-8 8h2a6 6 0 0112 0h2a8 8 0 00-8-8z" clipRule="evenodd" />
                    </svg>
                    <div>
                        <div className="mb-2">
                            <strong>Name:</strong> {name}
                        </div>
                        <div>
                            <strong>Email:</strong> {email}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
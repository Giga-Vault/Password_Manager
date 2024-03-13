import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate();

    const onSubmitData = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Check if username and password are empty
        if (!username.trim() || !password.trim()) {
            toast.error('Fill both the fields.');
            return;
        }
        try {
            const response = await fetch('/api/user-auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new Error('Authentication failed');
            }

            const data = await response.json();
            const receivedId = data.results[0]?.id; 
            if (receivedId !== undefined) {
                navigate('/pwd/get-all/'+receivedId);
            } else {
                console.error("ID is undefined");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            toast.error("Wrong Credentials");
        }
    }

    return (
        <div className="relative bg-gray-200 min-h-screen flex flex-col justify-center items-center">
            <h1 className="absolute top-14 text-center text-4xl font-extrabold text-gray-900">🛡️GIGA<span className="text-blue-600 leading-relaxed"> VAULT🛡️</span></h1>
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold mb-4">Login</h2>
                <form onSubmit={onSubmitData}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-700 font-semibold mb-2">Username</label>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} id="username" name="username" placeholder="Enter your username" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">Password</label>
                        <input type="password"  value={password} onChange={(e) => setPassword(e.target.value)}  id="password" name="password" placeholder="Enter your password" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">Login</button>
                </form>
                <div className="mt-4 text-center">
                    <p className="text-gray-700">Don't have an account? <a href="/signup" className="text-blue-500 font-semibold hover:text-blue-800">Sign Up</a></p>
                </div>
            </div>
            <p className="absolute bottom-4 center text-gray-600 text-sm flex justify-center items-center">© GVM2024 • All rights reserved</p>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                style={{ top: '40px', right:'30px' }} 
            />
        </div>    
    );
}

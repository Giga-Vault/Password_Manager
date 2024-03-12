import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function Login() {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [id, setId] = useState<number | undefined>(undefined); // Initialize id as undefined
    const navigate = useNavigate();

    const onSubmitData = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/user-auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();

            const receivedId = data.results[0]?.id; // Ensure data.results[0].id is defined
            if (receivedId !== undefined) {
                setId(receivedId); // Set the state variable only if id is defined
                navigate('/pwd/get-all/'+receivedId);
               // console.log(id);
                // Navigate to another page or perform further actions here
            } else {
                console.error("ID is undefined");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
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

    </div>    
  );
}


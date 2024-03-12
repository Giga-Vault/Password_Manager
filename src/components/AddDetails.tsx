import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type Password = {
    id: number;
    title: string;
    username: string;
    password: string;
    url: string;
    notes: string;
    user_id: number;
};

export default function PasswordEntry() {
    const { uid } = useParams();
    const [password, setPassword] = useState<Password>({
        id: 0,
        title: '',
        username: '',
        password: '',
        url: '',
        notes: '',
        user_id: 0,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setPassword(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const onSubmitPwd = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/pwd/new', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(password),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log('Data added:', data);
            toast.success('Details saved successfully!');
        } catch (error) {
            console.error('Error:', error);
            toast.error('Failed to save details.');
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white shadow-lg rounded px-8 pt-6 pb-4 mb-4">
            <h1 className="text-2xl font-bold mb-6">Add your login</h1>
            <form onSubmit={onSubmitPwd}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                        Title
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="title"
                        type="text"
                        name="title"
                        placeholder="Enter the title"
                        value={password.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        Username
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="username"
                        type="text"
                        name="username"
                        placeholder="Enter the username"
                        value={password.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                        name="password"
                        placeholder="Enter the password"
                        value={password.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="url">
                        URL
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="url"
                        type="text"
                        name="url"
                        placeholder="Enter the URL"
                        value={password.url}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="notes">
                        Notes
                    </label>
                    <textarea
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="notes"
                        name="notes"
                        placeholder="Enter the notes"
                        value={password.notes}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="user_id">
                        User ID
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="user_id"
                        type="number"
                        name="user_id"
                        placeholder="Enter the user ID"
                        value={password.user_id}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >Save
                    </button>
                    <Link to={`/pwd/get-all/${uid}`}>
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                        >Back to Vault
                        </button>
                    </Link>
                </div>
            </form>
            <ToastContainer
            position="top-right"
            autoClose={4000}
            hideProgressBar={false}
            closeOnClick
            pauseOnHover
            draggable
            theme="colored"
            style={{ top: '40px', right:'40px' }} 
             />
        </div>
    );
}
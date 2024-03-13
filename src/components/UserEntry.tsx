import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type Users = {
  id: number;
  username: string;
  email: string;
  password: string;
  created_at: string;
};

export default function UserEntry() {
  const [user, setUser] = useState<Users>({
    id: 0,
    username: '',
    email: '',
    password: '',
    created_at: '',
  });

  const onSubmitPwd = (e: React.FormEvent<HTMLFormElement>) => { // Changed event type
    e.preventDefault(); // Prevent form submission
    console.log(JSON.stringify(user));
    try {
      fetch('/api/users/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.indexOf('application/json') !== -1) {
            return response.json();
          } else {
            throw new Error("Oops, we haven't got JSON!");
          }
        })
        .then(data => {
          console.log('Data added:', data);
          toast.success('New account created!');
        })
        .catch(error => console.log('Error:', error))
        .finally(() => console.log('Data added (finally)'));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-200 items-center justify-center">
      <div
        id="icons container"
        className="flex flex-col max-w-4/5 gap-10 rounded-md bg-white p-12 shadow-lg"
      >
        <h1 className="text-black font-bold text-center text-3xl">Create An Account</h1>
        <form onSubmit={onSubmitPwd}> {/* Changed onClick to onSubmit */}
          <div className="flex flex-row gap-6 justify-between">
            <p className="font-semibold mt-2">Username</p>
            <input
              type="text"
              id="username"
              placeholder="Enter your Username"
              required
              className="w-full rounded-md border p-2 focus:outline-blue-500"
              value={user?.username}
              onChange={e => setUser({ ...user, username: e.target.value })}
            />
          </div>
          <div className="flex flex-row gap-6">
            <p className="font-semibold mt-2">Email</p>
            <input
              type="text"
              id="email"
              placeholder="Enter your Email"
              required
              className="w-full rounded-md border p-2 focus:outline-blue-500"
              value={user?.email}
              onChange={e => setUser({ ...user, email: e.target.value })}
            />
          </div>
          <div className="flex flex-row gap-6">
            <p className="font-semibold mt-2">Password</p>
            <input
              type="password"
              id="password"
              placeholder="Enter your Password"
              required
              className="w-full rounded-md border p-2 focus:outline-blue-500"
              value={user?.password}
              onChange={e => setUser({ ...user, password: e.target.value })}
            />
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="max-w-24 font-semibold rounded-md bg-blue-500 py-2 px-4 text-white hover:bg-blue-700"
            >
              Submit
            </button>
            <Link to="/">
              <button className="max-w-24 font-semibold rounded-md bg-blue-500 py-2 px-5 text-white hover:bg-blue-700">Login</button>
            </Link>
          </div>
        </form>
      </div>
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

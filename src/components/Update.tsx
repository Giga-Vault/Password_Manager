import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type Password = {
  title: string;
  username: string;
  password: string;
  url: string;
  notes: string;
};

export default function Update() {
  const { id } = useParams();
  const [password, setPassword] = useState<Password>();

  useEffect(() => {
    fetch(`/api/pwd/get-all/${id}`)
      .then(response => response.json())
      .then(data => setPassword(data.results[0]))
      .catch(error => console.error('Error fetching data:', error));
  }, [id]);

  const onUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch(`/api/pwd/update/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(password),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Data added:', data);
        toast.success('Updated successfully!');
      })
      .catch(error => console.error('Error:', error));
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-200">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-4">Update Password Details</h1>
        <form onSubmit={onUpdate}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 font-semibold mb-2">Title</label>
            <input
              type="text"
              name="title"
              placeholder="Enter the title"
              value={password?.title}
              onChange={e => setPassword({ ...password!, title: e.target.value })}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 font-semibold mb-2">Username</label>
            <input
              type="text"
              name="username"
              placeholder="Enter the username"
              value={password?.username}
              onChange={e => setPassword({ ...password!, username: e.target.value })}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">Password</label>
            <input
              type="text"
              name="password"
              placeholder="Enter the password"
              value={password?.password}
              onChange={e => setPassword({ ...password!, password: e.target.value })}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="url" className="block text-gray-700 font-semibold mb-2">URL</label>
            <input
              type="text"
              name="url"
              placeholder="Enter the URL"
              value={password?.url}
              onChange={e => setPassword({ ...password!, url: e.target.value })}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="notes" className="block text-gray-700 font-semibold mb-2">Notes</label>
            <textarea
              name="notes"
              placeholder="Enter the notes"
              value={password?.notes}
              onChange={e => setPassword({ ...password!, notes: e.target.value })}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mt-6 flex justify-between">
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Save</button>
            <Link to="/Vault">
              <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Vault</button>
            </Link>
          </div>
        </form>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
        style={{ top: '70px', right:'20px' }} 
      />
    </div>
  );
}

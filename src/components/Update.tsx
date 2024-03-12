import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

type Password = {
  title: string;
  username: string;
  password: string;
  url: string;
  notes: string;
};

export default function Update() {
  const Navigate = useNavigate();
  const { id } = useParams();
  const [password, setPassword] = useState<Password>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/pwd/get-all/${id}`)
      .then(response => response.json())
      .then(data => setPassword(data.results[0]))
      .catch(error => console.error('Error fetching data:', error));
      setLoading(false);
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
        Navigate('/Vault');
      })
      .catch(error => console.error('Error:', error));
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-200">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        
        <h1 className="text-3xl font-bold mb-4">Update Password Details</h1>
        
        <form onSubmit={onUpdate}>
          <input
            type="text"
            name="title"
            placeholder="Enter the title"
            value={password?.title}
            onChange={e => setPassword({ ...password!, title: e.target.value })}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 mb-4"
            required
          />
          <input
            type="text"
            name="username"
            placeholder="Enter the username"
            value={password?.username}
            onChange={e => setPassword({ ...password!, username: e.target.value })}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 mb-4"
            required
          />
          <input
            type="text"
            name="password"
            placeholder="Enter the password"
            value={password?.password}
            onChange={e => setPassword({ ...password!, password: e.target.value })}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 mb-4"
            required
          />
          <input
            type="text"
            name="url"
            placeholder="Enter the URL"
            value={password?.url}
            onChange={e => setPassword({ ...password!, url: e.target.value })}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 mb-4"
            required
          />
          <textarea
            name="notes"
            placeholder="Enter the notes"
            value={password?.notes}
            onChange={e => setPassword({ ...password!, notes: e.target.value })}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 mb-4"
            required
          />
          <div className="mt-6 flex justify-between">
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Save</button>
            <Link to="/Vault">
              <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Vault</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

  import React, { useState } from 'react';
  import PasswordList from './PasswordList';
  import { Link } from 'react-router-dom';

  function Vault() {
    const [search, setSearch] = useState<string>('');

    return (
      <div className="flex flex-col h-screen items-center justify-center bg-gray-200">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 max-h-[100vh]">
          <h1 className="text-center text-3xl font-bold mb-4">SECURE VAULT</h1>
          <div className="flex flex-row gap-2 mb-4">
            <input
              type="search"
              id="search-box"
              placeholder="Search here..."
              className="w-full rounded-md border px-4 py-2 focus:outline-blue-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              type="button"
              id="search-button"
              className="bg-blue-500 py-2 px-4 text-white rounded-md hover:bg-blue-700"
              onClick={() => {
                console.log('Search:', search);
              }}
            >
              Search
            </button>
          </div>
          <div id="password-list" className="max-w-sm w-full max-h-[400px] overflow-y-auto  bg-white p-3 rounded-lg shadow-sm" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <PasswordList search={search} />
          </div>
          <div className="flex justify-between max-w-sm w-full mt-4">
            <Link to="/">
              <button id="logout" className="font- max-w-24 rounded-md bg-blue-500 p-2 text-white hover:animate-pulse hover:bg-blue-700">Log Out</button>
            </Link>
            <Link to="/add">
              <button id="add" className="font-max-w-24 rounded-md bg-blue-500 p-2  w-28 text-white hover:animate-pulse hover:bg-blue-700">Add</button>
            </Link>
            <Link to="/Pwd">
              <button id="logout" className="font-max-w-24 rounded-md bg-blue-500 p-2 text-white hover:animate-pulse hover:bg-blue-700">Generate</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  export default Vault;

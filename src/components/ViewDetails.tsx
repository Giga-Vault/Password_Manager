import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import copyIcon from '../assets/copy-icon.svg';
import { ToastContainer, toast } from 'react-toastify';
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

export default function ViewDetails() {
  const Navigate = useNavigate();
  const { title } = useParams();
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState<Password | null>(null);
  const [pwd_id, setPwdId] = useState<number>(0);

  const DeletePwd=(()=>{
    fetch(`/api/pwd/delete/${pwd_id}`,{
      method:'DELETE'
    }).then(response => { response.json()})
    Navigate('/vault');
  })

  useEffect(() => {
    fetch(`/api/pwd/get-all/${title}`)
      .then((response) => response.json())
      .then((data) => {
        setPassword(data.results[0] || null);
        console.log(data.results[0]);
        setPwdId(data.results[0].id)
        setLoading(false)
      })
     
      .catch((error:any) => console.error('Error fetching data:', error));
  }, [title]);

  const copyToClipboard = async (text: string, message: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(message, {
        position: "bottom-right", 
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        style: { bottom: '100px' } 
      });
    } catch (error) {
      console.error('Error copying text to clipboard:', error);
    }
  };

  return (
    <div className="bg-gray-200 min-h-screen flex flex-col justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4">Your Password Details</h1>
        <div className="items-center justify-center w-full flex">

      {loading && <div className='loader'></div>}

        </div>
        {password && (
          <div>
            <div className="mb-4">
              <label htmlFor="title" className="block text-gray-700 font-semibold mb-2">Title</label>
              <input type="text" id="title" name="title" value={password.title} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" readOnly />
            </div>
            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-700 font-semibold mb-2">Username</label>
              <input type="text" id="username" name="username" value={password.username} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" readOnly />
            </div>
            <div className="mb-4 relative">
              <label htmlFor="url" className="block text-gray-700 font-semibold mb-2">URL</label>
              <div className="flex items-center">
                <input type="text" id="url" name="url" value={password.url} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" readOnly />
                <img src={copyIcon} alt="copyicon" className='copyIcon absolute top-10  right-3 cursor-pointer w-6 h-6' onClick={() => copyToClipboard(password.url, 'URL copied to clipboard!')} />
              </div>
            </div>
            <div className="mb-4 relative"> 
              <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">Password</label>
              <div className="flex items-center">
                <input type="password" id="password" name="password" value={password.password} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" readOnly />
                <img src={copyIcon} alt="copyicon" className='copyIcon absolute top-10 right-3 cursor-pointer w-6 h-6' onClick={() => copyToClipboard(password.password, 'Password copied to clipboard!')} /> 
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="notes" className="block text-gray-700 font-semibold mb-2">Notes</label>
              <textarea id="notes" name="notes" value={password.notes} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" readOnly />
            </div>
          </div>
        )}
        <div className="mt-6 text-center flex flex-row justify-between">
          <Link to="/Vault">
            <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Vault</button>
          </Link>
          <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600" onClick={DeletePwd}> Delete</button>
          <Link to={`/pwd/update/${password?.id}`}><button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Edit</button></Link >
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
        style={{ top: '130px', right:'20px' }} 
      />
    </div>
  );
}

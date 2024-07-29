import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate();

  const handleAdminLogin = async () => {
    try {
      const response = await Axios.post('http://localhost:9000/api/auth/admin-login', {
        email,
        password,
      });

      if (response.data.success) {
        // Admin login successful, navigate to the admin page
        nav('/admin');
      } else {
        // Handle login failure (display error message, etc.)
        console.error(response.data.error);
      }
    } catch (error) {
      console.error('Error during admin login:', error);
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <div className="max-w-md mx-auto bg-white p-5 rounded-md shadow-md">
  
        <h1 className="text-2xl font-bold mb-4">Admin Login</h1>
        <label className="block mb-2">Email:</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded-md mb-4"
        />
        <label className="block mb-2">Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded-md mb-4"
        />
        <button
          onClick={handleAdminLogin}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Login
        </button>
        <h2 className="text-xl font-semibold ml-2 text-blue-800">
            <Link to='/'>back</Link>
          </h2>
      
      </div>
     
    </div>
  );
}

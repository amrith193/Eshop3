// ManageAccountPage.js
import React, { useState, useEffect } from 'react';
import Header from './Header';
import axios from 'axios';

const ManageAccountPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    image: null,
  });
  const userId = JSON.parse(localStorage.getItem('Seller'))._id;
  console.log("id",userId);
  useEffect(() => {
   
    const fetchUserData = async () => {
      try {
     
        const response = await axios.get(`http://localhost:9000/api/register/singleview/${userId}`);

        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      
      }
    };

    fetchUserData();
  }, []); 

  const handleChange = (e) => {
    if (e.target.type === 'file') {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
    
      const response = await axios.put(`http://localhost:9000/api/register/update/${userId}`, formData);

      console.log('Server response:', response.data);
     
    } catch (error) {
      console.error('Error updating account:', error);
    
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header component with navigation */}
      <Header />

      {/* Main content */}
      <main className="flex-grow p-8 bg-gray-100 dark:bg-gray-800">
        <div className="max-w-2xl mx-auto bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
          <h1 className="text-3xl font-semibold mb-6">Manage Your Account</h1>

          {/* Account details form (example) */}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-white">
                Username
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                className="mt-1 p-2 w-full border rounded-md"
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-white">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                className="mt-1 p-2 w-full border rounded-md"
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-white">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                className="mt-1 p-2 w-full border rounded-md"
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="avatar" className="block text-sm font-medium text-gray-700 dark:text-white">
                Choose Avatar (Image)
              </label>
              <input
                type="file"
                id=" image"
                name=" image"
                accept="image/*"
                className="mt-1 p-2 w-full border rounded-md"
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Save Changes
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default ManageAccountPage;

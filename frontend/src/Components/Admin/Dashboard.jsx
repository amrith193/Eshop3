// AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Link,useNavigate } from "react-router-dom";


const AdminDashboard = () => {
  const [pendingSellers, setPendingSellers] = useState([]);
  const [count, setCount] = useState(0); 


  useEffect(() => {
    const fetchPendingSellers = async () => {
      try {
        const response = await Axios.get('http://localhost:9000/api/register/admin/approve-seller');
        setPendingSellers(response.data);
      } catch (error) {
        console.error('Error fetching seller requests', error);
      }
    };
   
    fetchPendingSellers();
  }, [count,pendingSellers]);

  const handleApproveReject = async (userId, approvalStatus) => {
    try {
      await Axios.patch(`http://localhost:9000/api/register/admin/approve-seller/${userId}/${approvalStatus}`);
      // Log success message or fetch pending sellers again if needed
      console.log(`Seller ${userId} approval status updated: ${approvalStatus}`);
    } catch (error) {
      console.error('Error updating seller approval status', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
          <h2 className="text-xl font-semibold mb-4 text-blue-800">
            <Link to='/'>Log out</Link>
          </h2>
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
     
      <h2 className="text-2xl font-semibold mb-2">Pending Seller Requests</h2>
      <ul>
 
        {pendingSellers.map((seller) => (
          <li key={seller._id} className="mb-4 border-b border-gray-300 pb-2">
            <span className="text-lg font-semibold">Name:{seller.name}</span><br />
            <span className="text-lg font-semibold">Phone:{seller.phone}</span><br />
            <span className="text-lg font-semibold">Email:{seller.email}</span><br />
            <button
              onClick={() => handleApproveReject(seller._id, 'approved')}
              className="bg-green-500 text-white px-4 py-2 rounded mr-2"
            >
              Approve
            </button>
            <button
              onClick={() => handleApproveReject(seller._id, 'rejected')}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Reject
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;

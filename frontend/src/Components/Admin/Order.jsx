import React, { useState, useEffect } from "react";
import axios from "axios";

const OrderView = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ordersResponse = await axios.get(
          "http://localhost:9000/api/orders/ord"
        );

        setOrders(ordersResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (orderId) => {
    try {
      await axios.delete(`http://localhost:9000/api/orders/${orderId}`);

      const response = await axios.get("http://localhost:9000/api/orders/ord");
      setOrders(response.data);
    } catch (error) {
      console.error("Error deleting order:", error.message);
    }
  };
console.log("o",orders);
  return (
    <div className="container mx-auto mt-4">
      <h1 className="text-3xl font-bold mb-4">Order View</h1>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Order ID</th>
            <th className="py-2 px-4 border-b">Seller Name</th>
            <th className="py-2 px-4 border-b">User Name</th>

            <th className="py-2 px-4 border-b">Product Name</th>

            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td className="py-2 px-4 border-b">{order._id}</td>
              <td className="py-2 px-4 border-b">{order?.product_id?.seller_id?.name}</td>

              <td className="py-2 px-4 border-b">
                {order.user_id && order.user_id?.name}
              </td>
              <td className="py-2 px-4 border-b">
                {order.product_id && order.product_id?.name}
              </td>

              <td className="py-2 px-4 border-b">{order.status}</td>
              <td className="py-2 px-4 border-b">
                <button
                  className="bg-red-500 text-white py-1 px-2 rounded-md"
                  onClick={() => handleDelete(order._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderView;

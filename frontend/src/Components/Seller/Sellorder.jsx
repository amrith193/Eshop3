import React, { useState, useEffect, useTransition } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

export default function Sellorder() {
    const [orderRequests, setOrderRequests] = useState([]);
    const [products, setProducts] = useState([]);
    const sellerId = JSON.parse(localStorage.getItem("Seller"));
    const [completedOrders, setCompletedOrders] = useState([]);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const [product, setProduct] = useState(null);
    const [detail, setDetail] = useState({});
    const singleview = async (productId) => {
      try {
        const response = await Axios.get(
          `http://localhost:9000/api/product/single/${productId}`
        );
  
        // Extract the content you want to display in the modal
        const productDetails = response.data;
        setProduct(response.data);
        // Set the modal content
        setModalContent(productDetails);
  
        // Open the modal
        setIsModalOpen(true);
      } catch (error) {
        console.error("Error ", error.message, error.stack);
      }
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
      setModalContent(null);
    };
  
    const openEditModal = (product) => {
      setSelectedProduct(product);
      setIsEditModalOpen(true);
    };
  
    const closeEditModal = () => {
      setSelectedProduct(null);
      setIsEditModalOpen(false);
    };
  
    const handleDelete = async (productId) => {
      try {
        const confirmDelete = window.confirm(
          "Are you sure you want to delete this product?"
        );
        if (!confirmDelete) {
          return;
        }
  
        await Axios.delete(
          `http://localhost:9000/api/product/delete/${productId}`
        );
  
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product._id !== productId)
        );
      } catch (error) {
        console.error("Error deleting item:", error.message, error.stack);
      }
    };
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const sellerId = JSON.parse(localStorage.getItem("Seller"));
  
          const ordersResponse = await Axios.get(
            `http://localhost:9000/api/orders?seller_id=${sellerId._id}`
          );
          setOrderRequests(ordersResponse.data);
  
          const productsUrl = `http://localhost:9000/api/product/view2?seller_id=${sellerId._id}`;
          const productsResponse = await Axios.get(productsUrl);
          setProducts(productsResponse.data);
  
          const completedOrdersResponse = await Axios.get(
            `http://localhost:9000/api/orders?status=completed&seller_id=${sellerId._id}`
          );
          setCompletedOrders(completedOrdersResponse.data);
  
          localStorage.setItem(
            "OrderRequests",
            JSON.stringify(ordersResponse.data)
          );
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
  
      fetchData();
    }, [sellerId._id, products]);
  
    const filteredCompletedOrders = completedOrders.filter((order) => {
      return order.product_id?.seller_id?._id === sellerId;
    });
  
    const handleApprove = async (orderId) => {
      try {
        const updateOrderResponse = await Axios.put(
          `http://localhost:9000/api/orders/${orderId}`,
          {
            status: "completed",
          }
        );
  
        if (updateOrderResponse.status === 200) {
          setOrderRequests((prevOrders) =>
            prevOrders.map((order) =>
              order._id === orderId ? { ...order, status: "completed" } : order
            )
          );
  
          console.log(`Order ${orderId} approved successfully`);
  
          const userId = updateOrderResponse.data.user_id;
          const userResponse = await Axios.get(
            `http://localhost:9000/api/register/singleview/${userId}`
          );
          const userName = userResponse.data.name;
          const userPhone = userResponse.data.phone;
  
          console.log(` Name: ${userName}, Phone: ${userPhone}`);
  
          const orderDetailsResponse = await Axios.get(
            `http://localhost:9000/api/orders/${orderId}`
          );
          const shippingAddress = orderDetailsResponse.data.shippingAddress;
          const remarks = orderDetailsResponse.data.remarks;
  
          console.log(
            ` Shipping Address: ${shippingAddress}, Remarks: ${remarks}`
          );
          setDetail({
            userName,
            userPhone,
            shippingAddress,
            remarks,
          });
  
          console.log("d", detail);
          const productId = updateOrderResponse.data.product_id;
          const updateProductResponse = await Axios.put(
            `http://localhost:9000/api/product/edit/${productId}`,
            {
              status: "Out of Stock",
            }
          );
  
          if (updateProductResponse.status === 200) {
            console.log(`Product status updated successfully to Out of Stock`);
          } else {
            console.error(`Failed to update product status`);
          }
        } else {
          console.error(`Failed to approve order ${orderId}`);
        }
      } catch (error) {
        console.error("Error approving order:", error);
      }
    };
  
    const handleReject = async (orderId) => {
      try {
        const response = await Axios.put(
          `http://localhost:9000/api/orders/${orderId}`,
          {
            status: "cancelled",
          }
        );
  
        if (response.status === 200) {
          setOrderRequests((prevOrders) =>
            prevOrders.map((order) =>
              order._id === orderId ? { ...order, status: "cancelled" } : order
            )
          );
  
          console.log(`Order ${orderId} cancelled successfully`);
        } else {
          console.error(`Failed to reject order ${orderId}`);
        }
      } catch (error) {
        console.error("Error rejecting order:", error);
      }
    };
  
  return (
    <div>

          {/* Order Requests Section */}
          <div className="bg-blue-300 p-6 rounded-md shadow-md transition-all duration-300 hover:bg-green-400 transform hover:scale-105">
          <h2 className="text-xl font-semibold mb-4">Order Requests</h2>
          <ul className="list-disc pl-4">
            {orderRequests
              ?.filter(
                (item) =>
                  item?.product_id?.seller_id === sellerId?._id &&
                  item.status !== "completed" &&
                  item.status !== "cancelled"
              )
              .map((order) => (
                <li
                  key={order._id}
                  className="mb-4 p-4 bg-gray-100 rounded-md flex flex-col"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-lg font-semibold">
                      Order Request {order._id} - Status: {order.status}
                    </span>
                  </div>
                  <div className="flex justify-between items-center flex-grow">
                    <div className="space-x-4">
                      <button
                        onClick={() => handleApprove(order._id)}
                        className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
                      >
                        Approve
                      </button>

                      <button
                        onClick={() => handleReject(order._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        </div>
          {/* Completed Orders */}
<div className="bg-gradient-to-br from-green-400 to-blue-500 p-6 rounded-md shadow-md ">
  <h2 className="text-2xl font-semibold mb-4 text-white">Completed Orders</h2>
  <ul className="list-disc pl-4">
    <li className="mb-4 p-4 bg-gray-100 rounded-md flex flex-col">
      <div className="flex justify-between items-center mb-2">
        <span className="text-lg font-semibold text-gray-800">Order #12345</span>
      </div>
      <div>
        <h2 className="text-lg font-semibold text-gray-800">User Details</h2>
        <p className="text-gray-700">Name: {detail.userName}</p>
        <p className="text-gray-700">Phone: {detail.userPhone}</p>

        <h2 className="text-lg font-semibold text-gray-800">Order Details</h2>
        <p className="text-gray-700">Shipping Address: {detail.shippingAddress}</p>
        <p className="text-gray-700">Remarks: {detail.remarks}</p>
      </div>
      <div className="flex justify-between items-center flex-grow">
        <div className="space-x-4">
          {/* Add buttons or additional details here */}
        </div>
      </div>
    </li>
  </ul>
</div>

        </div>
  )
}

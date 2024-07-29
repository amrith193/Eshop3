import React, { useState, useEffect, useTransition } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

import axios from "axios";

const SellerPage = () => {
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
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-semibold mb-9 text-center text-blue-600 transition-all duration-300">
        Seller Dashboard
      </h1>
      <div >
          {/* <h2 className="text-xl font-semibold mb-4 text-blue-800">
            Add Product
          </h2> */}
          <h2 className="text-xl font-semibold mb-4 text-blue-800">
            <Link to='/'>back</Link>
          </h2>
          <Link
            to="/add"
            className="block bg-blue-500 text-white px-4 py-2 rounded-md text-center transition duration-300 hover:bg-blue-600"
          >
            Add a new product
          </Link>
     
        </div>
        <br />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
       


        {/* View Products Section */}
        <div className="bg-green-200 p-6 rounded-md shadow-md transition-all duration-300 hover:bg-green-300 transform hover:scale-105">
          <h2 className="text-xl font-semibold mb-4">View Products</h2>
          <ul className="list-disc pl-4">
            {products.map((product) => (
              <li key={product._id} className="mb-4 flex flex-col">
                <div className="flex justify-left items-center mb-4">
                  <img
                    src={`http://localhost:9000/uploads/product/${product.productImage[0]}`}
                    alt="Product"
                    className="w-20 h-20 rounded-md"
                  />
                </div>

                <div className="flex justify-between items-center">
                  <div className="text-lg font-medium">{product.name}</div>
                  <div className="flex items-center">
                    <span className="text-gray-700">${product.price}</span>
                    <button
                      className="bg-blue-500 text-white py-1 px-2 rounded-md ml-4"
                      onClick={() => openEditModal(product)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white py-1 px-2 rounded-md ml-2"
                      onClick={() => handleDelete(product._id)}
                    >
                      Delete
                    </button>
                    <button
                      className="bg-blue-500 text-white py-1 px-2 rounded-md ml-2"
                      onClick={() => singleview(product._id)}
                    >
                      View
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Edit Modal */}
        {isEditModalOpen && (
          <div className="transition-all duration-300">
            <EditModal product={selectedProduct} onClose={closeEditModal} />
          </div>
        )}

        {/* Product Details Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
            <div className="relative p-8 bg-white w-3/4 mx-auto my-8 rounded-md transition-all duration-300">
              <h2 className="text-xl font-semibold mb-4">Product Details</h2>
              {modalContent && (
                <div>
                  <div className="mb-4">
                    {/* <strong>Images:</strong> */}
                    <div className="flex space-x-20">
                      <img
                        src={`http://localhost:9000/uploads/product/${product.productImage[0]}`}
                        alt="Product"
                        className="w-60 mb-2 mr-0"
                      />
                      <img
                        src={`http://localhost:9000/uploads/product/${product.productImage[1]}`}
                        alt="Product"
                        className="w-60 mb-2"
                      />
                      <img
                        src={`http://localhost:9000/uploads/product/${product.productImage[2]}`}
                        alt="Product"
                        className="w-60 mb-5"
                      />
                    </div>
                    <div className="mb-4">
                      <strong>Name:</strong> {modalContent.name}
                    </div>
                    <div className="mb-4">
                      <strong>Price:</strong> Rs{modalContent.price}
                    </div>
                  </div>
                  <div className="mb-4">
                    <strong>Description:</strong> {modalContent.description}
                  </div>
                  <div className="mb-4">
                    <strong>Status:</strong> {modalContent.status}
                  </div>
                  <div className="mb-4">
                    <strong>Condition:</strong> {modalContent.condition}
                  </div>
                </div>
              )}
              <button
                className="bg-blue-500 text-white py-1 px-2 rounded-md mt-4"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Order Requests Section */}
        <div className="bg-purple-200 p-6 rounded-md shadow-md transition-all duration-300 hover:bg-purple-300 transform hover:scale-105">
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
    </div>
  );
};

const EditModal = ({ product, onClose }) => {
  const [editedProduct, setEditedProduct] = useState({
    name: product.name,
    description: product.description,
    brand: product.brand,
    price: product.price,
    stock: product.stock,
    condition: product.condition,
    status: product.status,
  });
  const [products, setProducts] = useState([]);
  const [statusOptions] = useState(["In Stock", "Out of Stock"]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prevProduct) => {
      console.log("Previous State:", prevProduct);
      console.log("Updated State:", { ...prevProduct, [name]: value });
      return { ...prevProduct, [name]: value };
    });
  };

  const [Images, setimages] = useState({
    image1: [],
  });
  const handlefilechangeedit = (e, index) => {
    const image = [...Images.image1];
    image[index] = e.target.files[0];
    setimages({ ...Images, image1: image });
    console.log("xc", image);
  };

  const handleEditSubmit = async () => {
    try {
      const formData = new FormData();
      Images.image1.map((item) => {
        formData.append("productImage", item);
      });
      await axios.put(
        `http://localhost:9000/api/product/edit/${product._id}`,
        editedProduct
      );

      // Fetch updated data and set it to the products state
      const response = await axios.get(
        "http://localhost:9000/api/product/view"
      );
      setProducts(response.data);

      onClose();
    } catch (error) {
      console.error("Error editing product:", error);
    }
  };

  return (
    <div
      className={`modal fixed top-0 left-0 w-full h-full flex items-center justify-center ${
        onClose ? "" : "hidden"
      }`}
    >
      <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>

      <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
        <form className="py-4 px-8">
          <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={editedProduct.name}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              description
            </label>
            <input
              type="text"
              id="description"
              name="description"
              value={editedProduct.description}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              brand
            </label>
            <input
              type="text"
              id="brand"
              name="brand"
              value={editedProduct.brand}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={editedProduct.price}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              name="status"
              value={editedProduct.status}
              onChange={handleInputChange}
              className="mt-1 p-2 border rounded-md w-full"
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              stock
            </label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={editedProduct.stock}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              condition
            </label>
            <input
              type="text"
              id="condition"
              name="condition"
              value={editedProduct.condition}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              className="bg-blue-500 text-white py-2 px-4 rounded-md mr-2"
              onClick={handleEditSubmit}
            >
              Save
            </button>
            <button
              type="button"
              className="bg-gray-500 text-white py-2 px-4 rounded-md"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SellerPage;

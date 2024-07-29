import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useParams,Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const OrderSummary = () => {
  const [product, setProduct] = useState(null);
  const [shippingAddress, setShippingAddress] = useState("");
  const [remarks, setRemarks] = useState("");
  const [orderId, setOrderId] = useState(null);
  const [orderStatusMessage, setOrderStatusMessage] = useState("");
  const [seller, setSeller] = useState(null);
  const { id } = useParams();
  const [count, setCount] = useState(0);

  useEffect(() => {
    
    const storedOrderId = localStorage.getItem("order");

    if (storedOrderId) {
      setOrderId(storedOrderId);

      const fetchData = async () => {
        try {
          const orderResponse = await Axios.get(
            `http://localhost:9000/api/orders/${storedOrderId}`
          );
          const orderData = orderResponse.data;

          if (orderData) {
            const pid = orderData.product_id;

            const productResponse = await Axios.get(
              `http://localhost:9000/api/product/single/${pid}`
            );
            const prodData = productResponse.data;
            setProduct(prodData);

            const sellerId = prodData.seller_id;

            if (orderData.status === "processing") {

              console.log("Status:", orderData.status);
            } else if (orderData.status === "completed") {
              localStorage.removeItem("order");
              const sellerResponse = await Axios.get(
                `http://localhost:9000/api/register/singleview/${sellerId}`
              );
              const sellerData = sellerResponse.data;
              setSeller(sellerData);
              setOrderStatusMessage("Order completed!");
            } else if (orderData.status === "cancelled") {
              setOrderStatusMessage("Order rejected.");

            } else {
              setOrderStatusMessage("");
            }
          } else {
            console.error(
              "Error fetching order information: Order data is missing"
            );
          }
        } catch (error) {
          console.error("Error fetching order information:", error);
        }
      };

      fetchData();
    }
  }, [product]);

  useEffect(() => {
    const fetchProductAndSeller = async () => {
      try {
        const response = await Axios.get(
          `http://localhost:9000/api/product/single/${id}`
        );
        const productData = response.data;
        setProduct(productData);
      } catch (error) {
        console.error(
          "Error fetching product, seller, or order status:",
          error
        );
      }
    };

    fetchProductAndSeller();
  }, [id, count]); 

  const [isOrderConfirmed, setIsOrderConfirmed] = useState("");

  const handleOrder = async () => {
    
    try {
      const userId = JSON.parse(localStorage.getItem("Seller"))._id;
      const sellerId = JSON.parse(localStorage.getItem("Seller"))._id;

      const orderData = {
        product_id: id,
        user_id: userId,
        status: "pending",
        shippingAddress: shippingAddress,
        remarks: remarks,
      };

      const response = await Axios.post(
        `http://localhost:9000/api/orders/${sellerId}`,
        orderData
      );

      const newOrderId = response.data.data._id;
      localStorage.setItem("order", newOrderId);
      setOrderId(newOrderId);

      await Axios.put(`http://localhost:9000/api/orders/${newOrderId}`, {
        status: "processing",
      });
      setIsOrderConfirmed(true);

      setOrderStatusMessage("Waiting for order acceptance...");
      console.log("Order request response:", response.data);


      setCount((prevCount) => prevCount + 1);
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  
  console.log("s", orderStatusMessage);
  const nav = useNavigate();
  const back =()=>{
  
    nav('/')
  }

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg p-6 rounded-md">
      <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
      {orderStatusMessage && (
        <div className="mb-4 text-green-500">
          <p>{orderStatusMessage}</p>
        </div>
      )}

      {product ? (
        <div className="flex flex-col items-center border-b border-gray-300 py-2">
          <img
            src={`http://localhost:9000/uploads/product/${product.productImage[0]}`}
            alt="Product"
            className="w-40 h-60 mb-2 rounded-md"
          />
          <p className="text-lg font-semibold mb-1">Name: {product.name}</p>
          <p className="text-gray-700">Rs: {product.price}</p>
        </div>
      ) : (
        <p>No order details available.</p>
      )}

      {/* Total */}
      {product && (
        <div className="flex items-center justify-between mt-4">
          <span className="text-lg font-semibold">Total</span>
          <span className="text-lg font-semibold">Rs: {product.price}</span>
        </div>
      )}

      {seller && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-2">Seller Details</h2>
          <p>Name: {seller.name}</p>
          <p>Email: {seller.email}</p>
          <p>Phone: {seller.phone}</p>
          {/* Add other seller details as needed */}
        </div>
      )}

      {/* Shipping Address */}
      {!isOrderConfirmed && orderStatusMessage !== "Order completed!" && (
        <div className="mt-4">
          <label
            htmlFor="shippingAddress"
            className="block text-sm font-medium text-gray-600"
          >
            Shipping Address:
          </label>
          <input
            type="text"
            id="shippingAddress"
            name="shippingAddress"
            value={shippingAddress}
            onChange={(e) => setShippingAddress(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
      )}

      {/* Remarks */}
      {!isOrderConfirmed && orderStatusMessage !== "Order completed!" && (
        <div className="mt-4">
          <label
            htmlFor="remarks"
            className="block text-sm font-medium text-gray-600"
          >
            Remarks:
          </label>
          <textarea
            id="remarks"
            name="remarks"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            rows="3"
            className="mt-1 p-2 w-full border rounded-md"
          ></textarea>
        </div>
      )}

      {/* Confirm Order Button */}
      {!isOrderConfirmed && orderStatusMessage !== "Order completed!" && (
        <div className="mt-6">
          <button
            onClick={handleOrder}
            className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
          >
            Confirm Order
          </button>
          {/* ... rest of your buttons ... */}
        </div>
      )}
   
      {/* Display additional message for completed status */}
      {orderStatusMessage === "Order completed!" && (
        <div className="mt-4 text-green-500">
          <p>Your order has been completed successfully!</p>
        </div>
      )}
      <button
      onClick={back}
      className="bg-white-500 hover:bg-white-700 text-blue font-bold py-2 px-2 rounded inline-flex items-center"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-6 mr-1"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M8 19l-7-7m0 0l7-7m-7 7h18"
        />
      </svg>
      Back
    </button>
    </div>
  );
};

export default OrderSummary;
// // OrderHistory.js
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const OrderHistory = () => {
//   const [orders, setOrders] = useState([]);
//   const userId = localStorage.getItem('Seller')._id;

//   const fetchOrders = async () => {
//     try {
//       const response = await axios.get(`http://localhost:9000/api/orderuser/${userId}`);
//       console.log('Server Response:', response.data);
 
//       console.log('Filtered Orders:', userOrders);
//       setOrders(response.data);
//     } catch (error) {
//       console.error('Error fetching orders:', error);
//     }
//     fetchOrders()
//   };
  


// const viewProductDetails = async (product_id) => {
//     try {
//       // Ensure product_id is extracted as a string
//       const productId = product_id._id 
  
//       const productResponse = await axios.get(`http://localhost:9000/api/product/view3/${productId}`);
//       const productDetails = productResponse.data;
  
//       // Display or use product details as needed
//       console.log('Product Details:', productDetails);
//     } catch (error) {
//       console.error('Error fetching product details:', error);
//     }
//   };
  

//   return (
//     <div className="container mx-auto mt-8">
//       <h1 className="text-3xl font-bold mb-4">Order History</h1>

//       <div className="grid grid-cols-3 gap-4">
//         {orders.map((order) => (
//           <div key={order._id} className="border p-4 rounded">
//             <h2 className="text-xl font-bold mb-2">Order ID: {order._id}</h2>
//             <p className="mb-2">Status: {order.status}</p>
//             <p className="mb-2">Order Date: {new Date(order.date).toLocaleString()}</p>

//             <button
//               className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700"
//               onClick={() => viewProductDetails(order.product_id)}
//             >
//               View Product Details
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default OrderHistory;
// OrderHistory.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const userId = JSON.parse(localStorage.getItem('Seller'))._id;
  console.log("iddd",userId);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:9000/api/ordersview?user_id=${userId}`);
        setOrders(response.data);
        console.log("f",response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
  
    if (userId.length > 0) {
      fetchOrders();
    }
  }, [userId]);
  
  
  
  
  
  // Assuming orders is an array of order objects with a user_id property

  
  // const viewProductDetails = async (order) => {
  //   try {
  //     // Ensure product_id is defined and extract it as a string
  //     const productId = order.product_id && order.product_id._id;
  
  //     if (productId) {
  //       const productResponse = await axios.get(`http://localhost:9000/api/product/view3/${productId}`);
  //       const productDetails = productResponse.data;
  
  //       // Display or use product details as needed
  //       console.log('Product Details:', productDetails);
  
  //       // Access the product name and display it
  //       const productName = productDetails.name;
  //       console.log('Product Name:', productName);
  
  //       // You can use productName in your UI or wherever needed
  //     } else {
  //       console.error('Product ID is not defined in the order object.');
  //     }
  //   } catch (error) {
  //     console.error('Error fetching product details:', error);
  //   }
  // };

  const viewProductDetails = async (order) => {
    try {
      const productId = order.product_id && order.product_id._id;
  
      if (productId) {
        const productResponse = await axios.get(`http://localhost:9000/api/product/view3/${productId}`);
        const productDetails = productResponse.data;
  
        // Add product name to the order object
        order.productName = productDetails.name;
        order.productprice = productDetails.price;
  
        console.log('Product Details:', productDetails);
  
        // Update state with the modified order object
        setOrders((prevOrders) => {
          const updatedOrders = [...prevOrders];
          const orderIndex = updatedOrders.findIndex((o) => o._id === order._id);
          updatedOrders[orderIndex] = order;
          return updatedOrders;
        });
      } else {
        console.error('Product ID is not defined in the order object.');
      }
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };
  
  
  
  // Rest of the component
  
  return (
    <>
    <div className="container mx-auto mt-8">
    <h1 className="text-3xl font-bold mb-4">Order History</h1>
  
    <div className="grid grid-cols-3 gap-4 ">
      {orders.map((order) => (
        <div key={order._id} className="border p-4 rounded">
          <h2 className="text-xl font-bold mb-2">Order ID: {order._id}</h2>
          <p className="mb-2">Status: {order.status}</p>
          <p className="mb-2">Address: {order.shippingAddress}</p>
          <p className="mb-2">Order Date: {new Date(order.date).toLocaleString()}</p>
  
          <button
            className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700"
            onClick={() => viewProductDetails(order)}
          >
            View Product Details
          </button>
          
          {/* Display product name */}
          {order.productName && (
            <>
            <p className="mb-2">Product Name: {order.productName}</p>
            <p className="mb-2">Price: {order.productprice}</p>
            </>
          )}
        </div>
      ))}
    </div>
  </div>
  </>
  
  );
};

export default OrderHistory;

// src/components/ProductCard.js
import React from 'react';

const ProductCard = ({ title, description, price, imageUrl }) => {
  return (
    
    <div className="bg-white rounded-lg overflow-hidden shadow-md">
      {/* Product Image */}
      <img
        src={imageUrl || "https://via.placeholder.com/300"}
        alt={title || "Product"}
        className="w-40 h-40 object-cover"
      />

      {/* Product Details */}
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{title || "Product Title"}</h2>
       
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-purple-600">Rs {price || "19.99"}</span>
          <button className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600">favorites</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

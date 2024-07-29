// NextPageButton.js
import React from 'react';

const NextPageButton = ({ onClick, disabled }) => {
  return (
    <button
      className={`bg-blue-500 text-white px-4 py-2 rounded ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
      onClick={onClick}
      disabled={disabled}
    >
      Next Page
    </button>
  );
};

export default NextPageButton;

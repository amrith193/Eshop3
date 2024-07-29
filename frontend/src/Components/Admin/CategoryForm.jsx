// CategoryForm.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CategoryForm = () => {
  const [categoryName, setCategoryName] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:9000/api/category/view');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleInputChange = (e) => {
    setCategoryName(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:9000/api/category/insert', {
        name: categoryName,
      });

      console.log('Category added successfully:', response.data);
      // Refresh the category list after successful submission
      fetchData();
      // Reset the input field after successful submission
      setCategoryName('');
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  const handleDelete = async (categoryId) => {
    try {
      const confirmDelete = window.confirm('Are you sure you want to delete this category?');
      if (!confirmDelete) {
        return;
      }

      await axios.delete(`http://localhost:9000/api/category/delete/${categoryId}`);
      console.log('Category deleted successfully');
      // Refresh the category list after successful deletion
      fetchData();
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  return (
    <div className="container mx-auto mt-10">
   <form onSubmit={handleFormSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="categoryName" className="text-lg font-semibold text-gray-800">
            Category Name
          </label>
          <input
            type="text"
            id="categoryName"
            name="categoryName"
            value={categoryName}
            onChange={handleInputChange}
            className="w-full px-3 py-2 mt-2 border rounded-md"
            placeholder="Enter category name"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          Add Category
        </button>
      </form>

      <ul className="mt-4">
        {categories.map((category) => (
          <li key={category._id} className="flex items-center justify-between border-b py-2">
            <span>{category.name}</span>
            <button
              className="text-red-500 hover:text-red-700"
              onClick={() => handleDelete(category._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryForm;

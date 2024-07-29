import React, { useState, useEffect } from "react";
import axios from "axios";
import Axios from "axios";

const EditModal = ({ product, onClose }) => {
  const [editedProduct, setEditedProduct] = useState({
    name: product.name,
    description: product.description,
    brand: product.brand,
    price: product.price,
    stock: product.stock,
    condition: product.condition,
   
  });
  const [products, setProducts] = useState([]);

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
    console.log("xc",image);
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
      const response = await axios.get("http://localhost:9000/api/product/view");
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
          <input type="file" name="img1" onChange={(e) => handlefilechangeedit(e, 0)} />
          <input type="file" name="img2"  onChange={(e) => handlefilechangeedit(e, 1)} />
          <input type="file" name="img3" onChange={(e) => handlefilechangeedit(e, 2)} />
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



const Products = () => {
  const [products, setProducts] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [count, setCount] = useState(0); 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9000/api/product/view"
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    setCount(prevCount => prevCount + 1);

    fetchData();
  }, []);

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
      const confirmDelete = window.confirm("Are you sure you want to delete this product?");
      if (!confirmDelete) {
        return;
      }

      await axios.delete(`http://localhost:9000/api/product/delete/${productId}`);

      // Update the state after deletion
      setProducts((prevProducts) => prevProducts.filter((product) => product._id !== productId));
    } catch (error) {
      console.error("Error deleting item:", error.message, error.stack);
    }
  };
  //Add
  const [form, setForm] = useState({});
  const [categories, setCategories] = useState([]);
  const [selectedCat, setSelectedCat] = useState("");
  const [user, setUser] = useState("");
  const [Images, setimages] = useState({
    image1: [],
  });

  const handlefilechange = (e, index) => {
    const image = [...Images.image1];
    image[index] = e.target.files[0];
    setimages({ ...Images, image1: image });
  };

  useEffect(() => {
    Axios.get("http://localhost:9000/api/category/view")
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleInputChangeAdd = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  const handleImageChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.files[0] });
  };

  const handleCategoryChange = (event) => {
    setSelectedCat(event.target.value);
  };

  useEffect(() => {
    if (localStorage.getItem("Token") === null) {
      navigate("/login");
    } else {
      setUser(JSON.parse(localStorage.getItem("Token")));
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Images.image1.map((item) => {
      formData.append("productImage", item);
    });
    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("brand", form.brand);
    formData.append("price", form.price);
    formData.append("stock", form.stock);
    formData.append("condition", form.condition);
    formData.append("category", selectedCat);
  
    try {
      await axios.post("http://localhost:9000/api/product/insertadmin", formData, {
        headers: { Token: user },
      });
  
      // Fetch updated data and set it to the products state
      const response = await axios.get("http://localhost:9000/api/product/view");
      setProducts(response.data);
  
      // setForm({});
    } catch (err) {
      console.error("Error adding product:", err);
    }
  };
  
  return (
    <div className="container mx-auto mt-2">

<div className="bg-white p-6 rounded shadow-md">
        <h1 className="text-3xl font-bold mb-4 text-center text-blue-500">
          <b>INPUT FORM</b>
        </h1>
        <form className="grid grid-cols-3 gap-5">
          {/* Other input fields */}
          <input
            type="text"
            id="name"
            name="name"
            onChange={handleInputChangeAdd}
            placeholder="Enter name"
            className="p-2 border rounded"
          />
          <input
            type="text"
            id="description"
            name="description"
            onChange={handleInputChangeAdd}
            placeholder="Enter description"
            className="p-2 border rounded"
          />

          <input
            type="text"
            id="brand"
            name="brand"
            onChange={handleInputChangeAdd}
            placeholder="Enter brand"
            className="p-2 border rounded"
          />
          <input
            type="number"
            id="price"
            name="price"
            onChange={handleInputChangeAdd}
            placeholder="Enter price"
            className="p-2 border rounded"
          />

          <input
            type="number"
            id="stock"
            name="stock"
            onChange={handleInputChangeAdd}
            placeholder="Enter stock"
            className="p-2 border rounded"
          />
          <input
            type="text"
            id="condition"
            name="condition"
            onChange={handleInputChangeAdd}
            placeholder="Enter condition"
            className="p-2 border rounded"
          />
          {/* <input
            type="file"
            id="productImage"
            name="productImage"
            onChange={(e) => handleImageChange(e)}
            placeholder="Select product image"
            className="p-2 border rounded"
          /> */}
          <input type="file" name="img1" onChange={(e) => handlefilechange(e, 0)} />
          <input type="file" name="img2"  onChange={(e) => handlefilechange(e, 1)} />
          <input type="file" name="img3" onChange={(e) => handlefilechange(e, 2)} />

          {/* ... (repeat for other input fields) */}

          {/* Category Select */}
          {categories && categories.length > 0 && (
            <select
              value={selectedCat}
              onChange={handleCategoryChange}
              className="p-2 border rounded w-full"
            >
              <option value="" disabled>
                Select category
              </option>
              {categories.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
            </select>
          )}

          {/* Submit Button */}
          <div className="col-span-2 flex justify-end">
            <button
              type="button"
              onClick={handleSubmit}
              className="bg-green-500 text-white p-2 rounded cursor-pointer"
            >
              Submit
            </button>
          </div>
        </form>
      </div>

      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">SL No</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Description</th>
            <th className="py-2 px-4 border-b">Brand</th>
            <th className="py-2 px-4 border-b">Price</th>
            <th className="py-2 px-4 border-b">Stock</th>
            <th className="py-2 px-4 border-b">Condition</th>
            <th className="py-2 px-4 border-b">Product Image</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.id}>
              <td className="py-2 px-4 border-b">{index + 1}</td>
              <td className="py-2 px-4 border-b">{product.name}</td>
              <td className="py-2 px-4 border-b">{product.description}</td>
              <td className="py-2 px-4 border-b">{product.brand}</td>
              <td className="py-2 px-4 border-b">{product.price}</td>
              <td className="py-2 px-4 border-b">{product.stock}</td>
              <td className="py-2 px-4 border-b">{product.condition}</td>
              <td className="py-2 px-4 border-b">
              {product.productImage && product.productImage.length > 0 ? (
  <img
    src={`http://localhost:9000/uploads/product/${product.productImage[0]}`}
    alt="Product"
    className="rounded-full w-16 h-16 object-cover"
  />
) : (
  <p>No images available</p>
)}

              </td>
              <td className="py-2 px-4 border-b">
                <button
                  className="bg-blue-500 text-white py-1 px-2 rounded-md mr-2"
                  onClick={() => openEditModal(product)}
                >
                  Edit
                </button>
                <button className="bg-red-500 text-white py-1 px-2 rounded-md"  onClick={() => handleDelete(product._id)} >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>

       
        {isEditModalOpen && (
          <EditModal product={selectedProduct} onClose={closeEditModal} />
        )}
      </table>
    </div>
  );
};

export default Products;

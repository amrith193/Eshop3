import React, { useState, useEffect } from "react";
import Axios from "axios";

export default function Edit() {
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

  const handleInputChange = (e) => {
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
    Images.image1.map((item)=>{
      formData.append("productImage",item)
    })

    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("brand", form.brand);
    formData.append("price", form.price);
    formData.append("stock", form.stock);
    formData.append("condition", form.condition);
    formData.append("category", selectedCat);
 
   ;

    Axios.post("http://localhost:9000/api/product/insertadmin", formData, {headers: { Token: user },})
      .then((result) => {
        console.log(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-9 rounded shadow-md">
        <h1 className="text-3xl font-bold mb-4 text-center text-blue-500">
          <b>INPUT FORM</b>
        </h1>
        <form className="grid grid-cols-2 gap-4">
          {/* Other input fields */}
          <input
            type="text"
            id="name"
            name="name"
            onChange={handleInputChange}
            placeholder="Enter name"
            className="p-2 border rounded"
          />
          <input
            type="text"
            id="description"
            name="description"
            onChange={handleInputChange}
            placeholder="Enter description"
            className="p-2 border rounded"
          />

          <input
            type="text"
            id="brand"
            name="brand"
            onChange={handleInputChange}
            placeholder="Enter brand"
            className="p-2 border rounded"
          />
          <input
            type="number"
            id="price"
            name="price"
            onChange={handleInputChange}
            placeholder="Enter price"
            className="p-2 border rounded"
          />

          <input
            type="number"
            id="stock"
            name="stock"
            onChange={handleInputChange}
            placeholder="Enter stock"
            className="p-2 border rounded"
          />
          <input
            type="text"
            id="condition"
            name="condition"
            onChange={handleInputChange}
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
    </div>
  );
}

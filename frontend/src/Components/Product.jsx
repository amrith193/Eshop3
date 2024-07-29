import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link, useParams } from "react-router-dom";
import {
  FaRegEnvelope,
  FaBell,
  FaSearch,
  FaShoppingCart,
} from "react-icons/fa";
import {
  IoPhonePortraitOutline,
  IoLaptopOutline,
  IoTvOutline,
  IoCarOutline,
} from "react-icons/io5";
import NextPageButton from "./NextPageButton";

// Card component for navbar
const NavbarCard = ({ title, to }) => (
  <Link to={to} className="text-xl font-bold pr-4">
    {title}
  </Link>
);

const CategoryIcon = ({ categoryName }) => {
  switch (categoryName) {
    case "mobile":
      return;
    case "laptop":
      return;
    case "electronics":
      return;
    case "vehicles":
      return;
    default:
      return null;
  }
};

const Product = ({ loggedIn, setLoggedIn }) => {
  const [searchInput, setSearchInput] = useState("");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user, setUser] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  const [clickedProducts, setClickedProducts] = useState({});

  const nav = useNavigate();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (localStorage.getItem("Token") === null) {
      nav("/login");
    } else {
      setUser(JSON.parse(localStorage.getItem("Token")));
    }
  }, []);

  // const addToCart = async (productId) => {
  //   setIsClicked(true);
  //   try {
  //     const sellerId = JSON.parse(localStorage.getItem("Seller"))._id;

  //     const response = await Axios.post(
  //       "http://localhost:9000/api/cart/addtocart",
  //       {
  //         product_id: productId,
  //         seller_id: sellerId,
  //       },
  //       {
  //         headers: { Token: user },
  //       }
  //     );

  //     console.log("Seller ID from local storage:", sellerId);
  //     console.log("Product added to cart:", response.data);

  //     setCount((prevCount) => prevCount + 1);
  //     setLoggedIn(!loggedIn);
  //   } catch (error) {
  //     console.error("Error adding product to cart:", error.message);
  //   }

  // };

  const addToCart = async (productId) => {
    setClickedProducts((prevClickedProducts) => ({
      ...prevClickedProducts,
      [productId]: true,
    }));

    try {
      const sellerId = JSON.parse(localStorage.getItem("Seller"))._id;

      const response = await Axios.post(
        "http://localhost:9000/api/cart/addtocart",
        {
          product_id: productId,
          seller_id: sellerId,
        },
        {
          headers: { Token: user },
        }
      );

      console.log("Seller ID from local storage:", sellerId);
      console.log("Product added to cart:", response.data);

      setCount((prevCount) => prevCount + 1);
      setLoggedIn(!loggedIn);
    } catch (error) {
      console.error("Error adding product to cart:", error.message);
    }

    setTimeout(() => {
      setClickedProducts((prevClickedProducts) => ({
        ...prevClickedProducts,
        [productId]: false,
      }));
    }, 20000);
  };

  const { product_id } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;

  useEffect(() => {
    Axios.get("http://localhost:9000/api/product/view")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });

    Axios.get("http://localhost:9000/api/category/view")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const filteredProducts =
    selectedCategory === ""
      ? products
      : products.filter((product) => product.category_id === selectedCategory);

  const filteredCatProducts =
    searchInput === ""
      ? filteredProducts
      : filteredProducts.filter((product) =>
          product.name.toLowerCase().includes(searchInput.toLowerCase())
        );

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredCatProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };
  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <>
      <div className="relative overflow-hidden bg-grey-100">
        <div className="pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-16 lg:pt-5">
          <div className="relative mx-7 max-w-7x1 px-5 sm:static sm:px-7 lg:px-8">
            <div className="bg-white border-b border-gray-300 m-4 p-2 rounded-md">
              <nav className="p-4 text-center border rounded-md bg-gray-100">
                <div className="flex items-center ml-auto">
                  <input
                    type="text"
                    placeholder="Search…"
                    className="px-2 py-1 border rounded-md mr-2"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                  />

                  <div className="flex items-center">
                    <div className="mx-2 relative">
                      <FaSearch />
                    </div>

                    <div className="mx-2 relative"></div>
                    <div className="mx-2">
                      <h1
                        className=" text-center"
                        style={{ marginLeft: "350px", fontSize: "23px" }}
                      >
                        {/* <b>All products</b> */}
                      </h1>
                    </div>
                  </div>
                </div>
              </nav>
            </div>

            <div className="container mx-6 my-4 flex gap-9">
              <div
                style={{ width: "200px" }}
                className="p-6 bg-gray-100 rounded-md m-4 border-l border-t"
              >
                <h2 className="text-xl font-bold mb-4 text-center">
                  Categories
                </h2>
                <ul className="divide-y divide-gray-300">
                  <li
                    className="flex items-center py-2 cursor-pointer hover:bg-gray-100 text-center"
                    onClick={() => handleCategoryClick("")}
                  >
                    <CategoryIcon className="mr-2" />
                    All Categories
                  </li>
                  {categories.map((category) => (
                    <li
                      key={category._id}
                      className="flex items-center py-2 cursor-pointer hover:bg-gray-200 text-center"
                      onClick={() => handleCategoryClick(category._id)}
                    >
                      <CategoryIcon categoryName={category.name} />
                      {category.name}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-3">
                {currentProducts.map((product) => (
                  <div
                    key={product._id}
                    className={`p-10 border rounded-md transition-colors hover:border-gray-700 ${
                      product.status === "Out of Stock" ? "out-of-stock" : ""
                    }`}
                  >
                    {product.status === "In Stock" ? (
                      <Link
                        to={`/product/${product._id}`}
                        className={`${
                          product.status === "Out of Stock"
                            ? "cursor-not-allowed"
                            : "cursor-pointer"
                        }`}
                      >
                        {product.productImage &&
                          product.productImage.length > 0 && (
                            <img
                              src={`http://localhost:9000/uploads/product/${product.productImage[0]}`}
                              alt="Product"
                              className="w-full max-h-60 max-w-18 object-contain mb-2"
                            />
                          )}

                        <h3 className="text-lg font-bold">{product.name}</h3>
                        <p className="text-gray-600">Rs: {product.price}</p>

                        <p className="text-gray-600">{product.status}</p>
                      </Link>
                    ) : (
                      <>
                        <div>
                          {product.productImage &&
                            product.productImage.length > 0 && (
                              <img
                                src={`http://localhost:9000/uploads/product/${product.productImage[0]}`}
                                alt="Product"
                                className="w-full max-h-60 max-w-15 object-contain mb-2"
                              />
                            )}

                          <h3 className="text-lg font-bold">{product.name}</h3>
                          <p className="text-gray-600">Rs: {product.price}</p>
                          {/* Display Stock Information */}
                          {/* <p className="text-gray-600">{product.stock}</p> */}
                          {/* <p className="text-gray-600">{product.status}</p> */}
                        </div>
                        <p className="text-red-600">Out of Stock</p>
                      </>
                    )}

                    {/* <button
                      className={`${
                        product.status === "Out of Stock"
                          ? "bg-red-500"
                          : "bg-green-500"
                      } text-white px-4 py-2 rounded-md mt-2`}
                      onClick={() => addToCart(product._id)}
                      disabled={product.status === "Out of Stock"}
                    >
                      {product.status === "Out of Stock"
                        ? "Out of Stock"
                        : " Add to favorites"}
                    </button> */}
                    <button
                      className={`${
                        product.status === "Out of Stock"
                          ? "bg-red-500"
                          : "bg-green-500"
                      } text-white px-4 py-2 rounded-md mt-2`}
                      onClick={() => addToCart(product._id)}
                      disabled={
                        product.status === "Out of Stock" ||
                        clickedProducts[product._id]
                      }
                    >
                      {clickedProducts[product._id]
                        ? "Added to cart"
                        : product.status === "Out of Stock"
                        ? "Out of Stock"
                        : "Add to cart"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* <div className="flex justify-end mr-8 mt-2 mb-2">
        <button
          onClick={handleNextPage}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Next Page
        </button>
      </div> */}

        <div className="flex justify-end items-center mt-4">
          {/* Other content on the left side if any */}

          <div className="flex justify-end mr-8 mt-2 mb-2 ">
            {currentPage > 1 && (
              <button
                onClick={handlePrevPage}
                className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
              >
                Prev Page
              </button>
            )}

            <button
              onClick={handleNextPage}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Next Page
            </button>
          </div>
        </div>
        <footer className="bg-blue-900 text-white p-4">
          <div className="container mx-16 flex flex-wrap justify-between">
            <div className="w-6 md:w-1/4 mb-4 md:mb-0">
              <h2 className="text-xl font-bold mb-2">Contact Us</h2>
              <p>123 Main Street</p>
              <p>Cityville, India</p>
              <p>Email: info@sellite.com</p>
              <p>Phone: +1 234 567 890</p>
            </div>
            <div className="w-full md:w-1/4 mb-4 md:mb-0">
              <h2 className="text-xl font-bold mb-2">Quick Links</h2>
              <ul>
                <li>
                  <a href="/">Home</a>
                </li>
                <li>
                  <a href="/products">Products</a>
                </li>
                <li>
                  <a href="/about">About Us</a>
                </li>
                <li>
                  <a href="/contact">Contact Us</a>
                </li>
              </ul>
            </div>
            <div className="w-full md:w-1/4 mb-4 md:mb-0">
              <h2 className="text-xl font-bold mb-2">Connect With Us</h2>
              <p>Follow us on social media:</p>
              <div className="flex space-x-4 mt-2">
                <a href="#" className="text-white hover:text-gray-400">
                  Facebook
                </a>
                <a href="#" className="text-white hover:text-gray-400">
                  Twitter
                </a>
                <a href="#" className="text-white hover:text-gray-400">
                  Instagram
                </a>
              </div>
            </div>
            <div className="w-full md:w-1/4">
              <h2 className="text-xl font-bold mb-2">Newsletter</h2>
              <p>Subscribe to our newsletter</p>
              <form className="mt-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="border p-2 w-40"
                />
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 mt-2 hover:bg-blue-600"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
          <div className="text-center mt-4">
            <p>&copy; 2023 Sell-It. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Product;

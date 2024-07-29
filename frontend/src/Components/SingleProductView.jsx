import { useState, useEffect } from "react";
import Axios from "axios";
import { useParams, Link } from "react-router-dom";
import { StarIcon } from "@heroicons/react/20/solid";
import { RadioGroup } from "@headlessui/react";
import ProductCard from './Productcard';

const product = {
  name: "Basic Tee 6-Pack",
  price: "$192",
  href: "#",
  breadcrumbs: [
    { id: 1, name: "Men", href: "#" },
    { id: 2, name: "Clothing", href: "#" },
  ],
  images: [
    {
      src: "https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg",
      alt: "Two each of gray, white, and black shirts laying flat.",
    },
    {
      src: "https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg",
      alt: "Model wearing plain black basic tee.",
    },
    {
      src: "https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg",
      alt: "Model wearing plain gray basic tee.",
    },
    {
      src: "https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg",
      alt: "Model wearing plain white basic tee.",
    },
  ],
  colors: [
    { name: "White", class: "bg-white", selectedClass: "ring-gray-400" },
    { name: "Gray", class: "bg-gray-200", selectedClass: "ring-gray-400" },
    { name: "Black", class: "bg-gray-900", selectedClass: "ring-gray-900" },
  ],
  sizes: [
    { name: "XXS", inStock: false },
    { name: "XS", inStock: true },
    { name: "S", inStock: true },
    { name: "M", inStock: true },
    { name: "L", inStock: true },
    { name: "XL", inStock: true },
    { name: "2XL", inStock: true },
    { name: "3XL", inStock: true },
  ],

  details:
    'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
};
const reviews = { href: "#", average: 4, totalCount: 117 };

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[2]);

  const { id } = useParams();
  const [products, setProduct] = useState(null);
  const [allproduct, setallproduct] = useState(null);
  const [product_id, setProduct_id] = useState(id);

  useEffect(() => {
    Axios.get(`http://localhost:9000/api/product/single/${id}`)
      .then((response) => setProduct(response.data))
      .catch((error) => console.error("Error fetching product:", error));
  }, [id]);
  useEffect(() => {
    Axios.get("http://localhost:9000/api/product/view")
      .then((response) => setallproduct(response.data))
      .catch((error) => console.error("Error fetching product:", error));
  }, []);

  if (!products) {
    return <div>Loading...</div>;
  }
 
  const remove = () => {
    localStorage.removeItem("order");
  };
  return (
    <div className="bg-white">
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <ol
            role="list"
            className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
          >
            <li className="text-sm">
              <Link to="/">
                {" "}
                <button className="text-blue-500 hover:underline">Back</button>
              </Link>

              <br />
              <a
                href={product.href}
                aria-current="page"
                className="font-medium text-gray-500 hover:text-gray-600"
              >
                {products.name}
              </a>
            </li>
          </ol>
        </nav>

        {/* Horizontal Line */}
        <hr className="my-6 border-t border-gray-300" />

        {/* Image gallery */}
        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
          <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
            {products.productImage && products.productImage.length > 0 ? (
              <img
                src={`http://localhost:9000/uploads/product/${products.productImage[0]}`}
                alt="Product"
                className="w-full mb-2"
              />
            ) : (
              <p>No images available</p>
            )}
          </div>
          <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
            <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
              {products.productImage && products.productImage.length > 0 ? (
                <img
                  src={`http://localhost:9000/uploads/product/${products.productImage[1]}`}
                  alt="Product"
                  className="w-full mb-2"
                />
              ) : (
                <p>No images available</p>
              )}
            </div>
          </div>
          <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
            {products.productImage && products.productImage.length > 0 ? (
              <img
                src={`http://localhost:9000/uploads/product/${products.productImage[2]}`}
                alt="Product"
                className="w-full mb-2"
              />
            ) : (
              <p>No images available</p>
            )}
          </div>
        </div>

        {/* Product info */}
        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
          {/* ... (unchanged) */}
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {products.name}
            </h1>
          </div>

          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl tracking-tight text-gray-900">
              Rs: {products.price}
            </p>

            {/* Horizontal Line */}
            <hr className="my-6 border-t border-gray-300" />

            <form className="mt-10">
              {/* Colors */}
              {/* Sizes */}
              <div className="mt-10"></div>
              <Link to={`/order/${product_id}`}>
                <button
                  onClick={remove}
                  type="submit"
                  className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-300"
                >
                  Order
                </button>
              </Link>
            </form>
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
            {/* Description and details */}
            <div>
              <h3 className="sr-only">Description</h3>
              <div className="space-y-6">
                <p className="text-base text-gray-900">
                  {products.description}
                </p>
              </div>
            </div>

            {/* Horizontal Line */}
            <hr className="my-6 border-t border-gray-300" />

            <div className="mt-10">
              <h2 className="text-sm font-medium text-gray-900">Condition</h2>
              <div className="mt-4 space-y-6">
                <p className="text-sm text-gray-600">{products.condition}</p>
              </div>
              
            </div>
            
          </div>
          
          <h1 >Similar products</h1>
        </div>
        
        <div className="container mx-44 ">
         
      <div className="container mx-auto mt- grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-20">
     
{allproduct && allproduct.slice(0,3).map((product) => (
  <ProductCard
    key={product.id}
    title={product.name}
    status={product.condition}
    price={product.price}
    imageUrl={`http://localhost:9000/uploads/product/${product.productImage[0]}`}
  />
))}

    </div>
</div>
      </div>
    
   
<br />
<footer className="bg-blue-900 text-white p-4">
          <div className="container mx-auto flex flex-wrap justify-between">
            <div className="w-full md:w-1/4 mb-4 md:mb-0">
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
              <p>
                Subscribe to our newsletter for updates on new products and
                promotions.
              </p>
              <form className="mt-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="border p-2 w-full"
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
  );
}



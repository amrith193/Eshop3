import React, { useState, Fragment,useEffect } from "react";

import Products from "./Sellproduct";
// import edit from "./Add";
import Orders from "./Sellorder";
import sell from "./SellComplete";

import Axios from 'axios';




const components = {

  products: Products,
  orders: Orders,
  
 
};

const drawerWidth = 0; // Set the width of the drawer

export default function Appseller() {
  const [currentComponent, setCurrentComponent] = useState("products");
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [info, setInfo] = useState({});
  const sellerId = JSON.parse(localStorage.getItem("Seller"))._id;
  console.log("D", info);
  console.log("D", sellerId);


  const userdetail = async () => {
    try {
      const responseDetail = await Axios.get(`http://localhost:9000/api/register/singleview/${sellerId}`);
      console.log("det", responseDetail.data);
  
      
      setInfo(responseDetail.data);
    } catch (error) {
      console.error("Error fetching user details:", error.message);
    }
  };
 
  useEffect(() => {
    userdetail();
  }, []);
  
  
  const changeComponent = (component) => {
    try {
      setCurrentComponent(component);
    } catch (error) {
      console.error("Error changing component:", error);
    }
  };
  
  const RenderedComponent = components[currentComponent];

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };


  return (
    <Fragment>
      <div className="content" style={{ marginLeft: drawerWidth, marginTop: "-2px" }}>
        <div className="bg-blue-600">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                
                  <img   className="h-8  w-8 object-cover rounded-full ml-4"src={`http://localhost:9000/Images/users/${info.image}`}alt="" />
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    {/* Add your navigation items here */}
                    <div className="space-x-4">
                      {Object.keys(components).map((key) => (
                        <button
                          key={key}
                          onClick={() => changeComponent(key)}
                          className="text-white hover:bg-gray-600 px-2 py-1 rounded-md"
                        >
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                  <button
                    type="button"
                    className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">View notifications</span>
                  </button>

                  {/* Profile dropdown */}
                  {/* ... */}
                </div>
              </div>
              {/* ... */}
            </div>
          </div>
        </div>

        <header className="bg-white shadow">
          {/* <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
          </div> */}
        </header>
        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            <RenderedComponent />
          </div>
        </main>
      </div>
    </Fragment>
  );
}

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import Register from "./Register";
import Text from "./Navbar";
// import Test from './Admin/Test'
import Main from "./Admin/Main";
import Edit from "./Admin/Add";
import SellerForm from "./SellerForm";
import SingleProductView from "./SingleProductView";
import SignIn from "./SignIn";
import Register from "./Register";
import AdminLogin from "./AdminLogin";
import OrderSummary from "./OrderSummery";
import SellerPage from "./SellerPage";
import Newpage from "./Newpage";
import Sell from "./Seller/SellerMain";
import Sum from "./Summaryorder";
import ManageAccountPage from "./ManageAccountPage";

// import Dashboard from './Admin/Dashboard';
// import Users from './Admin/User';
// import Products from './Admin/Product';
// import Orders from './Admin/Order';

export default function AppRouter() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/admin" element={<Main />} />
          <Route path="/sell" element={<Sell />} />
          <Route path="/" element={<Text />} />
          {/* <Route path='/ad' element={<Test/>} /> */}

          {/* <Route path='/admin/dasboard' element={<Dashboard/>} />
          <Route path='/admin/user' element={<Users/>} />
          <Route path='/admin/product' element={<Products/>} /> */}
          <Route path="/add" element={<SellerForm />} />
          <Route path="/seller" element={<SellerPage />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/order/:id" element={<OrderSummary />} />
          <Route path="/new" element={<Newpage />} />
          <Route path="/sum" element={<Sum />} />

          <Route path="/product/:id" element={<SingleProductView />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/reg" element={<Register />} />
          <Route path="/account" element={<ManageAccountPage />} />
        </Routes>
      </Router>
    </div>
  );
}

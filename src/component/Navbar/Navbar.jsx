import React, { useContext } from "react";
import "./Navbar.module.css";
import Logo from "../../assets/images/freshcart-logo.svg";
import {
  FaFacebook,
  FaLinkedin,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaCartShopping,
} from "react-icons/fa6";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { authContext } from "../../context/AuthContext";
import { FaShoppingCart } from "react-icons/fa";
import { cartContext } from "../../context/CartContext";

export default function Navbar() {
  let {userLogin,setUserLogin}=useContext(authContext);
  let {numOfCartItems}=useContext(cartContext);
  const navigate=useNavigate()
function Logout(){
  localStorage.removeItem("userToken");
  setUserLogin(null);
  navigate('/login');
}
  return (
    <nav className="bg-gray-200 border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-6 gap-3">
        {/* Logo + Menu Button */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <img src={Logo} alt="FreshCart Logo" className="h-8" />
          </Link>
          {/* Mobile menu button */}
          <button
            data-collapse-toggle="navbar-multi-level"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="navbar-multi-level"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>

        {/* Main Menu (desktop) */}
        <div className="hidden md:flex flex-1 justify-between items-center">
         
           {userLogin!==null? <div className="">
              <ul className="flex gap-6">
                <li>
                  <NavLink to="/">Home</NavLink>
                </li>
                <li>
                  <NavLink to="/product">Product</NavLink>
                </li>
                
                <li>
                  <NavLink to="/cart">Cart</NavLink>
                </li>
                <li>
                  <NavLink to="/brands">Brands</NavLink>
                </li>
                <li>
                  <NavLink to="/categories">Categories</NavLink>
                </li>
              </ul>
            </div>:''}
          
          <div className="flex justify-end items-end ms-auto">
            <ul className="flex gap-4 items-center">
            {
                userLogin==null?   <>
                <li>
                  <NavLink to="/login">Login</NavLink>
                </li>
                <li>
                  <NavLink to="/register">Register</NavLink>
                </li>
              </>
               
             : <>
             <li className="relative">
               <button onClick={() => navigate("/cart")}>
                 <FaCartShopping className="text-4xl  text-black/40  ms-2 me-2" />
                 <span className="absolute bottom-7 text-white bg-main px-2 rounded-lg left-6 ">
                 {numOfCartItems}
                 </span>
               </button>
             </li>
             <li>
               <button
                 onClick={() => Logout()}
                 className="block py-2 px-3 text-gray-900 rounded-sm  text-xl hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-700 lg:p-0 "
               >
                 Logout
               </button>
             </li>
           </>
              }
              

              {/* Social icons */}
              <ul className="lg:flex gap-2 md:hidden ml-4" >
               
                <li>
                  <FaFacebook />
                </li>
                <li>
                  <FaLinkedin />
                </li>
                <li>
                  <FaTwitter />
                </li>
                <li>
                  <FaInstagram />
                </li>
                <li>
                  <FaYoutube />
                </li>
              </ul>
            </ul>
          </div>
        </div>

        {/* Mobile Menu */}
        <div id="navbar-multi-level" className="hidden md:hidden w-full">
          <ul className="flex flex-col gap-2 mt-4">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/cart">Cart</NavLink>
            </li>
            <li>
              <NavLink to="/product">Product</NavLink>
            </li>
            <li>
              <NavLink to="/brands">Brands</NavLink>
            </li>
            <li>
              <NavLink to="/categories">Categories</NavLink>
            </li>
          </ul>
          <ul className="flex gap-3 mt-4 justify-center">
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
            <li>
              <NavLink to="/register">Register</NavLink>
            </li>
            <li>
            <button
                 onClick={() => Logout()}
                 
               >
                 Logout
               </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

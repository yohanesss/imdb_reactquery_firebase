import React from "react";
import { Link } from "react-router-dom";
import { Logo } from "features/Layout";

const cart = {
  data: {
    products: [],
  },
};

export const Header = () => {
  return (
    <header className="h-16 w-full bg-white sticky top-0 border-b border-gray-100 shadow-md z-10">
      <nav className="w-full md:w-11/12 m-auto h-full p-5 flex items-center">
        <div className="w-3/12 py-4 pl-0 pr-8">
          <Link to="/" className="inline-block">
            <Logo />
          </Link>
        </div>
        <div className="w-6/12 flex justify-center items-center">
          <input
            className="w-full leading-5 p-2 rounded-md border border-slate-200 outline-none focus:bg-neutral-100"
            type="text"
          />
        </div>
        <div className="w-3/12 flex justify-end items-center">
          <Link to="/cart">
            <button className="hover:underline relative">
              <img
                style={{ width: 25, marginTop: 10 }}
                src="https://daruma.co.id/static/images/logo-cart.png"
                alt="cart"
              />
              {cart && cart.data && (
                <span className="absolute top-0 right-0 bg-red-700 text-white px-1 rounded-full text-sm -mr-2">
                  {cart.data.products.length}
                </span>
              )}
            </button>
          </Link>
          {/* {user ? (
            <button
              className="hover:underline"
              onClick={() => {
                signOut();
                navigate("/");
              }}
            >
              Logout
            </button>
          ) : (
            <Link to="/login">
              <button className="hover:underline">Register / Login</button>
            </Link>
          )} */}
        </div>
      </nav>
    </header>
  );
};

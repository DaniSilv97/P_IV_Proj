import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import BaseButton from "../components/BaseButton";

function BaseLayout({ children }) {
  function Nav(showHome = true, showFields = true, isLoggedIn = false){
    return(
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 bg-white shadow-md rounded-full px-6 py-2 flex justify-between items-center w-[90%] max-w-4xl z-50">
        <div className="flex space-x-4">
          {showHome && (
            <Link to="/" className="text-slate-700 hover:text-black font-medium">
              Home
            </Link>
          )}
          {showFields && (
            <Link to="/fields" className="text-slate-700 hover:text-black font-medium">
              My Fields
            </Link>
          )}
        </div>
        <div>
          {isLoggedIn ? (
            <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center text-white font-bold">
              U
            </div>
          ) : (
            <BaseButton>
              Login
            </BaseButton>
          )}
        </div>
      </nav>
    )
  }
  Nav.propTypes = {
    showHome: PropTypes.bool,
    showFields: PropTypes.bool,
    isLoggedIn: PropTypes.bool
  }

  return (
    <>
      <Nav></Nav>
      <div className="w-full h-full">
        {children}
      </div>
    </>
  );
}

BaseLayout.propTypes = {
  children: PropTypes.node
};

export default BaseLayout;

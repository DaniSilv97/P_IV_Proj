import React from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink } from "react-router-dom";
import BaseButton from "../components/BaseButton";


function BaseLayout({ children, isLoggedIn = false, showRegister = false}) {
  function Nav(){
    return(
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 bg-white shadow-md rounded-full px-6 py-2 flex justify-between items-center w-[90%] max-w-4xl z-50">
        <div className="flex space-x-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-slate-700 hover:text-black font-medium transition ${isActive ? "text-main-hover" : ""}`
            }
          >
            Home
          </NavLink>

          {isLoggedIn && (
            <NavLink
              to="/fields"
              className={({ isActive }) =>
                `text-slate-700 hover:text-black font-medium transition ${isActive ? "text-main-hover" : ""}`
              }
            >
              My Fields
            </NavLink>
          )}
        </div>
        <div>
          {isLoggedIn ? (
            <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center text-white font-bold">
              U
            </div>
          ) : showRegister ? (
            <Link to="/register">
              <BaseButton>
                Register
              </BaseButton>
            </Link>
          ) : (
            <Link to="/login">
              <BaseButton>
                Login
              </BaseButton>
            </Link>
          )}
        </div>
      </nav>
    )
  }

  return (
    <>
      <Nav/>
      <div className="w-full h-full">
        {children}
      </div>
    </>
  );
}

BaseLayout.propTypes = {
  children: PropTypes.node,
  isLoggedIn: PropTypes.bool,
  showRegister: PropTypes.bool
};

export default BaseLayout;

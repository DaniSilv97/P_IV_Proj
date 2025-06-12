import React from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink, useNavigate } from "react-router-dom";
import BaseButton from "../components/BaseButton";
import { useAuth } from '../contexts/AuthContext';

function BaseLayout({ children, showRegister = false }) {
  const { user, setUser, checkedSession } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    console.log('Logging out user:', user);
    try {
      const res = await fetch('http://localhost:5000/api/logout', {
        method: 'POST',
        credentials: 'include',
      });
      if (res.ok) {
        setUser(null);
        navigate('/login');
      }
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  function Nav() {
    return (
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

          {user && (
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
          {user ? (
            <BaseButton onClick={handleLogout}>
              Logout
            </BaseButton>
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
    );
  }

  if (!checkedSession) return null;

  return (
    <>
      <Nav />
      <div className="w-full h-full">
        {children}
      </div>
    </>
  );
}

BaseLayout.propTypes = {
  children: PropTypes.node,
  showRegister: PropTypes.bool
};

export default BaseLayout;

import { Link } from "react-router-dom";
import BaseButton from "../components/BaseButton"

function BaseLayout({ children, showHome = true, showFields = true, isLoggedIn = false }) {
  return (
    <>
      <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-white shadow-md rounded-full px-6 py-2 flex justify-between items-center w-[90%] max-w-4xl z-50">
        <div className="flex space-x-4">
          {showHome && (
            <Link to="/" className="text-gray-700 hover:text-black font-medium">
              Home
            </Link>
          )}
          {showFields && (
            <Link to="/fields" className="text-gray-700 hover:text-black font-medium">
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
      <div className="pt-20 px-4">{children}</div>
    </>
  );
}

export default BaseLayout;

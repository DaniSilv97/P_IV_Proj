import React from "react";
import PropTypes from 'prop-types';

function DeleteCircularButton({onDelete}){
  return (
    <button
      onClick={onDelete}
      className="w-8 h-8 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center shadow-md transition-colors"
      aria-label="Delete field"
    >
      <svg 
        width="16" 
        height="16" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="white" 
        strokeWidth="2"
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        <line x1="18" y1="6" x2="6" y2="18"/>
        <line x1="6" y1="6" x2="18" y2="18"/>
      </svg>
    </button>
  )
}

DeleteCircularButton.propTypes = {
  onDelete: PropTypes.func.isRequired,
};
export default DeleteCircularButton;
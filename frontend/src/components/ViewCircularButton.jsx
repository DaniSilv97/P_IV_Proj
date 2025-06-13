import React from "react";
import PropTypes from 'prop-types';

function ViewCircularButton({onInspect}){
  return (
    <button
      onClick={onInspect}
      className="w-8 h-8 bg-main hover:bg-main-hover rounded-full flex items-center justify-center shadow-md transition-colors"
      aria-label="Edit field"
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
        <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>
    </button>
  )
}

ViewCircularButton.propTypes = {
  onInspect: PropTypes.func.isRequired,
};
export default ViewCircularButton;
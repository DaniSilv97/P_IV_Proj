import React from "react";
import PropTypes from 'prop-types';

function EditCircularButton({onEdit}){
  return (
    <button
      onClick={onEdit}
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
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
        <path d="m18.5 2.5 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
      </svg>
    </button>
  )
}

EditCircularButton.propTypes = {
  onEdit: PropTypes.func.isRequired,
};
export default EditCircularButton;
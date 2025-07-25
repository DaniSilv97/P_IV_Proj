import React from 'react';
import PropTypes from 'prop-types';

function BaseLayout({ children, className, onClick }) {
  return (
    <button 
      onClick={onClick}
      className={
        `
        text-white 
        bg-main 
        hover:bg-main-hover 
        px-4 
        py-1 
        rounded-full 
        font-medium
        shadow-md
        transition-all
        ease-in-out
        hover:translate-x-[0.1rem]
        hover:-translate-y-[0.1rem]
        hover:shadow-lg
        ${className || ''}
      `
      }>
      { children }
    </button>
  );
}

BaseLayout.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export default BaseLayout;

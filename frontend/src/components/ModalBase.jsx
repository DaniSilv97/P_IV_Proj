import React from 'react';
import PropTypes from 'prop-types';

function ModalBase({ children }) {
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'> 
      { children }
    </div>
  );
}

ModalBase.propTypes = {
  children: PropTypes.node
};

export default ModalBase;

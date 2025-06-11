import PropTypes from 'prop-types';
import React from 'react'

function FieldsHeader({children}) {
  return (
    <>
      <div className="absolute text-slate-700 bg-main rounded-tl-lg rounded-br-xl w-56 h-8 flex">
        <h3 className="text-white font-semibold text-lg m-auto">
          {children ?? 'My Fields'}
        </h3>
      </div>
    </>
  );
}
FieldsHeader.propTypes = {
    children: PropTypes.node,
  };

export default FieldsHeader;

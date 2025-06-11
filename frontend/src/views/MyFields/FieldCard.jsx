import React from 'react';
import PropTypes from 'prop-types';
import FieldDefault from '../../assets/field-default.png'
import EditCircularButton from '../../components/EditCircularButton';
import DeleteCircularButton from '../../components/DeleteCircularButton';

function FieldCard({ image, name, temperature, humidity, onEdit, onDelete }) {
  return (
    <div className="relative rounded-2xl  bg-white shadow-lg w-64 h-fit">
      <div className="absolute -top-2 -right-2 flex gap-2 z-10">
        <EditCircularButton onEdit={onEdit} />
        <DeleteCircularButton onDelete={onDelete} />
      </div>

      <div className="h-40 w-full bg-gray-300 overflow-hidden rounded-t-2xl">
        <img
          src={image || FieldDefault}
          alt={name}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="h-20 flex justify-between items-center px-4 py-3 border-t">
        <div className="text-gray-800 font-semibold text-base">
          {name}
        </div>
        <div className="text-right text-sm text-gray-600">
          <div>{temperature}°C</div>
          <div>{humidity}%</div>
        </div>
      </div>
    </div>
  );
}

FieldCard.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string.isRequired,
  temperature: PropTypes.string.isRequired,
  humidity: PropTypes.string.isRequired,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};

FieldCard.defaultProps = {
  image: null,
  onEdit: () => {},
  onDelete: () => {},
};

export default FieldCard;
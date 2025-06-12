import React from 'react';
import PropTypes from 'prop-types';
import FieldDefault from '../../assets/field-default.png'
import EditCircularButton from '../../components/EditCircularButton';
import DeleteCircularButton from '../../components/DeleteCircularButton';
import WeatherIcon from '../../components/WeatherIcon';

function FieldCard({ image, name, weather, onEdit, onDelete }) {
  return (
    <div className="relative rounded-2xl  bg-white shadow-lg w-64 h-fit m-auto">
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
        <div className="text-gray-800 font-semibold text-base grow">
          <div className='pl-2 w-full text-left '>
            {name}
          </div>
        </div>
        <div>
          <WeatherIcon code={weather.icon} />
        </div>
        <div className="text-right text-sm text-gray-600">
          <div>{weather.temperature}°C</div>
          <div>{weather.humidity}%</div>
        </div>
      </div>
    </div>
  );
}

FieldCard.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string.isRequired,
  weather: PropTypes.shape({
    temperature: PropTypes.number.isRequired,
    humidity: PropTypes.number.isRequired,
    icon: PropTypes.string.isRequired,
  }).isRequired,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};

FieldCard.defaultProps = {
  image: null,
  onEdit: () => {},
  onDelete: () => {},
};

export default FieldCard;
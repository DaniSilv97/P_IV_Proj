import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {
//   faSun, faMoon, faCloud, faCloudSun, faCloudMoon,
//   faCloudRain, faBolt, faSnowflake, faSmog
// } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

function WeatherIcon ({ code }) {
  // const iconMap = {
  //   "01d": faSun,
  //   "01n": faMoon,
  //   "02d": faCloudSun,
  //   "02n": faCloudMoon,
  //   "03d": faCloud,
  //   "03n": faCloud,
  //   "04d": faCloud,
  //   "04n": faCloud,
  //   "09d": faCloudRain,
  //   "09n": faCloudRain,
  //   "10d": faCloudRain,
  //   "10n": faCloudRain,
  //   "11d": faBolt,
  //   "11n": faBolt,
  //   "13d": faSnowflake,
  //   "13n": faSnowflake,
  //   "50d": faSmog,
  //   "50n": faSmog
  // };

  return (
    <>
      ☀️
    </>
    // <FontAwesomeIcon icon={iconMap[code] || faCloud} className="text-blue-500 text-xl" />
  );
}
WeatherIcon.propTypes = {
  code: PropTypes.string.isRequired,
};

export default WeatherIcon;
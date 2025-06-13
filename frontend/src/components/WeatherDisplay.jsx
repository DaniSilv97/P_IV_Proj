import React from 'react';
import { useSocket } from '../contexts/SocketProvider';
import WeatherIcon from './WeatherIcon';

const WeatherDisplay = () => {
  const { weather } = useSocket();

  if (!weather) return <p>Waiting for weather data...</p>;
  if (weather.error) return <p>Error: {weather.error}</p>;

  return (
    <div className='text black'>
      <div className="h-10 flex justify-between items-center border-t gap-2">
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
};

export default WeatherDisplay;

import React from 'react';
import PropTypes from 'prop-types';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend
} from 'recharts';
import WeatherIcon from '../../components/WeatherIcon';

function CustomTooltip({ active, payload, label }) {
  if (active && payload?.length) {
    const { temperature, humidity, description, icon } = payload[0].payload;
    return (
      <div className="bg-secondary p-3 rounded border border-main-hover shadow-xl">
        <p className="text-sm font-semibold text-slate-800">{label}</p>
        <div className="flex items-center space-x-2 mt-1">
          <WeatherIcon code={icon} />
          <div>
            <p className="text-sm capitalize text-slate-700">{description}</p>
            <p className="text-sm text-slate-700">Temp: {temperature}°C</p>
            <p className="text-sm text-slate-700">Humidity: {humidity}%</p>
          </div>
        </div>
      </div>
    );
  }
  return null;
}

CustomTooltip.propTypes = {
  active: PropTypes.bool,
  payload: PropTypes.arrayOf(PropTypes.shape({
    payload: PropTypes.shape({
      temperature: PropTypes.number,
      humidity: PropTypes.number,
      description: PropTypes.string,
      icon: PropTypes.string,
    }),
  })),
  label: PropTypes.string,
};

function WeatherChart({ weather }) {
  const data = weather.flatMap(day =>
    day.segments.map(segment => {
      const datePart = segment.time.slice(5, 10);
      const [mm, dd] = datePart.split('-');
      const timePart = segment.time.slice(11, 16);
      return {
        time: `${dd}-${mm} ${timePart}`,
        temperature: segment.temperature,
        humidity: segment.humidity,
        description: segment.description,
        icon: segment.icon
      };
    })
  );

  const xTickFormatter = (tick) => {
    return tick.includes("00:00") || tick.includes("12:00") ? tick : '';
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow-md m-10 overflow-visible">
      <h2 className="text-xl font-semibold mb-4 text-slate-700">5-Day Weather Forecast</h2>
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="time"
            tickFormatter={xTickFormatter}
            angle={-25}
            textAnchor="end"
            height={60}
            interval={0}
          />
          <YAxis yAxisId="left" unit="°C" />
          <YAxis yAxisId="right" orientation="right" unit="%" />
          <Tooltip 
            content={<CustomTooltip />} 
          />
          <Legend verticalAlign="top" height={36} />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="temperature"
            stroke="#4caf50"
            strokeWidth={3}
            name="Temperature"
            dot={{ r: 3 }}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="humidity"
            stroke="#388e3c"
            strokeWidth={3}
            name="Humidity"
            dot={{ r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

WeatherChart.propTypes = {
  weather: PropTypes.arrayOf(
    PropTypes.shape({
      segments: PropTypes.arrayOf(
        PropTypes.shape({
          time: PropTypes.string.isRequired,
          temperature: PropTypes.number.isRequired,
          humidity: PropTypes.number.isRequired,
          description: PropTypes.string.isRequired,
          icon: PropTypes.string.isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
};

export default WeatherChart;

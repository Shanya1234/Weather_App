// components/HistoricalTrends.js
import React from 'react';

const HistoricalTrends = ({ pastWeather, temperatureUnit }) => (
  <div className="historical-trends">
    <h2>Historical Trends (Past 7 Days)</h2>
    <ul>
      {pastWeather.map((day, index) => (
        <li key={index}>
          <p>{new Date(day.dt * 1000).toLocaleDateString()}</p>
          <p>Temp: {day.temp.day}°{temperatureUnit === 'metric' ? 'C' : temperatureUnit === 'imperial' ? 'F' : 'K'}</p>
          <p>Humidity: {day.humidity}%</p>
          <p>Wind Speed: {day.wind_speed} m/s</p>
        </li>
      ))}
    </ul>
  </div>
);

export default HistoricalTrends;

import React from 'react';

const DailySummary = ({ dayData, temperatureUnit }) => {
  if (!dayData || !dayData.temp) return null; // Check if data exists
  
  return (
    <div className="daily-summary">
      <h3>{new Date(dayData.dt * 1000).toLocaleDateString()}</h3>
      <p>Temp: {dayData.temp.day}°{temperatureUnit === 'metric' ? 'C' : temperatureUnit === 'imperial' ? 'F' : 'K'}</p>
      <p>Humidity: {dayData.humidity}%</p>
      <p>Wind: {dayData.wind_speed} m/s</p>
    </div>
  );
};

export default DailySummary;
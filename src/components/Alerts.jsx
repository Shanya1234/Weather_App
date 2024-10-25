// components/Alerts.js
import React from 'react';

const Alerts = ({ currentWeather, tempThreshold, windThreshold, humidityThreshold, temperatureUnit }) => {
  const alerts = [];

  if (currentWeather) {
    const { temp, humidity } = currentWeather.main;
    const windSpeed = currentWeather.wind.speed;

    if (tempThreshold && temp > tempThreshold) {
      alerts.push({ type: 'Temperature', message: `${temp}°${temperatureUnit === 'metric' ? 'C' : temperatureUnit === 'imperial' ? 'F' : 'K'}` });
    }
    if (windThreshold && windSpeed > windThreshold) {
      alerts.push({ type: 'Wind Speed', message: `${windSpeed} m/s` });
    }
    if (humidityThreshold && humidity > humidityThreshold) {
      alerts.push({ type: 'Humidity', message: `${humidity}%` });
    }
  }

  return (
    <div className="max-w-md mx-auto mt-6 p-6 bg-white shadow-lg rounded-lg text-center">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Alerts</h2>
      {alerts.length > 0 ? (
        <table className="w-full text-left table-fixed border-collapse">
          <thead>
            <tr>
              <th className="w-1/2 py-2 px-3 bg-blue-500 text-white font-bold">Alert Type</th>
              <th className="w-1/2 py-2 px-3 bg-blue-500 text-white font-bold">Current Value</th>
            </tr>
          </thead>
          <tbody>
            {alerts.map((alert, index) => (
              <tr key={index} className="bg-gray-100 odd:bg-gray-200">
                <td className="py-2 px-3 border border-gray-300 text-gray-700">{alert.type}</td>
                <td className="py-2 px-3 border border-gray-300 text-gray-700">{alert.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500 mt-4">No alerts</p>
      )}
    </div>
  );
};

export default Alerts;

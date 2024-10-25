import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LinearScale, PointElement, LineElement, Tooltip, Legend, Title } from 'chart.js';


// Register required components for Chart.js
ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend, Title);

const DailyWeatherChart = ({ forecastData, temperatureUnit }) => {
  if (!forecastData) return null; // Return null if no data

  // Extract the hourly temperature data for the next 24 hours
  const hourlyData = forecastData.list.filter((data) => {
    const date = new Date(data.dt * 1000);
    return date.getHours() >= 0 && date.getHours() <= 23; // Filter for today
  });

  const labels = hourlyData.map(data => {
    const date = new Date(data.dt * 1000);
    return `${date.getHours()}:00`; // Format hours
  });

  const temperatures = hourlyData.map(data => {
    const temp = temperatureUnit === 'metric' ? data.main.temp : temperatureUnit === 'imperial' ? (data.main.temp * 9/5) + 32 : data.main.temp + 273.15;
    return temp.toFixed(1); // Convert to appropriate unit and fix decimal
  });

  const data = {
    labels,
    datasets: [
      {
        label: `Temperature (${temperatureUnit === 'metric' ? '°C' : temperatureUnit === 'imperial' ? '°F' : 'K'})`,
        data: temperatures,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
      title: {
        display: true,
        text: 'Daily Temperature Overview',
      },
    },
  };

  return (
    <div>
      <Line data={data} options={options} />
    </div>
  );
};

export default DailyWeatherChart;

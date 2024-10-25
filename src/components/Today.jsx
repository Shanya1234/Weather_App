import React from 'react';

const Today = ({ data, temperatureUnit }) => {
  // Determine the temperature suffix based on the selected unit
  const tempSuffix = temperatureUnit === 'metric' ? '°C' : temperatureUnit === 'imperial' ? '°F' : 'K';

  // Convert temperature based on unit (°C for metric, °F for imperial, K for standard)
  const convertTemp = (temp) => {
    if (temperatureUnit === 'metric') return Math.round(temp);
    if (temperatureUnit === 'imperial') return Math.round(temp); // Celsius to Fahrenheit
    if (temperatureUnit === 'standard') return Math.round(temp); // Celsius to Kelvin
    return temp;
  };

  const averageTemp = convertTemp((data.main.temp_max + data.main.temp_min) / 2);

  // Get the current date
  const today = new Date();
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = today.toLocaleDateString(undefined, options); // Adjust locale if necessary

  return (
    <div className="w-full h-full px-3 pt-16">
      <div className="w-full mx-auto text-black p-4 bg-white/90 md:flex items-center justify-between h-auto rounded-t-xl">
        {/* Right weather icon section */}
        <div className="w-full">
          <div>
            <h2 className='font-bold text-2xl'>CURRENT WEATHER</h2>
            {data.name && <p className="font-bold text-xl">{data.name}</p>}
            {/* Display the current date */}
            <p className="text-lg font-medium">{formattedDate}</p>
          </div>
          <div className="flex items-center text-5xl justify-center">
            <img
              alt="weather"
              className="w-20"
              src={`icons/${data.weather[0].icon}.png`}
            />
            <h1>{convertTemp(data.main.temp)}{tempSuffix}</h1>
          </div>
          <p className="text-2xl font-bold">{data.weather[0].description}</p>
          {/* Display average temperature and dominant weather condition */}
          <div className="text-xl mt-2">
            <p className="font-bold">Avg Temp: {averageTemp}{tempSuffix}</p>
            <p className="font-bold">Condition: {data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1)}</p>
          </div>
        </div>
        {/* Left details section */}
        <div className="w-full p-2 relative">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-xl border-b-2 border-black">
              <p>Feels Like</p>
              <p>{convertTemp(data.main.feels_like)}{tempSuffix}</p>
            </div>
            <div className="flex items-center justify-between text-xl border-b-2 border-black">
              <p>Wind</p>
              <p>{Math.round(data.wind.speed)} m/s</p>
            </div>
            <div className="flex items-center justify-between text-xl border-b-2 border-black">
              <p>Humidity</p>
              <p>{Math.round(data.main.humidity)}%</p>
            </div>
            <div className="flex items-center justify-between text-xl border-b-2 border-black">
              <p>Max Temp</p>
              <p>{convertTemp(data.main.temp_max)}{tempSuffix}</p>
            </div>
            <div className="flex items-center justify-between text-xl border-b-2 border-black">
              <p>Min Temp</p>
              <p>{convertTemp(data.main.temp_min)}{tempSuffix}</p>
            </div>
          </div>
        </div>
      </div>
      <img
        src={`images/${data.weather[0].icon}.jpeg`}
        alt="weather"
        className="w-full object-cover h-48 lg:h-60 rounded-b-xl"
      />
    </div>
  );
};

export default Today;

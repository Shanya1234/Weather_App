import { useState, useEffect } from "react";
import { WEATHER_API_URL, WEATHER_API_KEY } from "./api";
import Today from "./components/Today";
import Forecast from "./components/Forecast";
import DailyWeatherChart from "./components/DailyWeatherchart"; // Import the new chart component
import "./App.css";
import axios from "axios";
import DailySummary from "./components/DailySummary";
import HistoricalTrends from "./components/HistoricalTrends";
import Alerts from "./components/Alerts";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [selectedCity, setSelectedCity] = useState("");
  const [temperatureUnit, setTemperatureUnit] = useState("metric");
  const [tempThreshold, setTempThreshold] = useState(null);
  const [windThreshold, setWindThreshold] = useState(null);
  const [humidityThreshold, setHumidityThreshold] = useState(null);
  const [alertShown, setAlertShown] = useState(false);
  const [pastWeather, setPastWeather] = useState([]);

  const cities = {
    Delhi: { lat: 28.6139, lon: 77.209 },
    Mumbai: { lat: 19.076, lon: 72.8777 },
    Chennai: { lat: 13.0827, lon: 80.2707 },
    Bangalore: { lat: 12.9716, lon: 77.5946 },
    Kolkata: { lat: 22.5726, lon: 88.3639 },
    Hyderabad: { lat: 17.385, lon: 78.4867 },
  };

  const handleCityChange = (event) => {
    const city = event.target.value;
    setSelectedCity(city);
    if (cities[city]) {
      const { lat, lon } = cities[city];
      setLat(lat);
      setLon(lon);
    }
  };

  const handleTemperatureUnitChange = (event) => {
    setTemperatureUnit(event.target.value);
  };

  const fetchWeatherData = (lat, lon) => {
    if (lat && lon) {
      axios
        .get(
          `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=${temperatureUnit}`
        )
        .then((response) => setCurrentWeather(response.data))
        .catch(console.log);

      axios
        .get(
          `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=${temperatureUnit}`
        )
        .then((response) => setForecast(response.data))
        .catch(console.log);
    }
  };

  const fetchPastWeatherData = async (lat, lon) => {
    try {
      const promises = [];
      const currentTime = Math.floor(Date.now() / 1000);

      for (let i = 1; i <= 7; i++) {
        const dayTimestamp = currentTime - i * 86400;
        promises.push(
          axios.get(
            `${WEATHER_API_URL}/onecall/timemachine?lat=${lat}&lon=${lon}&dt=${dayTimestamp}&appid=${WEATHER_API_KEY}&units=${temperatureUnit}`
          )
        );
      }

      const results = await Promise.all(promises);
      const historicalData = results.map((response) => response.data.current);
      setPastWeather(historicalData);
    } catch (error) {
      console.error("Error fetching past weather data:", error);
    }
  };

  useEffect(() => {
    if (lat && lon) {
      fetchPastWeatherData(lat, lon);
    }
  }, [lat, lon, temperatureUnit]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLat(latitude);
        setLon(longitude);
        fetchWeatherData(latitude, longitude);
      },
      (error) => {
        console.error("Error fetching location:", error);
      }
    );

    if (selectedCity) {
      const { lat, lon } = cities[selectedCity];
      fetchWeatherData(lat, lon);
    }
  }, [lat, lon, selectedCity, temperatureUnit]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (lat && lon) {
        fetchWeatherData(lat, lon);
      }
    }, 300000);

    return () => clearInterval(intervalId);
  }, [lat, lon]);

  useEffect(() => {
    const alertIntervalId = setInterval(() => {
      if (currentWeather) {
        const currentTemp = currentWeather.main.temp;
        const currentWind = currentWeather.wind.speed;
        const currentHumidity = currentWeather.main.humidity;

        if (tempThreshold && currentTemp > tempThreshold && !alertShown) {
          alert(`Alert: Temperature has exceeded the threshold! Current Temp: ${currentTemp}°${temperatureUnit === 'metric' ? 'C' : temperatureUnit === 'imperial' ? 'F' : 'K'}`);
          setAlertShown(true);
        } else if (currentTemp <= tempThreshold) {
          setAlertShown(false);
        }

        if (windThreshold && currentWind > windThreshold) {
          alert(`Alert: Wind speed has exceeded the threshold! Current Wind: ${currentWind} m/s`);
        }

        if (humidityThreshold && currentHumidity > humidityThreshold) {
          alert(`Alert: Humidity has exceeded the threshold! Current Humidity: ${currentHumidity}%`);
        }
      }
    }, 7000);

    return () => clearInterval(alertIntervalId);
  }, [currentWeather, tempThreshold, windThreshold, humidityThreshold, temperatureUnit, alertShown]);

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-end p-4 gap-2">
        <select
          value={selectedCity}
          onChange={handleCityChange}
          className="p-2 border rounded-md w-full md:w-auto"
        >
          <option value="" disabled>
            Select City
          </option>
          {Object.keys(cities).map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>

        <select
          value={temperatureUnit}
          onChange={handleTemperatureUnitChange}
          className="p-2 border rounded-md w-full md:w-auto"
        >
          <option value="metric">Celsius (°C)</option>
          <option value="imperial">Fahrenheit (°F)</option>
          <option value="standard">Kelvin (K)</option>
        </select>

        <input
          type="number"
          placeholder="Temp Threshold"
          value={tempThreshold || ""}
          onChange={(e) => setTempThreshold(e.target.value ? parseFloat(e.target.value) : null)}
          className="p-2 border rounded-md w-full md:w-auto"
        />
        <input
          type="number"
          placeholder="Wind Threshold"
          value={windThreshold || ""}
          onChange={(e) => setWindThreshold(e.target.value ? parseFloat(e.target.value) : null)}
          className="p-2 border rounded-md w-full md:w-auto"
        />
        <input
          type="number"
          placeholder="Humidity Threshold"
          value={humidityThreshold || ""}
          onChange={(e) => setHumidityThreshold(e.target.value ? parseFloat(e.target.value) : null)}
          className="p-2 border rounded-md w-full md:w-auto"
        />
      </div>

      <div className="w-full h-screen md:flex items-center justify-between md:gap-4">
        {currentWeather && <Today data={currentWeather} temperatureUnit={temperatureUnit} />}
        {forecast && <Forecast data={forecast} temperatureUnit={temperatureUnit} />}
      </div>

      <div className="summary-container">
        {forecast && forecast.list.slice(0, 7).map((day, index) => (
          <DailySummary key={index} dayData={day} temperatureUnit={temperatureUnit} />
        ))}
      </div>

      {pastWeather.length > 0 && (
        <HistoricalTrends pastWeather={pastWeather} temperatureUnit={temperatureUnit} />
      )}

{currentWeather && (
        <Alerts
          currentWeather={currentWeather}
          tempThreshold={tempThreshold}
          windThreshold={windThreshold}
          humidityThreshold={humidityThreshold}
          temperatureUnit={temperatureUnit}
        />
      )}

      {/* {forecast && (
        <DailyWeatherChart forecastData={forecast} temperatureUnit={temperatureUnit} />
      )} */}
    </div>
  );
}

export default App;

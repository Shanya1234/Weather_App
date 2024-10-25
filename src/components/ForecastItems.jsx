import React, { useState } from "react";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";

const WEEK_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const ForecastItems = ({ item, idx, temperatureUnit }) => {
  const [arrow, setArrow] = useState(false);
  const dayInAWeek = new Date().getDay(); // Current day index (0-6, where 0 is Sunday)
  const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(
    WEEK_DAYS.slice(0, dayInAWeek)
  );

  // Function to convert temperature based on the selected unit
  const convertTemperature = (temp, unit) => {
    switch (unit) {
      case "imperial":
        return Math.round(temp); // Fahrenheit
      case "standard":
        return Math.round(temp); // Kelvin
      default:
        return Math.round(temp); // Celsius
    }
  };

  // Calculate average temperature
  const averageTemp = (item.main.temp_max + item.main.temp_min) / 2;
  const dominantWeather = item.weather[0].description;

  const maxTemp = convertTemperature(item.main.temp_max, temperatureUnit);
  const minTemp = convertTemperature(item.main.temp_min, temperatureUnit);
  const feelsLike = convertTemperature(item.main.feels_like, temperatureUnit);

  // Calculate date based on the index
  const forecastDate = new Date();
  forecastDate.setDate(forecastDate.getDate() + idx); // Get the date for the forecast item
  const formattedDate = `${forecastDate.getDate().toString().padStart(2, '0')}/${(forecastDate.getMonth() + 1).toString().padStart(2, '0')}/${forecastDate.getFullYear()}`; // Format date as dd/mm/yyyy

  return (
    <div>
      <Accordion allowZeroExpanded>
        <AccordionItem key={idx}>
          <AccordionItemHeading>
            <AccordionItemButton>
              <div
                className="w-full flex items-center justify-between bg-slate-50 my-2 px-5 py-1 rounded-full"
                onClick={() => setArrow(!arrow)}
              >
                <label className="text-xl">
                  {forecastDays[idx]} - {formattedDate}
                </label>
                <img
                  src={`icons/${item.weather[0].icon}.png`}
                  className="w-12"
                  alt="weather"
                />
                <label className="text-xl">
                  {maxTemp}°
                  {temperatureUnit === "imperial" ? "F" : temperatureUnit === "standard" ? "K" : "C"} /{" "}
                  {minTemp}°
                  {temperatureUnit === "imperial" ? "F" : temperatureUnit === "standard" ? "K" : "C"}
                </label>
                <label className="text-xl hidden sm:block">
                  {dominantWeather.charAt(0).toUpperCase() + dominantWeather.slice(1)}
                </label>
                {arrow ? (
                  <AiOutlineArrowUp size={30} className="animate-bounce bg-slate-200 rounded-full p-2" />
                ) : (
                  <AiOutlineArrowDown size={30} className="animate-bounce bg-slate-200 rounded-full p-2" />
                )}
              </div>
              {/* Show average temperature and dominant weather condition here */}
              <div className="text-sm text-gray-500">
                Avg Temp: {convertTemperature(averageTemp, temperatureUnit)}°
                {temperatureUnit === "imperial" ? "F" : temperatureUnit === "standard" ? "K" : "C"} | 
                Condition: {dominantWeather.charAt(0).toUpperCase() + dominantWeather.slice(1)}
              </div>
            </AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
            <div className="w-[60%] mx-auto my-3 p-3 bg-white/90 md:flex items-center justify-between rounded-lg">
              <div className="w-full p-2">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between text-xl border-b-2 border-black">
                    <p>Feels Like</p>
                    <p>
                      {feelsLike}°
                      {temperatureUnit === "imperial" ? "F" : temperatureUnit === "standard" ? "K" : "C"}
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-xl border-b-2 border-black">
                    <p>Wind</p>
                    <p>{Math.round(item.wind.speed)} m/s</p>
                  </div>
                  <div className="flex items-center justify-between text-xl border-b-2 border-black">
                    <p>Humidity</p>
                    <p>{Math.round(item.main.humidity)}%</p>
                  </div>
                  <div className="flex items-center justify-between text-xl border-b-2 border-black">
                    <p>Max Temp</p>
                    <p>
                      {maxTemp}°
                      {temperatureUnit === "imperial" ? "F" : temperatureUnit === "standard" ? "K" : "C"}
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-xl border-b-2 border-black">
                    <p>Min Temp</p>
                    <p>
                      {minTemp}°
                      {temperatureUnit === "imperial" ? "F" : temperatureUnit === "standard" ? "K" : "C"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </AccordionItemPanel>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default ForecastItems;

import React from "react";
import ForecastItems from "./ForecastItems";

const Forecast = ({ data, temperatureUnit }) => {
  return (
    <div className="w-full h-full p-5">
      <h1 className="font-bold text-3xl flex justify-center">Weekly Forecast</h1>
      {data.list.slice(0, 7).map((item, idx) => (
        <ForecastItems key={idx} item={item} idx={idx} temperatureUnit={temperatureUnit} />
      ))}
    </div>
  );
};

export default Forecast;

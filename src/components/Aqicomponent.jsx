import React, { useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "tailwindcss/tailwind.css";

const fetchAQIData = async (city) => {
  const response = await fetch(
    `https://api.waqi.info/feed/${city}/?token=6fccb080951117599b9e5ee094b857a52e3a9415`
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();
  if (data.status !== "ok") {
    throw new Error(data.data);
  }

  return data.data;
};

const AQIComponent = () => {
  const [city, setCity] = useState("");
  const [aqiData, setAQIData] = useState(null);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await fetchAQIData(city);
      setAQIData(data);
      setError("");
      setCurrentPage(0); // Reset pagination on new data
    } catch (err) {
      setError(err.message || "Failed to fetch AQI data. Please try again.");
      setAQIData(null);
    }
  };

  const getColorForAQI = (aqi) => {
    if (aqi <= 50) return "#55a84f"; // Good - Green
    if (aqi <= 100) return "#a3c853"; // Moderate - Yellow
    if (aqi <= 150) return "#fff833"; // Unhealthy for Sensitive Groups - Orange
    if (aqi <= 200) return "#f29c33"; // Unhealthy - Red
    if (aqi <= 300) return "#e93f33"; // Very Unhealthy - Purple
    return "#af2d24"; // Hazardous - Maroon
  };

  const [isAnimating, setIsAnimating] = useState(false);

  const handleNext = () => {
    if (aqiData && aqiData.forecast && aqiData.forecast.daily.pm25) {
      const totalPages = Math.ceil(aqiData.forecast.daily.pm25.length / 4);

      setIsAnimating(true);
      setTimeout(() => {
        setCurrentPage((prevPage) => (prevPage + 1) % totalPages);
        setIsAnimating(false);
      }, 500); // Duration of the slide animation
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 p-6 flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-6">
            Air Quality Index (AQI) Checker
          </h1>
          <ul>
            <li className="mb-4 text-gray-400">Home</li>
            <li className="mb-4 text-gray-400">Cities</li>
            <li className="mb-4 text-gray-400">Map</li>
            <li className="mb-4 text-gray-400">Settings</li>
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10">
        <div className="bg-gray-800 p-8 rounded-lg shadow-md">
          <form onSubmit={handleSubmit} className="flex items-center mb-6">
            <input
              type="text"
              value={city}
              onChange={handleInputChange}
              placeholder="Enter city name"
              className="flex-1 px-4 py-2 bg-gray-700 rounded-lg border-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="ml-4 px-6 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Search
            </button>
          </form>

          {error && (
            <div className="text-red-500 text-center mb-4">{error}</div>
          )}

          {aqiData && (
            <div>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold">{aqiData.city.name}</h2>
                <div className="text-center">
                  <div className="w-24 h-24 mb-2">
                    <CircularProgressbar
                      value={aqiData.aqi}
                      maxValue={500}
                      text={`${aqiData.aqi}`}
                      styles={buildStyles({
                        textColor: "#fff",
                        pathColor: getColorForAQI(aqiData.aqi),
                        trailColor: "#555",
                      })}
                    />
                  </div>
                  <p>AQI</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="bg-gray-700 p-6 rounded-lg shadow-inner">
                  <h3 className="text-xl font-semibold mb-4">Air Conditions</h3>
                  <p className="mb-2">Real Feel: {aqiData.iaqi.t?.v}°C</p>
                  <p className="mb-2">Wind: {aqiData.iaqi.w?.v} m/s</p>
                  <p className="mb-2">Chance of Rain: 0%</p>
                  <p className="mb-2">UV Index: 3</p>
                </div>
                <div className="bg-gray-700 p-6 rounded-lg shadow-inner">
                  <h3 className="text-xl font-semibold mb-4">
                    Pollutant Levels
                  </h3>
                  <ul className="list-disc list-inside">
                    <li>PM2.5: {aqiData.iaqi.pm25?.v} µg/m³</li>
                    <li>PM10: {aqiData.iaqi.pm10?.v} µg/m³</li>
                    <li>CO: {aqiData.iaqi.co?.v} µg/m³</li>
                    <li>O3: {aqiData.iaqi.o3?.v} µg/m³</li>
                  </ul>
                </div>
              </div>

              {aqiData.forecast && aqiData.forecast.daily.pm25 && (
                <div className="mt-6">
                  <h3 className="text-xl font-semibold mb-4">PM2.5 Forecast</h3>
                  <div className="relative overflow-hidden">
                    <div
                      className={`grid grid-cols-4 gap-4 transition-all duration-500 ${
                        isAnimating ? "slide-exit" : "slide-enter"
                      }`}
                    >
                      {aqiData.forecast.daily.pm25
                        .slice(currentPage * 4, currentPage * 4 + 4)
                        .map((forecast, index) => (
                          <div
                            key={index}
                            className="bg-gray-700 p-4 rounded-lg shadow-inner"
                          >
                            <p className="text-lg font-bold">{forecast.day}</p>
                            <p>Avg: {forecast.avg} µg/m³</p>
                            <p>Max: {forecast.max} µg/m³</p>
                            <p>Min: {forecast.min} µg/m³</p>
                          </div>
                        ))}
                    </div>
                    <button
                      className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                      onClick={handleNext}
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}

              {aqiData.forecast && aqiData.forecast.daily.uvi && (
                <div className="mt-6">
                  <h3 className="text-xl font-semibold mb-4">
                    UV Index Forecast
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {aqiData.forecast.daily.uvi.map((uvi, index) => {
                      // Determine UV severity color
                      let uvColor;
                      if (uvi.avg <= 2) uvColor = "bg-green-500";
                      else if (uvi.avg <= 5) uvColor = "bg-yellow-500";
                      else if (uvi.avg <= 7) uvColor = "bg-orange-500";
                      else if (uvi.avg <= 10) uvColor = "bg-red-500";
                      else uvColor = "bg-purple-700";

                      return (
                        <div
                          key={index}
                          className={`p-6 rounded-lg shadow-lg flex flex-col items-center ${uvColor} text-white`}
                        >
                          <p className="text-lg font-bold">{uvi.day}</p>
                          <div className="my-4">
                            <p className="text-4xl font-extrabold pl-12">
                              {uvi.avg}
                            </p>
                            <p className="text-lg">Avg UV Index</p>
                          </div>
                          <div className="text-sm">
                            <p>Max: {uvi.max}</p>
                            <p>Min: {uvi.min}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="mt-6 bg-gray-700 p-6 rounded-lg shadow-inner">
                <h3 className="text-xl font-semibold mb-4">Data Attribution</h3>
                <ul className="list-disc list-inside">
                  {aqiData.attributions.map((attr, index) => (
                    <li key={index}>
                      <a
                        href={attr.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:underline"
                      >
                        {attr.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="text-right text-gray-500 mt-4">
                Last Updated: {aqiData.time.s}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AQIComponent;

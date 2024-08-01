import React, { useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "tailwindcss/tailwind.css";
import wind from "../../assets/wind.png";
import protect from "../../assets/protect.png";
import rain from "../../assets/rainy.png";
import thermometer from "../../assets/thermometer.png";
import pm25 from "../../assets/pm25.png";
import pm10 from "../../assets/pm10.png";
import ozone from "../../assets/ozone.png";
import monoxide from "../../assets/monoxide.png";
import ForecastComponent from "./forcastcomponent";
import Dataattribution from "./dataAttribution";

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

export default function Aqibody() {
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

  const getBackgroundColor = (aqi) => {
    if (aqi >= 0 && aqi <= 50) return "green";
    if (aqi >= 51 && aqi <= 100) return "yellow";
    if (aqi >= 101 && aqi <= 150) return "orange";
    if (aqi >= 151 && aqi <= 200) return "red";
    if (aqi >= 201 && aqi <= 300) return "purple";
    if (aqi >= 301 && aqi <= 500) return "maroon";
  };

  const getAQImessage = (aqi) => {
    if (aqi >= 0 && aqi <= 50)
      return "Air quality is satisfactory also air pollution poses little or no risk!";
    if (aqi >= 51 && aqi <= 100)
      return "Air quality is acceptable, small concern to air sensitive people";
    if (aqi >= 101 && aqi <= 150)
      return "People with respiratory or heart conditions, children, and older adults may experience health effects";
    if (aqi >= 151 && aqi <= 200)
      return "Everyone may begin to experience health effects including non-sensitive ones.";
    if (aqi >= 201 && aqi <= 300)
      return "Health alert: everyone may experience more serious health effects!!";
    if (aqi >= 301 && aqi <= 500)
      return "Health warnings of emergency conditions. The entire population is more likely to be affected!!";
  };

  const getAQICondition = (aqi) => {
    if (aqi >= 0 && aqi <= 50) {
      return "Good";
    } else if (aqi >= 51 && aqi <= 100) {
      return "Moderate";
    } else if (aqi >= 101 && aqi <= 150) {
      return "Unhealthy for Sensitive Groups";
    } else if (aqi >= 151 && aqi <= 200) {
      return "Unhealthy";
    } else if (aqi >= 201 && aqi <= 300) {
      return "Very Unhealthy";
    } else if (aqi >= 301 && aqi <= 500) {
      return "Hazardous";
    }
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
    <>
      <div className="w-screen bg-neutral-900 p-4 md:p-6 lg:p-8 flex flex-col justify-between text-center text-white">
        <div>
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mt-4">
            Air Quality Index (AQI) Checker
          </h1>
        </div>
      </div>
      <div className="min-h-screen bg-neutral-900 text-gray-200 flex">
        {/* Main Content */}
        <div className="flex-1 p-4 md:p-6 lg:p-8 bg-neutral-400">
          <div className="bg-neutral-900 p-4 md:p-6 lg:p-8 rounded-lg shadow-md">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col md:flex-row items-center mb-6"
            >
              <input
                type="text"
                value={city}
                onChange={handleInputChange}
                placeholder="Enter city name"
                className="flex-1 px-4 py-2 bg-white rounded-lg border-none focus:ring-2 focus:ring-green-500 text-black font-semibold mb-4 mr-2 md:mb-0"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-green-500 rounded-lg hover:bg-green-600 transition duration-300"
              >
                Search
              </button>
            </form>

            {error && (
              <div className="text-red-500 text-center mb-4">{error}</div>
            )}
            {/* AQI SECTION */}
            {aqiData && (
              <div>
                <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                  <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-green-300 mb-4 md:mb-0">
                    {aqiData.city.name}
                  </h2>
                  {/* aqimessage */}
                  <div
                    className={`w-full md:w-1/2 lg:w-1/3 h-30 bg-${getBackgroundColor(
                      aqiData.aqi
                    )}-500 rounded-lg text-center mb-4 md:mb-0`}
                  >
                    <div className="p-2 md:p-4">
                      <p className="font-bold text-lg md:text-xl lg:text-2xl text-gray-100">
                        {getAQICondition(aqiData.aqi)}
                      </p>
                      <div className="text-sm md:text-base lg:text-lg">
                        {getAQImessage(aqiData.aqi)}
                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="w-24 h-24 mb-2 mx-auto">
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
                    <p className="font-semibold text-xl md:text-2xl">AQI</p>
                  </div>
                </div>

                {/* AIR CONDITIONS */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-700 p-4 md:p-6 rounded-lg shadow-inner text-gray-400">
                    <h3 className="text-lg md:text-xl lg:text-2xl font-semibold mb-4 text-center border rounded-lg bg-blue-300 pt-1 h-9 text-black">
                      Air Conditions
                    </h3>
                    <div className="flex items-center space-x-2 mb-4">
                      <img
                        className="w-12 h-auto object-cover rounded-lg shadow-inner"
                        src={thermometer}
                        alt="Thermometer"
                      />
                      <p className="font-bold text-lg md:text-xl lg:text-2xl">
                        Real Feel: {aqiData.iaqi.t?.v}°C
                      </p>
                    </div>
                    <div className="flex items-center space-x-2 mb-4">
                      <img
                        className="w-12 h-auto object-cover rounded-lg shadow-inner"
                        src={wind}
                        alt="Wind"
                      />
                      <p className="font-bold text-lg md:text-xl lg:text-2xl">
                        Wind: {aqiData.iaqi.w?.v} m/s
                      </p>
                    </div>
                    <div className="flex items-center space-x-2 mb-4">
                      <img
                        className="w-12 h-auto object-cover rounded-lg shadow-inner"
                        src={rain}
                        alt="Rain"
                      />
                      <p className="font-bold text-lg md:text-xl lg:text-2xl">
                        Chances of Rain: 0%
                      </p>
                    </div>
                    <div className="flex items-center space-x-2 mb-4">
                      <img
                        className="w-12 h-auto object-cover rounded-lg shadow-inner"
                        src={protect}
                        alt="UV Index"
                      />
                      <p className="font-bold text-lg md:text-xl lg:text-2xl">
                        UV Index: 3
                      </p>
                    </div>
                  </div>

                  {/* Pollutant Levels */}
                  <div className="bg-gray-700 p-4 md:p-6 rounded-lg shadow-inner text-gray-400">
                    <h3 className="text-lg md:text-xl lg:text-2xl font-semibold mb-4 text-center border rounded-lg bg-amber-600 pt-1 h-9 text-black">
                      Pollutant Levels
                    </h3>
                    <div className="flex items-center space-x-2 mb-4">
                      <img
                        className="w-12 h-auto object-cover rounded-lg shadow-inner"
                        src={pm25}
                        alt="PM2.5"
                      />
                      <p className="font-bold text-lg md:text-xl lg:text-2xl">
                        PM2.5: {aqiData.iaqi.pm25?.v} µg/m³
                      </p>
                    </div>
                    <div className="flex items-center space-x-2 mb-4">
                      <img
                        className="w-12 h-auto object-cover rounded-lg shadow-inner"
                        src={pm10}
                        alt="PM10"
                      />
                      <p className="font-bold text-lg md:text-xl lg:text-2xl">
                        PM10: {aqiData.iaqi.pm10?.v} µg/m³
                      </p>
                    </div>
                    <div className="flex items-center space-x-2 mb-4">
                      <img
                        className="w-12 h-auto object-cover rounded-lg shadow-inner"
                        src={monoxide}
                        alt="CO"
                      />
                      <p className="font-bold text-lg md:text-xl lg:text-2xl">
                        CO: {aqiData.iaqi.co?.v} µg/m³
                      </p>
                    </div>
                    <div className="flex items-center space-x-2 mb-4">
                      <img
                        className="w-12 h-auto object-cover rounded-lg shadow-inner"
                        src={ozone}
                        alt="O3"
                      />
                      <p className="font-bold text-lg md:text-xl lg:text-2xl">
                        O3: {aqiData.iaqi.o3?.v} µg/m³
                      </p>
                    </div>
                  </div>
                </div>
                <ForecastComponent aqiData={aqiData} />
                <Dataattribution aqiData={aqiData} />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

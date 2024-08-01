import React, { useState } from "react";

const ForecastComponent = ({ aqiData }) => {
  // PM2.5 Forecast State
  const [isAnimatingPM25, setIsAnimatingPM25] = useState(false);
  const [currentPagePM25, setCurrentPagePM25] = useState(0);
  const [isPM25Visible, setIsPM25Visible] = useState(true);

  // UV Index Forecast State
  const [isAnimatingUVI, setIsAnimatingUVI] = useState(false);
  const [currentPageUVI, setCurrentPageUVI] = useState(0);
  const [isUVIVisible, setIsUVIVisible] = useState(true);

  const handleNextPM25 = () => {
    setIsAnimatingPM25(true);
    setTimeout(() => {
      if ((currentPagePM25 + 1) * 4 >= aqiData.forecast.daily.pm25.length) {
        setIsPM25Visible(false);
        setCurrentPagePM25(0); // Reset to the beginning
        setTimeout(() => setIsPM25Visible(true), 1000); // Show again after hiding
      } else {
        setCurrentPagePM25((prevPage) => prevPage + 1);
      }
      setIsAnimatingPM25(false);
    }, 500);
  };

  const handleNextUVI = () => {
    setIsAnimatingUVI(true);
    setTimeout(() => {
      if ((currentPageUVI + 1) * 4 >= aqiData.forecast.daily.uvi.length) {
        setIsUVIVisible(false);
        setCurrentPageUVI(0); // Reset to the beginning
        setTimeout(() => setIsUVIVisible(true), 1000); // Show again after hiding
      } else {
        setCurrentPageUVI((prevPage) => prevPage + 1);
      }
      setIsAnimatingUVI(false);
    }, 500);
  };

  return (
    <div>
      {/* PM 2.5 FORECAST */}
      {aqiData.forecast && aqiData.forecast.daily.pm25 && isPM25Visible && (
        <div className="mt-6">
          <h3 className="text-xl mb-4 font-bold">PM2.5 Forecast</h3>
          <div className="relative overflow-hidden">
            <div
              className={`grid grid-cols-4 gap-4 transition-all duration-500 ${
                isAnimatingPM25 ? "slide-exit" : "slide-enter"
              }`}
            >
              {aqiData.forecast.daily.pm25
                .slice(currentPagePM25 * 4, currentPagePM25 * 4 + 4)
                .map((forecast, index) => (
                  <div
                    key={index}
                    className="bg-gray-700 p-4 rounded-lg shadow-inner"
                  >
                    <p className="text-lg font-bold">{forecast.day}</p>
                    <p className="text-gray-400">Avg: {forecast.avg} µg/m³</p>
                    <p className="text-gray-400">Max: {forecast.max} µg/m³</p>
                    <p className="text-gray-400">Min: {forecast.min} µg/m³</p>
                  </div>
                ))}
            </div>
            <button
              className="text-black font-bold absolute right-0 top-1/2 transform -translate-y-1/2 bg-green-500 px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300 mr-2"
              onClick={handleNextPM25}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* UV INDEX FORECAST */}
      {aqiData.forecast && aqiData.forecast.daily.uvi && isUVIVisible && (
        <div className="mt-6">
          <h3 className="text-xl mb-4 font-bold">UV Index Forecast</h3>
          <div className="relative overflow-hidden">
            <div
              className={`grid grid-cols-4 gap-4 transition-all duration-500 ${
                isAnimatingUVI ? "slide-exit" : "slide-enter"
              }`}
            >
              {aqiData.forecast.daily.uvi
                .slice(currentPageUVI * 4, currentPageUVI * 4 + 4)
                .map((uvi, index) => {
                  let uvColor;
                  if (uvi.avg <= 2) uvColor = "bg-gray-700";
                  else if (uvi.avg <= 5) uvColor = "bg-yellow-500";
                  else if (uvi.avg <= 7) uvColor = "bg-orange-500";
                  else if (uvi.avg <= 10) uvColor = "bg-red-500";
                  else uvColor = "bg-purple-700";

                  return (
                    <div
                      key={index}
                      className={`p-4 rounded-lg shadow-inner bg-gray-700 text-gray-100`}
                    >
                      <p className="text-lg font-bold">{uvi.day}</p>
                      <p className="text-gray-400">Avg: {uvi.avg}</p>
                      <p className="text-gray-400">Max: {uvi.max}</p>
                      <p className="text-gray-400">Min: {uvi.min}</p>
                    </div>
                  );
                })}
            </div>
            <button
              className="text-black font-bold absolute right-0 top-1/2 transform -translate-y-1/2 bg-green-500 px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300 mr-2"
              onClick={handleNextUVI}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForecastComponent;

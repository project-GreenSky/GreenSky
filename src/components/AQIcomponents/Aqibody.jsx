import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "tailwindcss/tailwind.css";
import wind from "../../assets/wind.svg";
import thermometer from "../../assets/thermometer.svg";
import pm25 from "../../assets/pm25.svg";
import pm10 from "../../assets/pm10.svg";
import ozone from "../../assets/ozone.svg";
import monoxide from "../../assets/monoxide.svg";
import ForecastComponent from "./forcastcomponent";
import Dataattribution from "./dataAttribution";
import { getAQIBracket } from "@/lib/utils";
import { FaLocationDot, FaRoadBarrier } from "react-icons/fa6";
import { Progress } from "../ui/progress";

const WAQI_KEY = import.meta.env.VITE_WAQI_KEY;

const fetchAQIData = async (city) =>
  axios
    .get(`https://api.waqi.info/feed/${city}/?token=${WAQI_KEY}`)
    .then((res) => {
      let data = res.data;
      if (data.status === "error") return Promise.reject(data.message);
      return Promise.resolve(data.data);
    })
    .catch((err) => Promise.reject(err?.response?.message || "Network Error"));

/**
 * @type {NodeJS.Timeout}
 */
let timeout;

/**
 * @type {AbortController}
 */
let abortController;

export default function Aqibody() {
  const [city, setCity] = useState("");
  const [aqiData, setAQIData] = useState(null);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [suggestion, setSuggestion] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setCity(e.target.value);
    setSuggestion(null);
    let ct = e.target.value;
    if (timeout) {
      clearTimeout(timeout);
      abortController?.abort();
    }

    if (!ct.length) {
      setOpen(false);
      return;
    }

    timeout = setTimeout(() => {
      abortController = new AbortController();
      setOpen(true);
      axios
        .get(`https://api.waqi.info/search/?keyword=${ct}&token=${WAQI_KEY}`, {
          signal: abortController.signal,
        })
        .then((res) => {
          if (res.data.status === "ok") setSuggestion(res.data.data);
        })
        .catch(console.log);
    }, 300);
  };

  const fetchData = async (city) => {
    setAQIData(null);
    setLoading(true);
    try {
      const data = await fetchAQIData(city);
      setAQIData(data);
      setError("");
    } catch (err) {
      setError(err || "Failed to fetch AQI data. Please try again.");
      setAQIData(null);
    } finally {
      setLoading(false);
    }
  };

  const inputRef = useRef(null);
  const resultRef = useRef(null);

  const handleClickOutside = (e) => {
    if (!resultRef.current || !inputRef.current) return;

    if (
      !resultRef.current.contains(e.target) &&
      !inputRef.current.contains(e.target)
    )
      setOpen(false);
  };

  const handleSuggestionClick = (uid) => {
    setOpen(false);
    fetchData(`@${uid}`);
    setCity("");
    setSuggestion(null);
  };

  useEffect(() => {
    window.addEventListener("click", handleClickOutside);

    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    fetchData("here");
  }, []);

  return (
    <>
      <div className="min-h-dvh text-gray-200 items-center flex flex-col w-full md:w-11/12 lg:w-3/4 my-10 md:mx-auto">
        <label
          ref={inputRef}
          className="input relative max-w-96 input-bordered input-primary flex items-center gap-2 w-full bg-base-200 rounded-box"
          onFocus={() => {
            if (!open && suggestion !== null) setOpen(true);
          }}
        >
          <input
            type="text"
            className="grow"
            placeholder="Search city or station"
            value={city}
            onChange={handleInputChange}
          />
          <button className="btn btn-sm btn-ghost btn-circle">
            <FaLocationDot size={16} />
          </button>
          <div
            ref={resultRef}
            className={`duration-300 absolute top-12 left-0 flex flex-col px-1 bg-base-200 shadow-neutral-800 rounded-lg mt-1 shadow-xl w-full max-w-96 ${
              open ? "h-48 py-3" : "h-0 py-0"
            } overflow-y-auto`}
          >
            {open && !suggestion && (
              <div className="m-auto loading loading-ring loading-lg"></div>
            )}
            {suggestion &&
              !!suggestion.length &&
              suggestion.map((s) => (
                <button
                  key={s.uid}
                  className="btn btn-ghost w-full justify-between items-center text-left py-1"
                  onClick={() => handleSuggestionClick(s.uid)}
                >
                  <span className="w-10/12">{s.station.name}</span>
                  {s.aqi !== "-" && (
                    <span
                      style={{ color: getAQIBracket(parseInt(s.aqi))?.color }}
                      className="text-xs"
                    >
                      {s.aqi}
                    </span>
                  )}
                </button>
              ))}
            {suggestion && !suggestion.length && (
              <div className="text-neutral-400 m-auto flex flex-col items-center">
                <FaRoadBarrier size={48} />
                <span>No Results</span>
              </div>
            )}
          </div>
        </label>

        {loading && (
          <div className="loading loading-dots loading-lg text-neutral my-10"></div>
        )}
        {aqiData && (
          <div className="rounded-xl w-full p-10 pb-0 my-10 shadow-lg bg-base-200">
            <div className="text-3xl text-center text-primary font-bold">
              {aqiData.city.name}
            </div>
            <div className="flex flex-wrap">
              {/* Air Conditions */}
              <div className="flex flex-col p-5 my-10 w-3/5 duration-300">
                <p className="text-2xl font-bold border-s-4 p-2 text-blue-400 border-blue-400">
                  Air Conditions
                </p>
                <div className="flex items-end px-2 py-3">
                  <img
                    src={thermometer}
                    alt="temperature"
                    className="w-12 h-12"
                  />
                  <p className="py-2 text-xl text-neutral font-semibold">
                    {parseFloat(aqiData.iaqi.t?.v).toFixed(2)} °C
                  </p>
                  {/* <div className="mx-3 border-e-2 h-full"></div> */}
                  <div className="m-3"></div>
                  <img src={wind} alt="wind" className="w-12 h-12" />
                  <p className="p-2 text-xl text-neutral font-semibold">
                    {parseFloat(aqiData.iaqi.w?.v).toFixed(2)} m/s
                  </p>
                </div>
                <p className="text-2xl mt-5 font-bold border-s-4 p-2 text-amber-400 border-amber-400">
                  Pollutants
                </p>
                <div className="flex flex-col px-2 py-3 flex-wrap">
                  {aqiData.iaqi.pm25?.v && (
                    <div className="flex items-center gap-5">
                      <img src={pm25} alt="pm25" className="w-12 h-12" />
                      <Progress
                        value={Math.min(250, aqiData.iaqi.pm25.v)}
                        max={250}
                        className="bg-neutral-700 w-48"
                      />
                      <p className="py-2 text-xl text-neutral font-semibold">
                        {parseFloat(aqiData.iaqi.pm25?.v).toFixed(2)} µg/m³
                      </p>
                    </div>
                  )}
                  {aqiData.iaqi.pm10?.v && (
                    <div className="flex items-center gap-5">
                      <img src={pm10} alt="pm10" className="w-12 h-12" />
                      <Progress
                        value={Math.min(250, aqiData.iaqi.pm10.v)}
                        max={250}
                        className="bg-neutral-700 w-48"
                      />
                      <p className="py-2 text-xl text-neutral font-semibold">
                        {parseFloat(aqiData.iaqi.pm10?.v).toFixed(2)} µg/m³
                      </p>
                    </div>
                  )}
                  {aqiData.iaqi.co?.v && (
                    <div className="flex items-center gap-5">
                      <img
                        src={monoxide}
                        alt="monoxide"
                        className="w-12 h-12"
                      />
                      <Progress
                        value={aqiData.iaqi.co.v}
                        max={50}
                        className="bg-neutral-700 w-48"
                      />
                      <p className="py-2 text-xl text-neutral font-semibold">
                        {parseFloat(aqiData.iaqi.co?.v).toFixed(2)} ppm
                      </p>
                    </div>
                  )}
                  {aqiData.iaqi.o3?.v && (
                    <div className="flex items-center gap-5">
                      <img src={ozone} alt="ozone" className="w-12 h-12" />
                      <Progress
                        value={aqiData.iaqi.o3.v}
                        max={150}
                        className="bg-neutral-700 w-48"
                      />
                      <p className="py-2 text-xl text-neutral font-semibold">
                        {parseFloat(aqiData.iaqi.o3?.v).toFixed(2)} ppb
                      </p>
                    </div>
                  )}
                </div>
              </div>
              {/* AQI */}
              <div
                className={`flex flex-col py-10 px-5 rounded-3xl items-center border-2 border-${
                  getAQIBracket(aqiData.aqi).bg
                }-500 duration-300 my-auto lg:w-2/5`}
              >
                <div className="w-32 h-32 mb-10 mx-auto duration-300">
                  <CircularProgressbar
                    value={aqiData.aqi}
                    maxValue={500}
                    text={`${aqiData.aqi}`}
                    styles={buildStyles({
                      textColor: getAQIBracket(aqiData.aqi).color,
                      pathColor: getAQIBracket(aqiData.aqi).color,
                      trailColor: "#555",
                    })}
                  />
                </div>

                {/* AQI Message */}
                <div className="w-full max-w-[400px] text-center duration-300">
                  <p
                    className={`font-bold text-2xl text-${
                      getAQIBracket(aqiData.aqi).bg
                    }-500 duration-300`}
                  >
                    {getAQIBracket(aqiData.aqi).condition}
                  </p>
                  <div>{getAQIBracket(aqiData.aqi).message}</div>
                </div>
              </div>
            </div>
          </div>
        )}
        {aqiData && <ForecastComponent forecast={aqiData?.forecast} />}
        {aqiData && (
          <Dataattribution
            attribution={aqiData?.attributions}
            time={aqiData?.time}
          />
        )}

        <div className=" p-4 md:p-6 lg:p-8 ">
          {error && (
            <div className="text-red-500 text-center mb-4">{error}</div>
          )}
        </div>
      </div>
    </>
  );
}

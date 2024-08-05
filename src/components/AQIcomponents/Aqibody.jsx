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
import clsx from "clsx";

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
      <div
        className={clsx(
          "flex flex-col items-center",
          "min-h-dvh max-w-container",
          "mx-auto px-2"
        )}
      >
        <div className="w-full px-2 max-w-96">
          <label
            ref={inputRef}
            className={clsx(
              "input input-bordered input-primary",
              "relative flex items-center gap-2",
              "bg-base-200 rounded-box",
              "my-5 w-full md:my-10"
            )}
            onFocus={() => {
              if (!open && suggestion !== null) setOpen(true);
            }}
          >
            <input
              type="text"
              className="grow mx-2"
              placeholder="Search city or station"
              value={city}
              onChange={handleInputChange}
            />
            <button className="btn btn-sm btn-ghost btn-circle">
              <FaLocationDot size={16} />
            </button>
            <div
              ref={resultRef}
              className={clsx(
                "absolute top-12 left-0",
                "flex flex-col",
                "bg-base-200 shadow-xl shadow-neutral-800",
                "px-1 mt-1 w-full max-w-96 rounded-lg",
                open && "h-48 py-3",
                !open && "h-0 p-0",
                "overflow-y-auto duration-300"
              )}
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
        </div>

        {loading && (
          <div className="loading loading-dots loading-lg text-neutral my-10"></div>
        )}
        {aqiData && (
          <div
            className={
              clsx("w-full", "bg-gradient-to-br from-[#323232] to-[#121212] rounded-xl shadow-lg", "p-2 md:p-10")
              // "p-2 md:p-10 mb-3 mt-5 md:my-10 rounded-xl w-full shadow-lg bg-base-200"
            }
          >
            <div className="text-xl my-5 md:text-3xl text-center text-primary font-bold">
              {aqiData.city.name}
            </div>
            <div className="flex flex-col-reverse flex-wrap justify-evenly md:flex-row">
              {/* Air Conditions */}
              <div
                className={clsx(
                  "flex flex-col my-3 md:w-2/5 gap-2",
                  "duration-300"
                )}
              >
                <p className="text-xl md:text-2xl font-bold border-s-4 p-2 text-blue-400 border-blue-400">
                  Air Conditions
                </p>
                <div className="flex items-end md:px-2 md:py-3">
                  <img
                    src={thermometer}
                    alt="temperature"
                    className="w-12 h-12"
                  />
                  <p className="py-2 text-lg text-neutral font-semibold">
                    {parseFloat(aqiData.iaqi.t?.v).toFixed(2)} °C
                  </p>
                  <div className="m-3"></div>
                  <img src={wind} alt="wind" className="w-12 h-12" />
                  <p className="p-2 text-lg text-neutral font-semibold">
                    {parseFloat(aqiData.iaqi.w?.v).toFixed(2)} m/s
                  </p>
                </div>
                <p className="text-xl md:text-2xl mt-5 font-bold border-s-4 p-2 text-amber-400 border-amber-400">
                  Pollutants
                </p>
                <div className="flex flex-col md:px-2 md:py-3 flex-wrap">
                  {aqiData.iaqi.pm25?.v && (
                    <div className="flex items-center gap-5">
                      <img
                        src={pm25}
                        alt="pm25"
                        className="w-8 h-8 md:w-12 md:h-12"
                      />
                      <Progress
                        value={Math.min(250, aqiData.iaqi.pm25.v)}
                        max={250}
                        className="bg-neutral-700 md:w-3/4"
                      />
                      <p className="py-2 text-neutral md:text-nowrap font-semibold text-sm md:text-md md:w-24 ms-auto w-24">
                        {parseFloat(aqiData.iaqi.pm25?.v).toFixed(2)} µg/m³
                      </p>
                    </div>
                  )}
                  {aqiData.iaqi.pm10?.v && (
                    <div className="flex items-center gap-5">
                      <img
                        src={pm10}
                        alt="pm10"
                        className="w-8 h-8 md:w-12 md:h-12"
                      />
                      <Progress
                        value={Math.min(250, aqiData.iaqi.pm10.v)}
                        max={250}
                        className="bg-neutral-700 md:w-3/4"
                      />
                      <p className="py-2 text-neutral md:text-nowrap font-semibold text-sm md:text-md md:w-24 ms-auto w-24">
                        {parseFloat(aqiData.iaqi.pm10?.v).toFixed(2)} µg/m³
                      </p>
                    </div>
                  )}
                  {aqiData.iaqi.co?.v && (
                    <div className="flex items-center gap-5">
                      <img
                        src={monoxide}
                        alt="monoxide"
                        className="w-8 h-8 md:w-12 md:h-12"
                      />
                      <Progress
                        value={aqiData.iaqi.co.v}
                        max={50}
                        className="bg-neutral-700 md:w-3/4"
                      />
                      <p className="py-2 text-neutral md:text-nowrap font-semibold text-sm md:text-md md:w-24 ms-auto w-24">
                        {parseFloat(aqiData.iaqi.co?.v).toFixed(2)} ppm
                      </p>
                    </div>
                  )}
                  {aqiData.iaqi.o3?.v && (
                    <div className="flex items-center gap-5">
                      <img
                        src={ozone}
                        alt="ozone"
                        className="w-8 h-8 md:w-12 md:h-12"
                      />
                      <Progress
                        value={aqiData.iaqi.o3.v}
                        max={150}
                        className="bg-neutral-700 md:w-3/4"
                      />
                      <p className="py-2 text-neutral md:text-nowrap font-semibold text-sm md:text-md md:w-24 ms-auto w-24">
                        {parseFloat(aqiData.iaqi.o3?.v).toFixed(2)} ppb
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* AQI */}
              <div
                className={clsx(
                  "flex flex-col items-center",
                  "my-auto border-2",
                  `border-${getAQIBracket(aqiData.aqi).bg}-500`,
                  "md:w-2/5 duration-300",
                  "p-3 rounded-box"
                )}
              >
                <div className="w-32 h-32 mx-auto duration-300">
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
                    className={`font-bold text-2xl mb-3 text-${
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

        {error && (
          <div className=" p-4 md:p-6 lg:p-8 ">
            <div className="text-red-500 text-center mb-4">{error}</div>
          </div>
        )}
      </div>
    </>
  );
}

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import bus from "@/assets/bus.svg";
import car from "@/assets/car.svg";
import motorbike from "@/assets/motorbike.svg";
import flight from "@/assets/flight.svg";
import fuel from "@/assets/fuel.svg";
import clean from "@/assets/clean.svg";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * space-separate camelCase options
 * @param {String} string string to format
 * @returns formatted String
 */
export const toSpacedCase = (string) =>
  string.replace(/([a-z][A-Z])/g, (s) => s.split("").join(" "));

// available calculators
export const calculators = [
  {
    title: "Clean Energy to CO2",
    fields: [
      {
        name: "energy",
        label: "Energy Type",
        options: [
          "Solar",
          "Wind",
          "HydroElectric",
          "Biomass",
          "Geothermal",
          "Tidal",
          "OtherCleanEnergy",
        ],
      },
      { name: "consumption", label: "Consumption (KWH)", type: "number" },
    ],
    endpoint:
      "https://carbonfootprint1.p.rapidapi.com/CleanHydroToCarbonFootprint",
    icon: clean,
  },
  {
    title: "Fuel to CO2e",
    fields: [
      {
        name: "type",
        label: "Fuel Type",
        options: ["Petrol", "Diesel", "LPG"],
      },
      { name: "litres", label: "Litres", type: "number" },
    ],
    endpoint: "https://carbonfootprint1.p.rapidapi.com/FuelToCO2e",
    icon: fuel,
  },
  {
    title: "Car Travel",
    fields: [
      {
        name: "vehicle",
        label: "Vehicle Type",
        options: [
          "SmallDieselCar",
          "MediumDieselCar",
          "LargeDieselCar",
          "MediumHybridCar",
          "LargeHybridCar",
          "MediumLPGCar",
          "LargeLPGCar",
          "MediumCNGCar",
          "LargeCNGCar",
          "SmallPetrolVan",
          "LargePetrolVan",
          "SmallDieselVan",
          "MediumDieselVan",
          "LargeDieselVan",
          "LPGVan",
          "CNGVan",
          "SmallPetrolCar",
          "MediumPetrolCar",
          "LargePetrolCar",
          "SmallMotorBike",
          "MediumMotorBike",
          "LargeMotorBike",
        ],
      },
      { name: "distance", label: "Distance (KM)", type: "number" },
    ],
    endpoint:
      "https://carbonfootprint1.p.rapidapi.com/CarbonFootprintFromCarTravel",
    icon: car,
  },
  {
    title: "Flight Travel",
    fields: [
      {
        name: "type",
        label: "Flight Type",
        options: [
          "DomesticFlight",
          "ShortEconomyClassFlight",
          "ShortBusinessClassFlight",
          "LongEconomyClassFlight",
          "LongPremiumClassFlight",
          "LongBusinessClassFlight",
          "LongFirstClassFlight",
        ],
      },
      { name: "distance", label: "Distance (KM)", type: "number" },
    ],
    endpoint:
      "https://carbonfootprint1.p.rapidapi.com/CarbonFootprintFromFlight",
    icon: flight,
  },
  {
    title: "Motorbike Travel",
    fields: [
      {
        name: "type",
        label: "Motorbike Type",
        options: ["SmallMotorBike", "MediumMotorBike", "LargeMotorBike"],
      },
      { name: "distance", label: "Distance (KM)", type: "number" },
    ],
    endpoint:
      "https://carbonfootprint1.p.rapidapi.com/CarbonFootprintFromMotorBike",
    icon: motorbike,
  },
  {
    title: "Public Transport",
    fields: [
      {
        name: "type",
        label: "Transport Type",
        options: [
          "Taxi",
          "ClassicBus",
          "EcoBus",
          "Coach",
          "NationalTrain",
          "LightRail",
          "Subway",
          "FerryOnFoot",
          "FerryInCar",
        ],
      },
      { name: "distance", label: "Distance (KM)", type: "number" },
    ],
    endpoint:
      "https://carbonfootprint1.p.rapidapi.com/CarbonFootprintFromPublicTransit",
    icon: bus,
  },
];

const AQI = {
  GOOD: {
    color: "#55a84f",
    bg: "green",
    message:
      "Air quality is satisfactory also air pollution poses little or no risk!",
    condition: "Good",
  },
  MODERATE: {
    color: "#a3c853",
    bg: "yellow",
    message: "Air quality is acceptable, small concern to air sensitive people",
    condition: "Moderate",
  },
  UNHEALTHY_SENSITIVE: {
    color: "#fff833",
    bg: "orange",
    message:
      "People with respiratory or heart conditions, children, and older adults may experience health effects",
    condition: "Unhealthy for Sensitive Groups",
  },
  UNHEALTHY: {
    color: "#f29c33",
    bg: "red",
    message:
      "Everyone may begin to experience health effects including non-sensitive ones.",
    condition: "Unhealthy",
  },
  VERY_UNHEALTHY: {
    color: "#e93f33",
    bg: "purple",
    message:
      "Health alert: everyone may experience more serious health effects!!",
    condition: "Very Unhealthy",
  },
  HAZARDOUS: {
    color: "#af2d24",
    bg: "maroon",
    message:
      "Health warnings of emergency conditions. The entire population is more likely to be affected!!",
    condition: "Hazardous",
  },
};

/**
 *
 * @param {Number} aqi aqi value
 */
export function getAQIBracket(aqi) {
  if (typeof aqi !== "number") return {};
  if (aqi >= 0 && aqi <= 50) return AQI.GOOD;
  if (aqi >= 51 && aqi <= 100) return AQI.MODERATE;
  if (aqi >= 101 && aqi <= 150) return AQI.UNHEALTHY_SENSITIVE;
  if (aqi >= 151 && aqi <= 200) return AQI.UNHEALTHY;
  if (aqi >= 201 && aqi <= 300) return AQI.VERY_UNHEALTHY;
  return AQI.HAZARDOUS;
}

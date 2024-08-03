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
export const facts = [
  {
    title: "Ozone Layer Depletion",
    description: "The ozone layer is thinning, which increases UV radiation reaching the Earth's surface.",
    name: "UNEP, WMO",
      img: "https://bmkltsly13vb.compat.objectstorage.ap-mumbai-1.oraclecloud.com/cdn.dailymirror.lk/media/images/Editorial-17.jpg"
  },
  {
    title: "PM2.5 and Health Risks",
    description: "PM2.5 particles can penetrate deep into the lungs and even enter the bloodstream, posing serious health risks.",
    name: "World Health Organization",
    img: "https://media.istockphoto.com/id/1144913995/vector/many-peoples-wearing-air-pollution-mask-for-protect-dust-pm2-5-pm10-smoke-smog.jpg?s=612x612&w=0&k=20&c=0vZ7Ji8sIb4FF92WeroHSKSyNGwYvCXLdUDwTB259AU=" 
  },
  {
    title: "PM10 and Respiratory Issues",
    description: "Exposure to PM10 particles can cause respiratory issues, especially in children and the elderly.",
    name: "Environmental Protection Agency",
    img: "https://thumbs.dreamstime.com/z/respiratory-environment-health-breath-organism-girl-boy-wearing-air-pollution-mask-protect-dust-pm-smoke-smog-145811104.jpg"
  },
  {
    title: "Air Quality in Urban Areas",
    description: "Urban areas often experience poor air quality due to high vehicle emissions and industrial activities.",
    name: "World Health Organization",
    img: "https://www.shutterstock.com/image-vector/cars-air-pollution-polluted-environment-600nw-1769819111.jpg" 
  },
  {
    title: "Ozone Pollution",
    description: "Ground-level ozone can cause respiratory problems and aggravate conditions like asthma.",
    name: "Environmental Protection Agency",
    img: "https://media.gettyimages.com/id/526654138/video/cartoon-earth-globe-polluted-by-smoke-from-tubes.jpg?s=640x640&k=20&c=rd5JaxTu7ssPBmWAzmDiNYBMZLS7x4bLh22dhm7vlFk=" 
  },
  {
    title: "PM2.5 and Heart Disease",
    description: "Long-term exposure to PM2.5 can increase the risk of heart disease and stroke.",
    name: "American Heart Association",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhI-WKiQ9DmQiLlgTYo3a6qeQUPe443CwKMg&s" 
  },
  {
    title: "Impact on Vegetation",
    description: "Ozone pollution can damage crops and reduce agricultural production.",
    name: "Environmental Protection Agency",
    img: "https://img.freepik.com/premium-vector/dead-tree-polluting-factory-ecological-problem-environmental-pollution-concept-vector-illustration-isolated-white-background_178650-16860.jpg"
  },
  {
    title: "Air Quality and Visibility",
    description: "High levels of PM2.5 and PM10 can reduce visibility, leading to hazardous driving conditions.",
    name: "National Oceanic and Atmospheric Administration",
    img: "https://static.vecteezy.com/system/resources/thumbnails/039/351/538/small_2x/people-wearing-air-pollution-masks-smog-and-mist-vector.jpg"
  },
  {
    title: "Indoor Air Quality",
    description: "Indoor air pollution can sometimes be worse than outdoor air pollution due to lack of ventilation.",
    name: "Environmental Protection Agency",
    img: "https://www.ecosolutionspro.com/wp-content/uploads/2010/12/Sick-House-259x300.jpg"
  },
  {
    title: "Sources of PM2.5",
    description: "PM2.5 particles are mainly generated from combustion processes, including vehicle engines and industrial activities.",
    name: "Environmental Protection Agency",
    img: "https://c8.alamy.com/zooms/6/f4ea62c19dd64e07ae73a969ea4c9f01/tc7gw5.jpg"
  },
  {
    title: "Effects on Wildlife",
    description: "Air pollution, including ozone and particulate matter, can harm wildlife and disrupt ecosystems.",
    name: "Environmental Protection Agency",
    img: "https://www.shutterstock.com/image-vector/sad-comic-bears-suffering-air-260nw-2291294143.jpg"
  },
  {
    title: "Air Quality Index (AQI)",
    description: "The AQI is a measure used to communicate how polluted the air currently is or how polluted it is forecasted to become.",
    name: "Environmental Protection Agency",
    img: "https://media.istockphoto.com/id/1134364154/vector/environment-ecology-infographic-elements-risks-and-pollution-ecosystem.jpg?s=612x612&w=0&k=20&c=1ta5F_oWmXHgCEVbmgX_V-zgXJ38OXASEuI50PDRwsU="
  }
];


import React, { useState } from "react";
import axios from "axios";
import FormComponent from "./FormComponent";
import "./CarbonFootPrintCalculator.css";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { FaInfo } from "react-icons/fa6";
import bus from "../../assets/bus.svg";
import car from "../../assets/car.svg";
import motorbike from "../../assets/motorbike.svg";
import flight from "../../assets/flight.svg";
import fuel from "../../assets/fuel.svg";
import clean from "../../assets/clean.svg";

const apiKey = import.meta.env.VITE_API_KEY;
const apiUrl = import.meta.env.VITE_API_URL;

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

const CarbonFootprintCalculator = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState(calculators[0]);

  const handleCalculate = async (endpoint, params) => {
    setLoading(true);
    setError(null); // Reset error state before making the request
    try {
      const response = await axios.get(endpoint, {
        params,
        headers: {
          "x-rapidapi-host": new URL(apiUrl).host,
          "x-rapidapi-key": apiKey,
        },
      });
      setResult(response.data.carbonEquivalent); // Correctly set the result
    } catch (error) {
      setError(
        error.response
          ? error.response.data.message
          : "An unexpected error occurred."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      // style={{
      //   backgroundImage: `url(${selected.icon})`,
      //   backgroundAttachment: "local",
      //   backgroundRepeat: "no-repeat",
      //   backgroundSize: 200,
      //   backgroundPosition: "2% 100%",
      // }}
      className="max-w-container duration-300 mx-auto p-10 gap-10 lg:rounded-xl bg-gradient-to-br from-[#323232] to-[#121212] shadow-lg flex flex-col"
    >
      <div className="flex flex-wrap justify-around">
        <div className="flex flex-col justify-center gap-12 overflow-hidden">
          <span className="text-3xl text-center font-bold">
            Calculate your Carbon Footprint
          </span>

          <Select
            value={selected.title}
            onValueChange={(v) => {
              setSelected(calculators.find((f) => f.title === v));
              setError(false);
              setResult(null);
            }}
          >
            <SelectTrigger className="max-w-[250px] mx-auto my-2 bg-base-200">
              <SelectValue placeholder={calculators[0].title} />
            </SelectTrigger>
            <SelectContent>
              {calculators.map((calc) => (
                <SelectItem key={calc.title} value={calc.title}>
                  {calc.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <FormComponent
          key={selected.title}
          title={selected.title}
          fields={selected.fields}
          onSubmit={(fields) => handleCalculate(selected.endpoint, fields)}
          loading={loading}
        />
      </div>
      {!loading && result && (
        <Card key={result} className="w-fit ms-auto">
          <CardHeader>
            <CardTitle className="text-[#2e7d32] font-bold">
              Result: {!!result ? `${result} kg CO2e` : "No result available"}
            </CardTitle>
            <CardDescription className="flex items-baseline gap-1 pt-2">
              <FaInfo className="text-blue-600" />
              {!!result && !isNaN(result)
                ? `${result} kg CO2e is approximately equivalent to ${(
                    Number(result) / 100
                  ).toFixed(2)} change in AQI`
                : "Invalid or no result available"}
            </CardDescription>
          </CardHeader>
        </Card>
      )}
    </div>
  );
};

export default CarbonFootprintCalculator;

import React, { useState } from "react";
import axios from "axios";
import FormComponent from "./FormComponent";
import "./CarbonFootPrintCalculator.css";
import { calculators } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { FaInfo } from "react-icons/fa6";

const apiKey = import.meta.env.VITE_API_KEY;
const apiUrl = import.meta.env.VITE_API_URL;

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
      style={{
        backgroundImage: `url(${selected.icon})`,
        backgroundAttachment: "local",
        backgroundRepeat: "no-repeat",
        backgroundSize: 200,
        backgroundPosition: "2% 100%",
      }}
      className="w-full duration-300 lg:w-3/4 mx-auto lg:my-5 p-10 gap-10 lg:rounded-xl bg-base-200 shadow-lg flex flex-col"
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

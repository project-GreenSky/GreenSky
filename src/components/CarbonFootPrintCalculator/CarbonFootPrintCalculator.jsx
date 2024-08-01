import React, { useState } from 'react';
import axios from 'axios';
import FormComponent from './FormComponent';
import './CarbonFootPrintCalculator.css';

const apiKey = import.meta.env.VITE_API_KEY;
const apiUrl = import.meta.env.VITE_API_URL;

const CarbonFootprintCalculator = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCalculate = async (endpoint, params) => {
    setLoading(true);
    setError(null); // Reset error state before making the request
    try {
      const response = await axios.get(endpoint, {
        params,
        headers: {
          'x-rapidapi-host': new URL(apiUrl).host,
          'x-rapidapi-key': apiKey,
        },
      });
      setResult(response.data.carbonEquivalent); // Correctly set the result
    } catch (error) {
      setError(error.response ? error.response.data.message : 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="calculator-container">
      <div className="tabs-container">
        <div className="tabs-row">
          <FormComponent
            title="Clean Energy to CO2"
            fields={[
              { name: 'energy', label: 'Energy Type', options: ['Solar', 'Wind', 'HydroElectric', 'Biomass', 'Geothermal', 'Tidal', 'OtherCleanEnergy'] },
              { name: 'consumption', label: 'Consumption (KWH)', type: 'number' },
            ]}
            onSubmit={(fields) => handleCalculate('https://carbonfootprint1.p.rapidapi.com/CleanHydroToCarbonFootprint', fields)}
          />
          <FormComponent
            title="Fuel to CO2e"
            fields={[
              { name: 'type', label: 'Fuel Type', options: ['Petrol', 'Diesel', 'LPG'] },
              { name: 'litres', label: 'Litres', type: 'number' },
            ]}
            onSubmit={(fields) => handleCalculate('https://carbonfootprint1.p.rapidapi.com/FuelToCO2e', fields)}
          />
          <FormComponent
            title="Car Travel"
            fields={[
              { name: 'vehicle', label: 'Vehicle Type', options: [
                'SmallDieselCar', 'MediumDieselCar', 'LargeDieselCar', 'MediumHybridCar', 'LargeHybridCar', 
                'MediumLPGCar', 'LargeLPGCar', 'MediumCNGCar', 'LargeCNGCar', 'SmallPetrolVan', 'LargePetrolVan', 
                'SmallDieselVan', 'MediumDieselVan', 'LargeDieselVan', 'LPGVan', 'CNGVan', 
                'SmallPetrolCar', 'MediumPetrolCar', 'LargePetrolCar', 'SmallMotorBike', 'MediumMotorBike', 'LargeMotorBike'
              ]},
              { name: 'distance', label: 'Distance (KM)', type: 'number' },
            ]}
            onSubmit={(fields) => handleCalculate('https://carbonfootprint1.p.rapidapi.com/CarbonFootprintFromCarTravel', fields)}
          />
        </div>
        <div className="tabs-row">
          <FormComponent
            title="Flight Travel"
            fields={[
              { name: 'type', label: 'Flight Type', options: [
                'DomesticFlight', 'ShortEconomyClassFlight', 'ShortBusinessClassFlight', 'LongEconomyClassFlight',
                'LongPremiumClassFlight', 'LongBusinessClassFlight', 'LongFirstClassFlight'
              ]},
              { name: 'distance', label: 'Distance (KM)', type: 'number' },
            ]}
            onSubmit={(fields) => handleCalculate('https://carbonfootprint1.p.rapidapi.com/CarbonFootprintFromFlight', fields)}
          />
          <FormComponent
            title="Motorbike Travel"
            fields={[
              { name: 'type', label: 'Motorbike Type', options: ['SmallMotorBike', 'MediumMotorBike', 'LargeMotorBike'] },
              { name: 'distance', label: 'Distance (KM)', type: 'number' },
            ]}
            onSubmit={(fields) => handleCalculate('https://carbonfootprint1.p.rapidapi.com/CarbonFootprintFromMotorBike', fields)}
          />
          <FormComponent
            title="Public Transport"
            fields={[
              { name: 'type', label: 'Transport Type', options: [
                'Taxi', 'ClassicBus', 'EcoBus', 'Coach', 'NationalTrain', 'LightRail', 'Subway', 'FerryOnFoot', 'FerryInCar'
              ]},
              { name: 'distance', label: 'Distance (KM)', type: 'number' },
            ]}
            onSubmit={(fields) => handleCalculate('https://carbonfootprint1.p.rapidapi.com/CarbonFootprintFromPublicTransit', fields)}
          />
        </div>
      </div>
      {loading ? <div className="loading">Calculating...</div> : (
        <div className="result">
          <h2>Result: {result !== null ? `${result} kg CO2e` : 'No result available'}</h2>
          <div className="converter">
            <h3>AQI Converter</h3>
            <p>
              {result !== null && !isNaN(result) ? 
                `${result} kg CO2e is approximately equivalent to ${(Number(result) / 100).toFixed(2)} change in AQI` : 
                'Invalid or no result available'}
            </p>
          </div>
        </div>
      )}
      {error && <div className="error">Error: {error}</div>}
    </div>
  );
};

export default CarbonFootprintCalculator;

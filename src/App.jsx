import React from 'react';
import CarbonFootprintCalculator from './Components/CarbonFootPrintCalculator/CarbonFootPrintCalculator.jsx';

const App = () => {
  return (
    <div className="App">
      <h1>Carbon Footprint Calculator</h1>
      {/* <h2>{process.env.REACT_APP_CARBON_KEY}</h2> */}
      <CarbonFootprintCalculator />
    </div>
  );
};

export default App;

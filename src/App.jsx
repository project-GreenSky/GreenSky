import Home from "./pages/Home";
import CarbonFootprintCalculator from './temp/CarbonFootPrintCalculator/CarbonFootPrintCalculator';
import AQIComponent from "./temp/Aqicomponent";

export default function App() {
  return (
    <>
      <AQIComponent />
      <CarbonFootprintCalculator />
      <Home />
    </>
  );
}

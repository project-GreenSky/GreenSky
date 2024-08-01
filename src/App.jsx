import Home from "./pages/Home";
import CarbonFootprintCalculator from './components/CarbonFootPrintCalculator/CarbonFootPrintCalculator';
import AQIComponent from "./components/Aqicomponent";

export default function App() {
  return (
    <>
      <AQIComponent />
      <CarbonFootprintCalculator />
      <Home />
    </>
  );
}

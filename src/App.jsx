import Home from "./pages/Home";
import CarbonFootprintCalculator from './Components/CarbonFootPrintCalculator/CarbonFootPrintCalculator.jsx';
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

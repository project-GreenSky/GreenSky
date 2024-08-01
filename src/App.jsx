import Home from "./pages/Home";
import CarbonFootprintCalculator from './components/CarbonFootPrintCalculator/CarbonFootPrintCalculator.jsx';
import AQIComponent from "./components/Aqicomponent.jsx";

export default function App() {
  return (
    <>
      <AQIComponent />
      <CarbonFootprintCalculator />
      <Home />
    </>
  );
}

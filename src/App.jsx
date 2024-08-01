import Home from "./pages/Home";
import CarbonFootprintCalculator from "./components/CarbonFootPrintCalculator/CarbonFootPrintCalculator";
import AQIComponent from "./components/Aqicomponent";
import Aqibody from "./components/AQIcomponents/Aqibody";

export default function App() {
  return (
    <>
      <Aqibody />
      <CarbonFootprintCalculator />
      <Home />
    </>
  );
}

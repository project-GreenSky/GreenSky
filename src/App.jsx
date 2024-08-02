import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CarbonFootprintCalculator from "./components/CarbonFootPrintCalculator/CarbonFootPrintCalculator";
import Aqibody from "./components/AQIcomponents/Aqibody";

export default function App() {
  return (
    <>
      <Navbar />
      <Aqibody />
      <CarbonFootprintCalculator />
      <Footer />
    </>
  );
}

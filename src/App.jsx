import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CarbonFootprintCalculator from "./components/CarbonFootPrintCalculator/CarbonFootPrintCalculator";
import Aqibody from "./components/AQIcomponents/Aqibody";
import Facts from "./components/Facts";
export default function App() {
  return (
    <>
      <Navbar />
      <Aqibody />
      <CarbonFootprintCalculator />
      <Facts />
      <Footer />
    </>
  );
}

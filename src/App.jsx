import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CarbonFootprintCalculator from "./components/CarbonFootPrintCalculator/CarbonFootPrintCalculator";
import Aqibody from "./components/AQIcomponents/Aqibody";
import Blog from "./pages/Blog";

export default function App() {
  return (
    <>
      <Navbar />
      <Blog />
      <Aqibody />
      <CarbonFootprintCalculator />
      <Facts />
      <Footer />
    </>
  );
}

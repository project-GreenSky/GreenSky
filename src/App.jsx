import { BrowserRouter, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Blog from "./pages/Blog";
import Home from "./pages/Home";
import { useState } from "react";

export default function App() {
  const [page, setPage] = useState("home");

  return (
    <BrowserRouter>
      <Navbar pageState={[page, setPage]} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />

        {/* Under development */}
        <Route path="/about" element={<InProgress />} />
        <Route path="/contact" element={<InProgress />} />
        <Route path="/services" element={<InProgress />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

function InProgress() {
  return (
    <div className="h-dvh flex items-center justify-center text-sxl">
      Coming Soon ...
    </div>
  );
}

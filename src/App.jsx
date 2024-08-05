import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Blog from "./pages/Blog";
import Home from "./pages/Home";
import ContactUs from "./pages/ContactUs";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import notfound from "./assets/not-found.svg";
import AboutUs from "./components/About/About";

export default function App() {
  const [page, setPage] = useState("home");
  return (
    <BrowserRouter basename={import.meta.env.VITE_REPO}>
      <Navbar pageState={[page, setPage]} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/about" element={<AboutUs />} />

        {/* Under development */}
        <Route path="/services" element={<InProgress />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

function InProgress() {
  return (
    <div className="h-dvh flex items-center justify-center text-2xl font-bold">
      Coming Soon ...
    </div>
  );
}

function PageNotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-dvh gap-5 p-10">
      <img src={notfound} alt="404" />
      <p className="text-2xl">PAGE NOT FOUND</p>
    </div>
  );
}

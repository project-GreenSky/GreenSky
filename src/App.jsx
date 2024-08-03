import { BrowserRouter, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Blog from "./pages/Blog";
import Home from "./pages/Home";
import { useState } from "react";

import notfound from "./assets/not-found.svg";

export default function App() {
  const [page, setPage] = useState("home");
  return (
    <BrowserRouter basename={import.meta.env.VITE_REPO}>
      <Navbar pageState={[page, setPage]} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />

        {/* Under development */}
        <Route path="/about" element={<InProgress />} />
        <Route path="/contact" element={<InProgress />} />
        <Route path="/services" element={<InProgress />} />
        <Route path="*" element={<PageNotFound />} />
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

function PageNotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-dvh gap-5 p-10">
      <img src={notfound} alt="404" />
      <p className="text-2xl">PAGE NOT FOUND</p>
    </div>
  );
}

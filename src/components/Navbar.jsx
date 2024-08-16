import React, { useState } from "react";
import icon from "../assets/icon.png";
import { FaBars, FaX } from "react-icons/fa6";
import { Link } from "react-router-dom";
import clsx from "clsx";

export default function Navbar({ pageState }) {
  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = pageState;

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white border-gray-200 bg-gradient-to-b from-[#000] to-[#333] ">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          to="/"
          onClick={() => setPage("home")}
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img src={icon} alt="icon" className="w-8 h-8" />
          <p className="text-2xl text-green-500 font-bold font-Playwrite">
            GreenSky
          </p>
        </Link>
        <button
          onClick={toggleMenu}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded={isOpen ? "true" : "false"}
        >
          <span className="sr-only">Open main menu</span>
          {isOpen ? (
            <FaX className="w-4 h-4" />
          ) : (
            <FaBars className="w-4 h-4" />
          )}
        </button>
        <div
          className={`w-full md:block md:w-auto ${isOpen ? "block" : "hidden"}`}
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0">
            <li>
              <Link
                to="/"
                className={clsx(
                  "block py-2 px-3 text-white rounded md:bg-transparent md:p-0 duration-300",
                  "hover:bg-opacity-10 md:hover:bg-transparent md:border-0 md:hover:text-green-500",
                  page === "home" && "bg-green-700 md:text-green-500"
                )}
                onClick={() => setPage("home")}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className={clsx(
                  "block py-2 px-3 text-white rounded md:bg-transparent md:p-0 duration-300",
                  "hover:bg-opacity-10 md:hover:bg-transparent md:border-0 md:hover:text-green-500",
                  page === "about" && "bg-green-700 md:text-green-500"
                )}
                onClick={() => setPage("about")}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/services"
                className={clsx(
                  "block py-2 px-3 text-white rounded md:bg-transparent md:p-0 duration-300",
                  "hover:bg-opacity-10 md:hover:bg-transparent md:border-0 md:hover:text-green-500",
                  page === "services" && "bg-green-700 md:text-green-500"
                )}
                onClick={() => setPage("services")}
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                to="/blog"
                className={clsx(
                  "block py-2 px-3 text-white rounded md:bg-transparent md:p-0 duration-300",
                  "hover:bg-opacity-10 md:hover:bg-transparent md:border-0 md:hover:text-green-500",
                  page === "blog" && "bg-green-700 md:text-green-500"
                )}
                onClick={() => setPage("blog")}
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className={clsx(
                  "block py-2 px-3 text-white rounded md:bg-transparent md:p-0 duration-300",
                  "hover:bg-opacity-10 md:hover:bg-transparent md:border-0 md:hover:text-green-500",
                  page === "contact" && "bg-green-700 md:text-green-500"
                )}
                onClick={() => setPage("contact")}
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

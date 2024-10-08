import {
  FaEnvelope,
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa6";
import icon from "../assets/icon.png";
import { Link } from "react-router-dom";

export default function Footer({ pageState }) {
  const [page, setPage] = pageState;

  return (
    <footer className="bg-base-300 text-neutral-400">
      <div className="w-full justify-between flex-wrap flex p-4 my-4 md:w-10/12 mx-auto gap-4">
        <Link
          to="/"
          href=""
          className="flex gap-3 items-center"
          onClick={() => setPage("home")}
        >
          <img src={icon} alt="icon" className="w-8 h-8" />
          <p className="text-2xl text-green-500 font-bold font-Playwrite">
            GreenSky
          </p>
        </Link>
        <div className="flex flex-wrap grow justify-evenly gap-5">
          <div>
            <div className=" w-fit text-neutral-300 border-b-2 mb-2 font-medium border-green-500 pr-5">
              GreenSky
            </div>
            <ul className="flex flex-row gap-3 md:flex-col md:gap-0">
              <li>
                <Link to="/" onClick={()=>setPage("home")} className="hover:text-neutral-200 duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  onClick={()=>setPage("about")}
                  className="hover:text-neutral-200 duration-300"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  onClick={()=>setPage("contact")}
                  className="hover:text-neutral-200 duration-300"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <div className=" w-fit text-neutral-300 border-b-2 mb-2 font-medium border-green-500 pr-5">
              More
            </div>
            <ul className="flex flex-row gap-3 md:flex-col md:gap-0">
              <li>
                <Link
                  to="/blog"
                  onClick={()=>setPage("blog")}
                  className="hover:text-neutral-200 duration-300"
                >
                  Blogs
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  onClick={()=>setPage("services")}
                  className="hover:text-neutral-200 duration-300"
                >
                  Services
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col items-start gap-5">
          <div>
            <div className=" w-fit text-neutral-300 border-b-2 mb-2 font-medium border-green-500 pr-5">
              Newsletter
            </div>
            <div className="flex gap-2">
              <label className="input rounded input-sm input-bordered flex items-center gap-2">
                <FaEnvelope />
                <input
                  type="text"
                  className="grow"
                  placeholder="john.doe@xyz.com"
                />
              </label>
              <button className="btn btn-sm bg-green-500 rounded hover:bg-green-600 text-black">
                subscribe
              </button>
            </div>
          </div>
          <div>
            <div className="w-fit text-neutral-300 border-b-2 mb-2 font-medium border-green-500 pr-5">
              Follow Us
            </div>
            <div className="flex gap-2">
              <a
                href=""
                className="rounded-full text-xl hover:bg-white/15 hover:text-gray-200 duration-200 p-1"
              >
                <FaFacebook />
              </a>
              <a
                href=""
                className="rounded-full text-xl hover:bg-white/15 hover:text-gray-200 duration-200 p-1"
              >
                <FaInstagram />
              </a>
              <a
                href=""
                className="rounded-full text-xl hover:bg-white/15 hover:text-gray-200 duration-200 p-1"
              >
                <FaTwitter />
              </a>
              <a
                href=""
                className="rounded-full text-xl hover:bg-white/15 hover:text-gray-200 duration-200 p-1"
              >
                <FaGithub />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-base-100">
        <div className="flex flex-col md:flex-row gap-2 w-full py-4 md:w-10/12 mx-auto justify-between items-center">
          <div className="flex gap-4">
            <a href="" className="hover:text-neutral-200 duration-300">
              Terms &amp; Conditions
            </a>
            <a href="" className="hover:text-neutral-200 duration-300">
              Privacy Policy
            </a>
            <a href="" className="hover:text-neutral-200 duration-300">
              Cookies
            </a>
          </div>
          <p className="text-xs">
            &copy; GreenSky {new Date().getFullYear()} All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
}

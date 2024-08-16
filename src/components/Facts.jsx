// Facts.js
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { facts } from "@/lib/utils";
import clsx from "clsx";
import { motion, useInView } from 'framer-motion';

const AnimatedSection = ({ children, className }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      {children}
    </motion.section>
  );
};

function NextArrow(props) {
  const { className, onClick } = props;
  return <div className={clsx(className, "hidden md:block")} onClick={onClick} />;
}

function PrevArrow(props) {
  const { className, onClick } = props;
  return <div className={clsx(className, "hidden md:block")} onClick={onClick} />;
}

/**
 * @type {import('react-slick').Settings}
 */
const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  Arrow: true,
  autoplay: true,
  autoplaySpeed: 5000,
  cssEase: "ease-in-out",
  prevArrow: <PrevArrow />,
  nextArrow: <NextArrow />,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

function Facts() {
  return (
    <AnimatedSection className="max-w-xl h-lg mx-auto my-5">
      <Slider {...settings}>
        {facts.map((fact, index) => (
          <div key={index} className="p-4">
            <div className=" rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105">
              <img
                src={fact.img}
                alt={fact.title}
                className="w-full h-80 object-fit"
              />

              <div className="p-4 bg-gradient-to-br from-[#323232] to-[#121212]">
                <h2 className="text-xl font-bold tracking-wide">
                  {fact.title}
                </h2>
                <p className="mt-2 text-gray-400 font-semibold tracking-wide text-center">
                  {fact.description}
                </p>
                <p className="mt-4 text-gray-500 font-bold tracking-wide text-center">
                  Source : {fact.name}
                </p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </AnimatedSection>
  );
}

export default Facts;

// Facts.js
import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { facts } from "@/lib/utils";


function Facts() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    Arrow: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
    <div className="max-w-xl h-lg mx-auto mt-32 ">
      <Slider {...settings}>
        {facts.map((fact, index) => (
          <div key={index} className="p-4">
            <div className="bg-slate-50 rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105">
              <img
                src={fact.img}
                alt={fact.title}
                className="w-full h-80 object-fit"
              />
              <div className="p-4">
                <h2 className="text-xl font-bold tracking-wide">{fact.title}</h2>
                <p className="mt-2 text-gray-400 font-semibold tracking-wide text-center">{fact.description}</p>
                <p className="mt-4 text-gray-500 font-bold tracking-wide text-center">Source : {fact.name}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default Facts;

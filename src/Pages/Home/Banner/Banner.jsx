import React from 'react';

import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';

const Banner = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    cssEase: 'linear',
    autoplay: true,
    autoplaySpeed: 3000,
    fade: true,
    pauseOnDotsHover: true,
  };
  return (
    <Slider {...settings}>
      <div className="relative">
        <img
          className="w-screen h-[80vh] object-cover"
          src="https://i.ibb.co/HGZm4jd/mclaren-765lt.jpg"
          alt=""
        />
        <div className="absolute bottom-16 left-[10%] py-6 px-4 bg-gray-100 dark:bg-darkGray-500 rounded shadow-lg">
          <h1 className="text-3xl">Mclaren 765LT</h1>
          <p className="font-medium text-primaryBlue-500 mt-2 mb-6">
            GlobalCars
          </p>
          <Link
            to="/inventory"
            className="py-2 px-4 bg-primaryBlue-500 rounded text-white text-sm"
          >
            Manage Now!
          </Link>
        </div>
      </div>
      <div className="relative">
        <img
          className="w-screen h-[80vh] object-cover"
          src="https://i.ibb.co/VpQT4RP/audi-skysphere-slider.png"
          alt=""
        />
        <div className="absolute bottom-16 left-[10%] py-6 px-4 bg-gray-100 dark:bg-darkGray-500 rounded shadow-lg">
          <h1 className="text-3xl">Audi Skysphere</h1>
          <p className="font-medium text-primaryBlue-500 mt-2 mb-6">AudiChan</p>
          <Link
            to="/inventory"
            className="py-2 px-4 bg-primaryBlue-500 rounded text-white text-sm"
          >
            Manage Now!
          </Link>
        </div>
      </div>
    </Slider>
  );
};

export default Banner;

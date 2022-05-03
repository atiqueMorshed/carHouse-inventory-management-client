import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import React from 'react';
import { Link } from 'react-router-dom';

const Banner = () => {
  return (
    <div>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="relative">
            <img
              className="h-[80vh] w-screen object-cover"
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
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative">
            <img
              className="h-[80vh] w-screen object-cover"
              src="https://i.ibb.co/VpQT4RP/audi-skysphere-slider.png"
              alt=""
            />
            <div className="absolute bottom-16 left-[10%] py-6 px-4 bg-gray-100 dark:bg-darkGray-500 rounded shadow-lg">
              <h1 className="text-3xl">Audi Skysphere</h1>
              <p className="font-medium text-primaryBlue-500 mt-2 mb-6">
                AudiChan
              </p>
              <Link
                to="/inventory"
                className="py-2 px-4 bg-primaryBlue-500 rounded text-white text-sm"
              >
                Manage Now!
              </Link>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;

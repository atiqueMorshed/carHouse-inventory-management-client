import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetPublicData } from '../../../Hooks/useGetPublicData';
import LoadingSpinner from '../../Shared/LoadingSpinner/LoadingSpinner';
import Slide from './Slide/Slide';

const Banner = () => {
  const { isLoading, isFetching, isError, isSuccess, error, data } =
    useGetPublicData({ name: 'getSliders', url: '/api/slider' });

  if (isLoading || isFetching) {
    <LoadingSpinner />;
  }
  if (isError) {
    console.log(error);
  }

  if (isSuccess && data) {
    console.log(data);
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
          {data?.map((slide) => (
            <SwiperSlide key={slide.carId}>
              <div className="relative">
                <img
                  className="h-[80vh] w-screen object-cover"
                  src={slide.imageURL}
                  alt=""
                />
                <div className="absolute bottom-16 left-[10%] py-6 px-4 bg-gray-100 dark:bg-darkGray-500 rounded shadow-lg">
                  <h1 className="text-3xl">{slide.carName}</h1>
                  <p className="font-medium text-primaryBlue-500 mt-2 mb-6">
                    {slide?.supplier?.name}
                  </p>
                  <Link
                    to={`/inventory/${slide.carId}`}
                    className="py-2 px-4 bg-primaryBlue-500 rounded text-white text-sm"
                  >
                    Manage Now!
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
  }
};

export default Banner;

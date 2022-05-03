import React from 'react';
import { Link } from 'react-router-dom';
import { SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Slide = ({
  slide: {
    carId,
    carName,
    imageURL,
    supplier: { name },
  },
}) => {
  return (
    <SwiperSlide>
      <div className="relative">
        <img className="h-[80vh] w-screen object-cover" src={imageURL} alt="" />
        <div className="absolute bottom-16 left-[10%] py-6 px-4 bg-gray-100 dark:bg-darkGray-500 rounded shadow-lg">
          <h1 className="text-3xl">{carName}</h1>
          <p className="font-medium text-primaryBlue-500 mt-2 mb-6">{name}</p>
          <Link
            to={`/inventory/${carId}`}
            className="py-2 px-4 bg-primaryBlue-500 rounded text-white text-sm"
          >
            Manage Now!
          </Link>
        </div>
      </div>
    </SwiperSlide>
  );
};

export default Slide;

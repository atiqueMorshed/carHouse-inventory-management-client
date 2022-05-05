import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import React from 'react';
import { useGetPublicData } from '../../../Hooks/useGetPublicData';
import LoadingSpinner from '../../Shared/LoadingSpinner/LoadingSpinner';
import CustomLinkButton from '../../Shared/CustonLinkButton/CustomLinkButton';
import { Link } from 'react-router-dom';

const Banner = () => {
  const { isLoading, isFetching, isError, isSuccess, error, data } =
    useGetPublicData({ name: 'getSliders', url: '/api/slider' });

  if (isLoading || isFetching) {
    return <LoadingSpinner />;
  }
  if (isError) {
    return (
      <div className="flex flex-col justify-center items-center gap-4 h-[40vh] text-center border-b">
        <h1 className="text-3xl text-primaryBlue-500">
          Error fetching slider information
        </h1>
        <pre className="text-primaryBlue-500">{error?.message}</pre>
      </div>
    );
  }

  if (isSuccess && data) {
    if (data?.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center text-white bg-[url('https://i.ibb.co/nQ9nSj1/audi-r8.jpg')] h-[70vh]">
          <h1 className="text-2xl md:text-5xl text-center">
            No car added to slider.
          </h1>
          <div className="text-center text-2xl mt-8">
            <Link className="underline hover:text-primaryBlue-400" to="/addCar">
              Add Now
            </Link>
          </div>
        </div>
      );
    }
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
          {data?.map(({ carId, imageURL, carName, supplier: { name } }) => (
            <SwiperSlide key={carId}>
              <div className="relative">
                <img
                  className="h-[80vh] w-screen object-cover"
                  src={imageURL}
                  alt=""
                />
                <div className="absolute bottom-16 left-[4%] max-w-[250px] py-6 px-4 bg-gray-100 dark:bg-darkGray-500 rounded shadow-lg">
                  <h1 className="text-3xl">{carName}</h1>
                  <p className="font-medium text-primaryBlue-500 mt-2 mb-6">
                    {name}
                  </p>
                  <CustomLinkButton to={`/inventory/${carId}`}>
                    Manage Now!
                  </CustomLinkButton>
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

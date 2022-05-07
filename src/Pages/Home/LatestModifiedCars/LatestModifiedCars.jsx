import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Navigation, Pagination } from 'swiper';
import { useGetPublicData } from '../../../Hooks/useGetPublicData';
import LoadingSpinner from '../../Shared/LoadingSpinner/LoadingSpinner';
import { Link } from 'react-router-dom';

const LatestModifiedCars = () => {
  const {
    isError,
    isLoading,
    isFetching,
    isRefetching,
    error,
    isSuccess,
    data,
  } = useGetPublicData({
    name: 'getLatestModifiedCars',
    url: '/api/latestCars',
  });
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  if (isLoading || isFetching || isRefetching) {
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
    console.log(data);
    if (data?.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center text-white bg-[url('https://i.ibb.co/nQ9nSj1/audi-r8.jpg')] h-[70vh]">
          <h1 className="text-2xl md:text-5xl text-center">No car found.</h1>
          <div className="text-center text-2xl mt-8">
            <Link className="underline hover:text-primaryBlue-400" to="/addCar">
              Add Now
            </Link>
          </div>
        </div>
      );
    }
    return (
      <div className="mt-32">
        <h1 className="text-4xl text-center mb-14">Latest Modified Cars</h1>
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          loop={true}
          loopFillGroupWithBlank={true}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="mySwiper"
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 1,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
          }}
        >
          {data?.map(({ imageURL, carName, _id, lastModified }) => {
            const date = new Date(lastModified);
            return (
              <SwiperSlide key={_id}>
                <Link to={`/inventory/${_id}`}>
                  <div className="relative mb-8 group cursor-pointer">
                    <img className="w-full" src={imageURL} alt="" />
                    <div className="absolute bottom-0 left-0 w-full h-full bg-opacity-0 bg-darkGray-500 group-hover:bg-opacity-80 group-hover:transition-all group-hover:duration-300">
                      <h1 className="absolute py-1 px-2 bottom-0 bg-darkGray-500 bg-opacity-80 group-hover:hidden">
                        {carName}
                      </h1>
                      <div className="hidden group-hover:flex flex-col gap-1 justify-center items-center h-full group-hover:transition-all group-hover:duration-300">
                        <h1 className="text-xl font-bold">{carName}</h1>
                        <p>
                          {date.getHours()}:{date.getMinutes()} |{' '}
                          {date.getDay()} {months[date.getMonth()]}{' '}
                          {date.getFullYear()}
                        </p>
                        <p></p>
                      </div>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    );
  }
};

export default LatestModifiedCars;

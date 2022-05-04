import React from 'react';
import { useGetPublicData } from '../../../Hooks/useGetPublicData';
import LoadingSpinner from '../../Shared/LoadingSpinner/LoadingSpinner';
import CarCard from './CarCard';

const CarShowcase = () => {
  const { isLoading, isFetching, isError, isSuccess, error, data } =
    useGetPublicData({ name: 'getCarShowcase', url: '/api/carShowcase' });

  if (isLoading || isFetching) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return (
      <div className="flex flex-col justify-center items-center gap-4 h-[40vh] text-center border-b">
        <h1 className="text-3xl text-primaryBlue-500">
          Error fetching Car Showcase items
        </h1>
        <pre className="text-primaryBlue-500">{error?.message}</pre>
      </div>
    );
  }

  if (isSuccess && data) {
    console.log(data);
    return (
      <div className="mt-36">
        <h1 className="text-4xl text-center mb-14">Car Showcase</h1>
        <div className="grid lg:grid-cols-2 gap-1">
          {data?.map((car, index) => (
            <CarCard
              key={car._id}
              car={car}
              isWide={index === 0 || index === data.length - 1 ? true : false}
            />
          ))}
        </div>
      </div>
    );
  }
};

export default CarShowcase;

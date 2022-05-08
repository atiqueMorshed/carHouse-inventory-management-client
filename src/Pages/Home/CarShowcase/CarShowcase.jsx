import React from 'react';
import { Link } from 'react-router-dom';
import { useGetPublicData } from '../../../Hooks/useGetPublicData';
import CustomLinkButton from '../../Shared/CustonLinkButton/CustomLinkButton';
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
    if (data?.length === 0) {
      return (
        <div className="my-36 flex flex-col items-center">
          <h1 className="text-2xl md:text-4xl text-center mb-14">
            Car Showcase
          </h1>
          <div className="text-center text-gray-600">
            No car is available.{' '}
            <Link
              className="underline text-gray-500 hover:text-primaryBlue-500"
              to="/addCar"
            >
              Add Now
            </Link>
          </div>

          <CustomLinkButton
            to="/manageInventories"
            extraClassName="mt-20 py-4 px-8 text-lg"
          >
            Manage Inventories
          </CustomLinkButton>
        </div>
      );
    }
    return (
      <div className="mt-36 flex flex-col items-center">
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

        <CustomLinkButton
          to="/manageInventories"
          extraClassName="mt-20 py-4 px-8 text-lg"
        >
          Manage Inventories
        </CustomLinkButton>
      </div>
    );
  }
};

export default CarShowcase;

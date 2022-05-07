import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetDataById } from '../../Hooks/useGetDataById';
import LoadingSpinner from '../Shared/LoadingSpinner/LoadingSpinner';
import DeliverCar from './DeliverCar';
import RestockCar from './RestockCar';

import CustomLinkButton from '../Shared/CustonLinkButton/CustomLinkButton';

const InventoryCar = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  if (!id) {
    navigate('/', { replace: true });
  }

  const {
    isLoading,
    isFetching,
    isRefetching,
    isError,
    isSuccess,
    error,
    data,
    refetch,
  } = useGetDataById({
    name: 'getInventoryCarById',
    id,
    url: '/api/inventory',
  });

  if (isLoading || isFetching || isRefetching) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return (
      <div className="min-h-[calc(100vh-320px)] flex flex-col gap-8 justify-center items-center text-primaryBlue-500">
        <div className="flex flex-col justify-center gap-8 items-center mb-10">
          <h1 className="text-4xl text-center">Manage Inventories</h1>
          <CustomLinkButton to="/addCar">Add New Car</CustomLinkButton>
        </div>
        <pre>{error?.message}</pre>
      </div>
    );
  }

  if (isSuccess && data) {
    const {
      _id,
      carName,
      imageURL,
      description,
      isSlider,
      lastModified,
      price,
      quantity,
      sold,
      supplier: { name },
    } = data;
    return (
      <div className="min-h-[calc(100vh-320px)] mt-36">
        <div className="flex flex-col justify-center gap-8 items-center mb-10">
          <h1 className="text-4xl text-center">Inventory Car</h1>
          <CustomLinkButton to="/manageInventories">
            Manage Inventories
          </CustomLinkButton>
        </div>
        <div className="relative flex flex-col lg:flex-row justify-center items-center gap-4">
          <img
            className="min-h-[420px] lg:w-1/2 rounded object-cover"
            src={imageURL}
            alt="Inventory Car"
          />
          <div className="absolute top-5 left-5 py-2 px-4 rounded-full text-sm text-white bg-primaryBlue-500 border border-white bg-opacity-30 pointer-events-none">
            {isSlider ? 'Also in slider' : 'Not in slider'}
          </div>
          <div className="w-11/12 lg:w-1/2">
            <h1 className="text-5xl">{carName}</h1>
            <p className="text-3xl font-semibold pt-4">${price}</p>
            <div className="flex gap-12">
              <p className="pt-4">
                <span className="text-3xl font-medium">{quantity}</span>
                <span className="ml-2 text-primaryBlue-500 font-bold">
                  in stock.
                </span>
              </p>
              <p className="pt-5">
                <span className="text-3xl font-medium">{sold}</span>
                <span className="ml-2 text-primaryBlue-500 font-bold">
                  {' '}
                  sold.
                </span>
              </p>
            </div>
            <p className="text-xl mt-5">{description}</p>
            <p className="pt-5">
              Supplier: <span className="font-bold pl-3">{name}</span>
            </p>
            <p className="mt-5">
              Last Modified:{' '}
              <span className="font-bold pl-3">
                {lastModified.split('T')[0] || lastModified}
              </span>
            </p>
            <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-start mt-8">
              <DeliverCar id={_id} refetch={refetch} />
              <RestockCar id={_id} refetch={refetch} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <div className="min-h-[calc(100vh-320px)]"></div>;
};

export default InventoryCar;

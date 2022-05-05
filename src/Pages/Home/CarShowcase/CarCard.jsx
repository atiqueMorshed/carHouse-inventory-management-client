import React from 'react';
import { Link } from 'react-router-dom';
import CustomLinkButton from '../../Shared/CustonLinkButton/CustomLinkButton';

const CarCard = ({
  car: {
    _id,
    carName,
    imageURL,
    description,
    price,
    quantity,
    supplier: { name },
  },
  isWide,
}) => {
  if (isWide) {
    return (
      <div className="lg:col-span-2 h-[500px] relative overflow-hidden text-white">
        <img
          className="w-screen h-full object-cover hover:scale-105 hover:opacity-95 transition-all duration-500"
          src={imageURL}
          alt="Car Card"
        />
        <div className="absolute bottom-[10%] left-[7%] md:bottom-16 md:left-[10%] py-8 px-4 bg-darkGray-500 bg-opacity-70 rounded shadow-lg">
          <h1 className="text-4xl">{carName}</h1>
          <div className="flex gap-3 pt-4 text-xl">
            <p className="font-bold">${price},</p>
            <p className="pl-2">{quantity} in stock.</p>
          </div>
          <p className="truncate w-[200px] md:w-[400px] pt-4">{description}</p>

          <p className="pt-4 pb-8">Supplier: {name}</p>

          <Link
            to={`/inventory/${_id}`}
            className="py-3 px-6 bg-primaryBlue-500 rounded text-white text-sm hover:bg-primaryBlue-600 transition-all duration-150"
          >
            Manage Now!
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[500px] relative overflow-hidden text-white">
      <img
        className="w-screen h-full object-cover hover:scale-105 hover:opacity-95 transition-all duration-500"
        src={imageURL}
        alt="Car Card"
      />
      <div className="absolute bottom-[10%] left-[3%] md:bottom-16 md:left-[10%] py-8 px-4 bg-darkGray-500 bg-opacity-70 rounded shadow-lg">
        <h1 className="text-4xl">{carName}</h1>
        <div className="flex gap-3 pt-4 text-xl">
          <p className="font-bold">${price},</p>
          <p className="pl-2">{quantity} in stock.</p>
        </div>
        <p className="truncate w-[200px] md:w-[400px] pt-4">{description}</p>

        <p className="pt-4 pb-8">Supplier: {name}</p>
        <CustomLinkButton to={`/inventory/${_id}`}>
          Manage Now!
        </CustomLinkButton>
      </div>
    </div>
  );
};

export default CarCard;

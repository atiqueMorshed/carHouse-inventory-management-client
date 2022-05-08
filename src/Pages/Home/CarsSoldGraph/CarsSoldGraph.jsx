import React from 'react';
import { Link } from 'react-router-dom';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

import { useGetPublicData } from '../../../Hooks/useGetPublicData';
import LoadingSpinner from '../../Shared/LoadingSpinner/LoadingSpinner';

const CarsSoldGraph = () => {
  const {
    isError,
    isLoading,
    isFetching,
    isRefetching,
    error,
    isSuccess,
    data,
  } = useGetPublicData({
    name: 'getCarNameSoldData',
    url: '/api/getCarNameSold',
  });

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  if (isLoading || isFetching || isRefetching) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return (
      <div className="flex flex-col justify-center items-center gap-4 h-[40vh] text-center border-b">
        <h1 className="text-3xl text-primaryBlue-500">
          Error fetching graph information
        </h1>
        <pre className="text-primaryBlue-500">{error?.message}</pre>
      </div>
    );
  }

  if (isSuccess && data) {
    if (data?.length === 0) {
      return (
        <div className="my-32 flex flex-col items-center justify-center text-white">
          <h1 className="text-2xl md:text-4xl text-center mb-8">
            Car Sales Information
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
        </div>
      );
    }

    const options = {
      responsive: true,
      indexAxis: 'y',
      elements: {
        bar: {
          borderWidth: 2,
        },
      },
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: false,
          text: 'Total sold cars',
        },
      },
    };

    let labels = [];
    let soldCars = [];

    data?.forEach(({ carName, sold }) => {
      labels.push(carName);
      soldCars.push(sold);
    });

    const structuredData = {
      labels,
      datasets: [
        {
          label: 'Cars Sold',
          data: soldCars,
          backgroundColor: '#205375',
        },
      ],
    };

    return (
      <div className="mt-32">
        <h1 className="text-4xl text-center mb-14">Car sales information</h1>
        {/* <p className="text-xs text-center mb-2">
          hover for more information. Click to go to inventory details
        </p> */}
        <div className="overflow-auto">
          <div className="w-11/12 max-w-[1200px] min-w-[500px] mx-auto">
            <Bar options={options} data={structuredData} />
          </div>
        </div>
      </div>
    );
  }
};

export default CarsSoldGraph;

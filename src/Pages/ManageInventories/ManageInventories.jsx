import React from 'react';
import { Link } from 'react-router-dom';
import { useGetProtedtedData } from '../../Hooks/useGetProtectedData';
import LoadingSpinner from '../Shared/LoadingSpinner/LoadingSpinner';
import Title from '../Shared/Title/Title';
import CarTuple from './CarTuple';

const ManageInventories = () => {
  const {
    isLoading,
    isFetching,
    isRefetching,
    isError,
    isSuccess,
    refetch,
    error,
    data,
  } = useGetProtedtedData({
    name: 'getInventoriesData',
    url: '/api/inventory',
  });

  if (isLoading || isFetching || isRefetching) {
    return <LoadingSpinner />;
  }
  if (isError) {
    return (
      <div className="my-32 min-h-[calc(100vh-360px)] flex flex-col gap-8 justify-center items-center">
        <h1 className="text-4xl text-center">Manage Inventories</h1>
        <p>Error Fetching inventories</p>
        <pre>{error?.message}</pre>
        <button className="py-2 px-4 rounded border" onClick={() => refetch()}>
          Retry fetching
        </button>
      </div>
    );
  }
  if (isSuccess && data) {
    if (data?.length === 0) {
      return (
        <div className="mt-36 flex flex-col items-center min-h-[calc(100vh-700px)]">
          <h1 className="text-4xl text-center mb-14">Car Showcase</h1>
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
    return (
      <>
        <Title title="Manage Inventories" />

        <div className="my-32 min-h-[calc(100vh-360px)]">
          <h1 className="text-4xl text-center mb-20">Manage Inventories</h1>
          <p className="text-xs text-center md:hidden mb-3">
            scroll left and right to see all columns
          </p>
          <div className="max-w-[1300px] mx-auto shadow-lg overflow-x-auto dark:bg-darkGray-600 rounded">
            <table className="table-auto w-full text-sm text-left pointer-events-none">
              <thead className="uppercase text-xs text-gray-500 dark:text-gray-400 bg-[#F9FAFB] dark:bg-[#374151]">
                <tr>
                  <th className="th-1">Car Name</th>
                  <th className="th-1">Quantity</th>
                  <th className="th-1">Price</th>
                  <th className="th-1">Sold</th>
                  <th className="th-1">Supplier Name</th>
                  <th className="th-1">Delete</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((car) => (
                  <CarTuple key={car._id} car={car} refetch={refetch} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <Title title="Manage Inventories" />

      <div className="my-32 min-h-[calc(100vh-360px)] flx flex-col gap-8 justify-center items-center">
        <h1 className="text-4xl text-center">Manage Inventories</h1>
        <h1 className="text-2xl text-center">No cars found!</h1>
      </div>
    </>
  );
};

export default ManageInventories;

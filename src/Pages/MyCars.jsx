import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../firebase.init';
import LoadingSpinner from './Shared/LoadingSpinner/LoadingSpinner';
import { useGetProtedtedData } from '../Hooks/useGetProtectedData';
import CarTuple from './Shared/CarTuple/CarTuple';

const MyCars = () => {
  const toastGetInventoryError = useRef(null);
  const toastUserError = useRef(null);

  const [user, loading, userError] = useAuthState(auth);

  if (userError?.message) {
    if (!toast.isActive(toastUserError.current)) {
      toastUserError.current = toast.error(userError?.message, {
        containerId: 'AutoCloseEnabled',
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

  const onError = (error) => {
    if (!toast.isActive(toastGetInventoryError.current)) {
      toastGetInventoryError.current = toast.error(error?.message, {
        containerId: 'AutoCloseEnabled',
        pauseOnFocusLoss: false,
        autoClose: 5000,
        progress: undefined,
      });
    }
  };

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
    name: 'getUserInventoriesData',
    url: `/api/userInventory?uid=${user?.uid}`,
    onError,
    isEnabled: false,
  });

  useEffect(() => {
    if (user?.uid) {
      refetch();
    }
  }, [user, refetch]);

  if (isLoading || isFetching || isRefetching || loading) {
    return <LoadingSpinner />;
  }
  if (isError) {
    return (
      <div className="my-32 min-h-[calc(100vh-360px)] flex flex-col gap-8 justify-center items-center">
        <div className="flex flex-col justify-center gap-8 items-center mb-10">
          <h1 className="text-4xl text-center">My Cars</h1>
        </div>
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
          <h1 className="text-4xl text-center mb-14">My Cars</h1>
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
        <div className="my-32 min-h-[calc(100vh-360px)]">
          <div className="flex flex-col justify-center gap-8 items-center mb-10">
            <h1 className="text-4xl text-center">My Cars</h1>
          </div>
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
      {/* <Title title="My Cars" /> */}

      <div className="my-32 min-h-[calc(100vh-360px)] flx flex-col gap-8 justify-center items-center">
        <h1 className="text-4xl text-center">My Cars</h1>
        <h1 className="text-2xl text-center">No cars found!</h1>
      </div>
    </>
  );
};

export default MyCars;

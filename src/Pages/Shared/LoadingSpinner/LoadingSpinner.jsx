import React from 'react';
import spinner from './spinner.svg';

const LoadingSpinner = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <img src={spinner} alt="Loading Spinner" />
    </div>
  );
};

export default LoadingSpinner;

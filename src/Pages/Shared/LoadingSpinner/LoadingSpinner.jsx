import React from 'react';
import spinner from './spinner.svg';

const LoadingSpinner = ({ notFullHeight }) => {
  return (
    <div
      className={`h-screen flex justify-center items-center ${
        notFullHeight ? 'h-auto' : ''
      }`}
    >
      <img src={spinner} alt="Loading Spinner" />
    </div>
  );
};

export default LoadingSpinner;

import React from 'react';

const NotFound = () => {
  return (
    <div className="flex justify-center items-center h-[calc(100vh-73px)] dark:bg-darkGray-500">
      <h1 className="text-primaryBlue-500 text-2xl flex items-center">
        <span className="text-3xl pr-1 border-r border-primaryBlue-500 mr-1">
          404
        </span>{' '}
        NOT FOUND
      </h1>
    </div>
  );
};

export default NotFound;

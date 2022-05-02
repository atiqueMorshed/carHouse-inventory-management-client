import React from 'react';

const ErrorMessage = ({ error }) => {
  return (
    <p className="pl-2 mt-1 text-red-600 dark:text-red-500 text-sm w-[200px]">
      {error}
    </p>
  );
};

export default ErrorMessage;

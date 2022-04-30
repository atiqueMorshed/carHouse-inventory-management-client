import React from 'react';

const ErrorMessage = ({ err }) => {
  return <p className="mt-1 text-red-500 text-sm">{err}</p>;
};

export default ErrorMessage;

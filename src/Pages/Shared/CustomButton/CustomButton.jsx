import React from 'react';

const CustomSubmitButton = ({ children }) => {
  return (
    <button className="button-style-1" type="submit">
      {children}
    </button>
  );
};

export default CustomSubmitButton;

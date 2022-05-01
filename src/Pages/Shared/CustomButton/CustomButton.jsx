import React from 'react';

const CustomSubmitButton = ({ setBottomM, children }) => {
  return (
    <button
      className={`button-style-1 ${setBottomM ? 'mb-8' : ''}`}
      type="submit"
    >
      {children}
    </button>
  );
};

export default CustomSubmitButton;

import React from 'react';
import { Link } from 'react-router-dom';

const CustomLinkButton = ({ to, children, extraClassName }) => {
  return (
    <Link
      to={to}
      className={`py-2 px-4 bg-primaryBlue-500 rounded text-white text-sm hover:bg-primaryBlue-600 transition-all duration-150 ${
        extraClassName ? extraClassName : ''
      }`}
    >
      {children}
    </Link>
  );
};

export default CustomLinkButton;

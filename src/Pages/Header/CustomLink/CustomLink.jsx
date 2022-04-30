import React from 'react';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';

const CustomLink = ({ children, to, ...props }) => {
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname, end: true });

  return (
    <Link
      className={`${
        match ? 'shadow-lg bg-primaryBlue-500 rounded-md text-white' : ''
      } flex justify-center items-center gap-2 py-3 my-1 px-3`}
      to={to}
    >
      {children}
    </Link>
  );
};

export default CustomLink;

import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MenuItems from '../MenuItems/MenuItems';

const Header = () => {
  const [toggleMenu, setToggleMenu] = useState();
  return (
    <div className="border-b dark:border-primaryBlue-500">
      <div className="flex justify-between items-center pt-6 pb-4 lg:py-2 w-11/12 mx-auto">
        <h1 className="text-lg font-extrabold dark:text-primaryBlue-500">
          <Link to="/">CarHouse</Link>
        </h1>

        <FontAwesomeIcon
          className="w-6 h-6 lg:hidden"
          icon={faBars}
          onClick={() => setToggleMenu((prev) => !prev)}
        />
        <div className="hidden lg:block">
          <MenuItems />
        </div>
      </div>
      {toggleMenu && (
        <div className="border-t dark:border-primaryBlue-500 pt-4 lg:hidden">
          <MenuItems />
        </div>
      )}
    </div>
  );
};

export default Header;

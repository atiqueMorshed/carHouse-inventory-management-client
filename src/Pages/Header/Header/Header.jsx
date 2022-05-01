import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import auth from '../../../firebase.init';
import LoadingSpinner from '../../Shared/LoadingSpinner/LoadingSpinner';
import MenuItems from '../MenuItems/MenuItems';

const Header = () => {
  const [toggleMenu, setToggleMenu] = useState();
  const [user, loading, error] = useAuthState(auth);

  return loading ? (
    <LoadingSpinner />
  ) : (
    <div className="border-b dark:border-primaryBlue-500">
      <div className="flex justify-between items-center pt-6 pb-4 lg:py-2 w-11/12 mx-auto">
        <h1 className="text-2xl font-extrabold dark:text-primaryBlue-400">
          <Link to="/">CarHouse</Link>
        </h1>

        <FontAwesomeIcon
          className="w-6 h-6 lg:hidden"
          icon={faBars}
          onClick={() => setToggleMenu((prev) => !prev)}
        />
        <div className="hidden lg:block">
          <MenuItems user={user} />
        </div>
      </div>
      {toggleMenu && (
        <div className="border-t dark:border-primaryBlue-500 pt-4 lg:hidden">
          <MenuItems user={user} />
        </div>
      )}
    </div>
  );
};

export default Header;

import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  useAuthState,
  useSendEmailVerification,
} from 'react-firebase-hooks/auth';
import { ToastContainer, toast } from 'react-toastify';
import auth from '../../../firebase.init';

import LoadingSpinner from '../../Shared/LoadingSpinner/LoadingSpinner';
import MenuItems from '../MenuItems/MenuItems';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import 'react-toastify/dist/ReactToastify.css';

const Header = () => {
  const toastEmailNotVerified = useRef(null);
  const toastVerificationSendingError = useRef(null);

  const [toggleMenu, setToggleMenu] = useState();
  const [user, loading, error] = useAuthState(auth);
  const [sendEmailVerification, sending, sendingError] =
    useSendEmailVerification(auth);

  // Shows toast if resend verification email is successful.
  const verificationSent = () => {
    toast.update(toastEmailNotVerified.current, {
      render: (
        <div className="flex justify-center items-center gap-2 text-red-500">
          Email not verified.{' '}
          <div className="text-primaryBlue-500">Sending...</div>
        </div>
      ),
      type: toast.TYPE.INFO,
      autoClose: 5000,
      hideProgressBar: false,
      progress: undefined,
    });
  };

  // Shows unique and one toast if logged in but email is not verified.
  if (user && !user?.emailVerified) {
    if (!toast.isActive(toastEmailNotVerified.current)) {
      toastEmailNotVerified.current = toast.warn(
        <div className="flex justify-center items-center gap-2 text-red-500">
          Email not verified.{' '}
          <div
            onClick={() =>
              sendEmailVerification().then(() => verificationSent())
            }
            className="underline cursor-pointer hover:text-red-700"
          >
            Resend email
          </div>
        </div>,
        {
          position: 'top-right',
          autoClose: false,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    }
  }

  if (sendingError?.message) {
    if (!toast.isActive(toastVerificationSendingError.current)) {
      toastVerificationSendingError.current = toast.error(
        sendingError.message,
        {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    }
  }

  if (error?.message) {
    toast.update(toastEmailNotVerified, {
      render: error.message,
      type: toast.TYPE.INFO,
      autoClose: 5000,
    });
  }

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

      <ToastContainer
        position="top-right"
        autoClose={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
      />
    </div>
  );
};

export default Header;

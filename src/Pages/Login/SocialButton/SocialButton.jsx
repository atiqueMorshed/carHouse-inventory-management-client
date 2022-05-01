import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons';
import ErrorMessage from '../../Shared/ErrorMessage/ErrorMessage';

const SocialButton = ({ handleSignIn, provider }) => {
  return (
    <>
      <button
        onClick={() => handleSignIn()}
        className="border dark:border-gray-600 rounded py-4 px-8 hover:opacity-70 shadow"
      >
        <FontAwesomeIcon
          className="w-10 h-10 text-primaryBlue-500"
          icon={provider === 'google' ? faGoogle : faFacebook}
        />
      </button>
    </>
  );
};

export default SocialButton;

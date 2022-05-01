import React from 'react';
import { useNavigate } from 'react-router-dom';
import auth from '../../../firebase.init';
import {
  useSignInWithFacebook,
  useSignInWithGoogle,
} from 'react-firebase-hooks/auth';

import SocialButton from '../SocialButton/SocialButton';
import LoadingSpinner from '../../Shared/LoadingSpinner/LoadingSpinner';
import ErrorMessage from '../../Shared/ErrorMessage/ErrorMessage';

const SocialLogin = ({ from }) => {
  const navigate = useNavigate();

  const [signInWithFacebook, facebookUser, facebookLoading, facebookError] =
    useSignInWithFacebook(auth);

  const [signInWithGoogle, googleUser, googleLoading, googleError] =
    useSignInWithGoogle(auth);

  if (googleUser || facebookUser) {
    navigate(from, { replace: true });
  }

  return facebookLoading || googleLoading ? (
    <LoadingSpinner notFullHeight={true} />
  ) : (
    <>
      <p
        style={{ lineHeight: 0.1 }}
        className="my-8 text-center font-bold border-b border-primaryBlue-500"
      >
        <span className="bg-[#D4D7DA] dark:bg-[#13181F] p-2">OR</span>
      </p>
      <div className="flex justify-center items-center gap-4">
        <SocialButton handleSignIn={signInWithGoogle} provider="google" />

        <SocialButton handleSignIn={signInWithFacebook} />
      </div>
      <div className="w-[250px] text-center pt-2">
        {googleError?.message && (
          <ErrorMessage error={`Google: ${googleError?.message}`} />
        )}
        {facebookError?.message && (
          <ErrorMessage error={`Facebook: ${facebookError?.message}`} />
        )}
      </div>
    </>
  );
};

export default SocialLogin;

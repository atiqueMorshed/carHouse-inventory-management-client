import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import auth from '../../../firebase.init';
import {
  useSignInWithFacebook,
  useSignInWithGoogle,
} from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';
import { toast } from 'react-toastify';

import { useGetToken } from '../../../Hooks/useGetToken';
import SocialButton from '../SocialButton/SocialButton';
import LoadingSpinner from '../../Shared/LoadingSpinner/LoadingSpinner';

const SocialLogin = ({ from }) => {
  const navigate = useNavigate();

  const toastGetTokenError = useRef(null);
  const toastFacebookError = useRef(null);
  const toastGoogleError = useRef(null);

  const [user, setUser] = useState();

  const [signInWithFacebook, facebookUser, facebookLoading, facebookError] =
    useSignInWithFacebook(auth);

  const [signInWithGoogle, googleUser, googleLoading, googleError] =
    useSignInWithGoogle(auth);

  useEffect(() => {
    if (googleUser?.user?.uid)
      setUser({
        email: googleUser?.user?.email,
        uid: googleUser?.user?.uid,
      });
    else if (facebookUser?.user?.uid)
      setUser({
        email: facebookUser?.user?.email,
        uid: facebookUser?.user?.uid,
      });
  }, [googleUser, facebookUser]);

  // Error Toasts
  useEffect(() => {
    if (facebookError?.message && !toast.isActive(toastFacebookError.current)) {
      toastFacebookError.current = toast.error(facebookError.message, {
        containerId: 'AutoCloseEnabled',
        autoClose: 5000,
        progress: undefined,
      });
    }
  }, [facebookError]);

  useEffect(() => {
    if (googleError?.message && !toast.isActive(toastGoogleError.current)) {
      toastGoogleError.current = toast.error(googleError.message, {
        containerId: 'AutoCloseEnabled',
        autoClose: 5000,
        progress: undefined,
      });
    }
  }, [googleError]);

  const onSuccess = (data) => {
    if (data) navigate(from, { replace: true });
  };

  const onError = (error) => {
    if (error?.message && !toast.isActive(toastGetTokenError.current)) {
      toastGetTokenError.current = toast.error(error.message, {
        containerId: 'AutoCloseEnabled',
        autoClose: 5000,
        progress: undefined,
      });
    }
    signOut(auth);
  };

  const { isLoading, isFetching, refetch } = useGetToken({
    user,
    onSuccess,
    onError,
  });

  // Triggers the useGetToken hook to generate the jwt token
  useEffect(() => {
    if (user?.uid) {
      refetch();
    }
  }, [user, refetch]);

  return facebookLoading || googleLoading || isLoading || isFetching ? (
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
        <SocialButton
          handleSignIn={async () => await signInWithGoogle()}
          provider="google"
        />

        <SocialButton handleSignIn={async () => await signInWithFacebook()} />
      </div>
      {/* <div className="w-[250px] text-center pt-2">
        {googleError?.message && (
          <ErrorMessage error={`Google: ${googleError?.message}`} />
        )}
        {facebookError?.message && (
          <ErrorMessage error={`Facebook: ${facebookError?.message}`} />
        )}
        {error && <ErrorMessage error={error.message} />}
      </div> */}
    </>
  );
};

export default SocialLogin;

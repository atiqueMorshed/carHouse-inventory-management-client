import React, { useEffect, useRef } from 'react';
import ErrorMessage from '../../Shared/ErrorMessage/ErrorMessage';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import CustomSubmitButton from '../../Shared/CustomButton/CustomButton';
import auth from '../../../firebase.init';
import { useSendPasswordResetEmail } from 'react-firebase-hooks/auth';
import LoadingSpinner from '../../Shared/LoadingSpinner/LoadingSpinner';
import { toast } from 'react-toastify';

const ResetPassword = () => {
  const toastSuccess = useRef(null);
  const toastFailure = useRef(null);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const [sendPasswordResetEmail, sending, error] =
    useSendPasswordResetEmail(auth);

  useEffect(() => {
    reset();
  }, [isSubmitSuccessful, reset]);

  if (sending && !error) {
    if (!toast.isActive(toastSuccess.current)) {
      toastSuccess.current = toast.info('Sending verification email.', {
        containerId: 'AutoCloseEnabled',
        autoClose: 5000,
        progress: undefined,
      });
    }
  }

  useEffect(() => {
    if (error?.message) {
      toast.dismiss(toastSuccess.current);
      if (!toast.isActive(toastFailure.current)) {
        toastFailure.current = toast.error(error.message, {
          containerId: 'AutoCloseEnabled',
          autoClose: 5000,
          progress: undefined,
        });
      }
    }
  }, [error]);

  const onSubmit = async (data) => {
    const { email } = data;

    if (email) {
      try {
        await sendPasswordResetEmail(email);
      } catch (error) {
        console.log('ER');
      }
    }
  };

  return sending ? (
    <LoadingSpinner />
  ) : (
    <div className="w-full h-[calc(100vh-73px)] bg-gray-400 dark:bg-darkGray-500">
      {/* Background Image */}
      <div className='relative flex justify-center items-center w-full h-[calc(100vh-73px)] object-cover bg-[url("https://i.ibb.co/LRnRVv7/bg-login-transparent.png")] bg-cover bg-no-repeat'>
        {/* Reset Box */}
        <div className="flex justify-center items-center md:absolute left-28 top-60 bg-white dark:bg-black bg-opacity-70 dark:bg-opacity-20 w-11/12 max-w-[430px] py-10 rounded mx-auto">
          <form
            className="relative"
            onSubmit={handleSubmit(onSubmit)}
            autoComplete="off"
          >
            <h1 className="text-2xl font-bold pb-6">Login Now!</h1>

            {/* Email Field */}
            <div className="relative mb-8">
              <input
                name="email"
                type="email"
                placeholder="XXXXX"
                className="peer form-input-style-1"
                {...register('email', {
                  required: 'Required.',
                  pattern: {
                    value:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: 'Invalid',
                  },
                  validate: (val) => {
                    if (val.startsWith(' ') || val.endsWith(' ')) {
                      return 'Cannot start or end with spaces.';
                    }
                  },
                })}
              />

              <label htmlFor="email" className="form-label-style-1">
                <p>Email</p>
              </label>

              {errors?.email?.message && (
                <ErrorMessage error={errors.email.message} />
              )}
            </div>

            {/* Reset Button */}
            <CustomSubmitButton>Reset</CustomSubmitButton>
            {/* {error?.message && <ErrorMessage error={errors.message} />} */}

            {/* To Login */}
            <div className="text-sm pt-5">
              <Link
                className="flex items-center font-medium hover:underline hover:text-gray-700 hover:dark:text-gray-300 transition-all duration-150"
                to="/login"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11 17l-5-5m0 0l5-5m-5 5h12"
                  />
                </svg>

                <p>Back to login</p>
              </Link>
            </div>

            {/* To Register  */}
            <div className="text-sm my-5">
              <Link
                className="flex items-center font-medium hover:underline hover:text-gray-700 hover:dark:text-gray-300 transition-all duration-150"
                to="/register"
              >
                <p>Go to register</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;

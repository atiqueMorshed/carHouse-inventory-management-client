import React, { useEffect, useState } from 'react';
import ErrorMessage from '../../Shared/ErrorMessage/ErrorMessage';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import CustomSubmitButton from '../../Shared/CustomButton/CustomButton';
import auth from '../../../firebase.init';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import LoadingSpinner from '../../Shared/LoadingSpinner/LoadingSpinner';
const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState('');

  let from = location?.state?.from?.pathname || '/';

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const [
    signInWithEmailAndPassword,
    emailAndPasswordUser,
    emailAndPasswordLoading,
    emailAndPasswordError,
  ] = useSignInWithEmailAndPassword(auth);

  useEffect(() => {
    reset();
  }, [isSubmitSuccessful, reset]);

  const onSubmit = async (data) => {
    const { email, password } = data;

    if (email && password) {
      try {
        await signInWithEmailAndPassword(email, password);
      } catch (error) {
        setSubmitError(error?.message);
      }
    }
  };

  if (emailAndPasswordUser) {
    navigate(from, { replace: true });
  }

  return emailAndPasswordLoading ? (
    <LoadingSpinner />
  ) : (
    <div className="w-full h-[calc(100vh-73px)] bg-gray-400 dark:bg-darkGray-500">
      {/* Background Image */}
      <div className='relative flex justify-center items-center w-full h-[calc(100vh-73px)] object-cover bg-[url("https://i.ibb.co/LRnRVv7/bg-login-transparent.png")] bg-cover bg-no-repeat'>
        {/* Login Box */}
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

            {/* Password Field */}
            <div className="relative mb-8">
              <input
                name="password"
                type="password"
                placeholder="XXXXX"
                className="peer form-input-style-1"
                {...register('password', {
                  required: 'Required.',
                  minLength: {
                    value: 6,
                    message: 'Must be atleast 6 characters.',
                  },
                  maxLength: {
                    value: 16,
                    message: 'Cannot be greater than 16 characters.',
                  },
                  pattern: {
                    value: /(\D*\d){2,}/,
                    message: 'Must contain atleast two digits',
                  },
                  validate: (val) => {
                    if (val.startsWith(' ') || val.endsWith(' ')) {
                      return 'Cannot start or end with spaces.';
                    }
                  },
                })}
              />

              <label htmlFor="password" className="form-label-style-1">
                <p>Password</p>
                <div className="group pointer-events-auto relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <div className="scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-opacity duration-300 ease-in-out bg-white dark:bg-black bg-opacity-70 dark:bg-opacity-70 rounded-lg p-4 w-[200px] absolute -top-36">
                    <p className="border-b border-gray-500 pb-1 mb-1">
                      Atleast
                    </p>
                    <p>a small letter.</p>
                    <p>a capital letter.</p>
                    <p>two digits.</p>
                  </div>
                </div>
              </label>
              {errors?.password?.message && (
                <ErrorMessage error={errors.password.message} />
              )}
            </div>
            {/* Login Button */}
            <CustomSubmitButton>Login</CustomSubmitButton>

            {emailAndPasswordError?.message && (
              <ErrorMessage error={emailAndPasswordError.message} />
            )}
            {submitError && <ErrorMessage error={submitError} />}

            {/* To Register  */}
            <div className="text-sm my-5">
              <Link
                className="flex items-center font-medium hover:underline hover:text-gray-700 hover:dark:text-gray-300 transition-all duration-150"
                to="/register"
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
                <p>Back to register</p>
              </Link>
            </div>

            {/* To Reset */}
            <div className="text-sm my-5">
              <Link
                className="flex items-center font-semibold hover:underline hover:text-gray-700 hover:dark:text-gray-300 transition-all duration-150"
                to="/reset"
              >
                <p>Go to reset password</p>
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

export default Login;

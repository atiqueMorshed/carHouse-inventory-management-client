import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  useCreateUserWithEmailAndPassword,
  useUpdateProfile,
} from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';

import auth from '../../../firebase.init';
import ErrorMessage from '../../Shared/ErrorMessage/ErrorMessage';
import CustomSubmitButton from '../../Shared/CustomButton/CustomButton';
import LoadingSpinner from '../../Shared/LoadingSpinner/LoadingSpinner';
import SocialLogin from '../SocialLogin/SocialLogin';
import { signOut } from 'firebase/auth';
import { useGetToken } from '../../../Hooks/useGetToken';

const Register = () => {
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitSuccessful },
    watch,
  } = useForm();

  const [submitError, setSubmitError] = useState('');

  const [
    createUserWithEmailAndPassword,
    emailAndPasswordUser,
    emailAndPasswordLoading,
    emailAndPasswordError,
  ] = useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });

  const [updateProfile, updating, UpdateError] = useUpdateProfile(auth);

  // Gets JWT and adds to localhost
  const onSuccess = (data) => {
    console.log('JWT', data);
    navigate('/', { replace: true });
  };

  const onError = (error) => {
    console.log(error);
    signOut(auth);
  };

  const { isLoading, error, isFetching, refetch } = useGetToken({
    user: emailAndPasswordUser,
    onSuccess,
    onError,
  });

  // Reset input fields on success
  useEffect(() => {
    reset();
  }, [isSubmitSuccessful, reset]);

  const onSubmit = async (data) => {
    const { email, password, name } = data;

    if (email && password && name) {
      try {
        await createUserWithEmailAndPassword(email, password);
        await updateProfile({ displayName: name });

        // Triggers the useGetToken hook to generate the jwt token
        if (emailAndPasswordUser) refetch();
      } catch (error) {
        setSubmitError(error?.message);
      }
    }
  };

  return emailAndPasswordLoading || updating || isLoading || isFetching ? (
    <LoadingSpinner />
  ) : (
    <div className="w-full h-[calc(100vh-73px)] bg-gray-400 dark:bg-darkGray-500">
      {/* Background Image */}
      <div className='relative flex justify-center items-center w-full h-[calc(100vh-73px)] object-cover bg-[url("https://i.ibb.co/LRnRVv7/bg-login-transparent.png")] bg-cover bg-no-repeat'>
        {/* Login Box */}
        <div className="flex justify-center items-center md:absolute left-28 top-50 bg-white dark:bg-black bg-opacity-70 dark:bg-opacity-20 w-11/12 max-w-[430px] py-10 rounded mx-auto">
          <form
            className="relative"
            onSubmit={handleSubmit(onSubmit)}
            autoComplete="off"
          >
            <h1 className="text-2xl font-bold pb-6">Register Now!</h1>

            {/* Name Field */}
            <div className="relative mb-8">
              <input
                name="name"
                type="name"
                placeholder="XXXXX"
                className="peer form-input-style-1"
                {...register('name', {
                  required: 'Required.',
                  pattern: {
                    value: /^[a-zA-Z ]+$/,
                    message: 'Invalid',
                  },
                  minLength: {
                    value: 4,
                    message: 'Atleast 4 characters.',
                  },
                  validate: (val) => {
                    if (val.startsWith(' ') || val.endsWith(' ')) {
                      return 'Cannot start or end with spaces.';
                    }
                  },
                })}
              />

              <label htmlFor="name" className="form-label-style-1">
                <p>Name</p>
              </label>

              {errors?.name?.message && (
                <ErrorMessage error={errors.name.message} />
              )}
            </div>

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

            {/* Confirm password Field */}
            <div className="relative mb-8">
              <input
                name="confirmPassword"
                type="password"
                placeholder="XXXXX"
                className="peer form-input-style-1"
                {...register('confirmPassword', {
                  required: 'Required.',

                  validate: (val) => {
                    if (watch('password') !== val) {
                      return 'Your passwords do no match';
                    }
                    if (val.startsWith(' ') || val.endsWith(' ')) {
                      return 'Cannot start or end with spaces.';
                    }
                  },
                })}
              />

              <label htmlFor="confirmPassword" className="form-label-style-1">
                <p>Confirm Password</p>
              </label>
              {errors?.confirmPassword?.message && (
                <ErrorMessage error={errors.confirmPassword.message} />
              )}
            </div>

            {/* Register Button */}
            <CustomSubmitButton>Register</CustomSubmitButton>

            {emailAndPasswordError?.message && (
              <ErrorMessage error={emailAndPasswordError.message} />
            )}
            {UpdateError?.message && (
              <ErrorMessage error={UpdateError.message} />
            )}
            {submitError && <ErrorMessage error={submitError} />}
            {error && <ErrorMessage error={error.message} />}

            {/* To Login */}
            <div className="text-sm mt-8">
              <Link
                className="flex items-center font-semibold hover:underline hover:text-gray-700 hover:dark:text-gray-300 transition-all duration-150"
                to="/login"
              >
                <p>Go to login</p>
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
            <SocialLogin from="/" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;

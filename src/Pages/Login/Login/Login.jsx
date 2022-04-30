import React from 'react';
import ErrorMessage from '../../Shared/ErrorMessage/ErrorMessage';
import { useForm } from 'react-hook-form';

const Login = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="w-full h-[calc(100vh-73px)] bg-gray-300 dark:bg-darkGray-500">
      <div className='relative flex justify-center items-center w-full h-[calc(100vh-73px)] object-cover bg-[url("https://i.ibb.co/LRnRVv7/bg-login-transparent.png")] bg-cover bg-no-repeat'>
        <div className="flex justify-center items-center md:absolute left-28 top-60 bg-white dark:bg-black bg-opacity-20 dark:bg-opacity-20 w-11/12 max-w-[400px] py-10 rounded mx-auto">
          <form
            className="relative"
            onSubmit={handleSubmit(onSubmit)}
            autoComplete="off"
          >
            <h1 className="text-2xl font-bold pb-6">Login Now!</h1>

            <div className="relative mb-8">
              <input
                name="email"
                placeholder="XXXXX"
                className="peer px-3 pt-7 pb-3 w-[250px] max-w-[350px] text-sm shadow bg-white bg-opacity-20 rounded-xl placeholder-transparent focus:border-none focus:outline-none"
                {...register('email', {
                  required: 'Email is required.',
                  pattern: {
                    value:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: 'Invalid email address',
                  },
                })}
              />

              <label
                htmlFor="email"
                className="flex gap-1 justify-center items-center absolute left-3 top-2 uppercase text-sm pointer-events-none peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:capitalize peer-focus:top-2 peer-focus:uppercase peer-focus:text-sm transition-all duration-200 ease-in"
              >
                <p>Email</p>
              </label>

              <ErrorMessage error={errors?.email?.message} />
            </div>

            <div className="relative mb-8">
              <input
                name="password"
                placeholder="XXXXX"
                className="peer px-3 pt-7 pb-3 w-[250px] max-w-[350px] text-sm shadow bg-white bg-opacity-20 rounded-xl placeholder-transparent focus:border-none focus:outline-none"
                {...register('password', {
                  required: 'Password is required.',
                  minLength: {
                    value: 6,
                    message: 'Password must be atleast 6 characters.',
                  },
                  maxLength: {
                    value: 16,
                    message: 'Password cannot be greater than 16 characters.',
                  },
                  pattern: {
                    value: /^(?=.*[\d])$/,
                    message: 'Must Contain atleast one digit',
                  },
                })}
              />

              <label
                htmlFor="password"
                className="flex gap-1 justify-center items-center absolute left-3 top-2 uppercase text-sm pointer-events-none peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:capitalize peer-focus:top-2 peer-focus:uppercase peer-focus:text-sm transition-all duration-200 ease-in"
              >
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
                    <p>a number.</p>
                  </div>
                </div>
              </label>
            </div>

            <input
              className="py-2 mt-8 rounded bg-primaryBlue-500 border-none text-white text-center block w-[130px]"
              type="submit"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

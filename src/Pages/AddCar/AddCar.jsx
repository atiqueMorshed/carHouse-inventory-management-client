import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import LoadingSpinner from '../Shared/LoadingSpinner/LoadingSpinner';
import ErrorMessage from '../Shared/ErrorMessage/ErrorMessage';
import CustomSubmitButton from '../Shared/CustomButton/CustomButton';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { useAddCar } from '../../Hooks/useAddCar';
import { toast } from 'react-toastify';

const AddCar = () => {
  const toastAddCarSuccess = useRef(null);
  const toastAddCarError = useRef(null);
  const toastSubmitError = useRef(null);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const [submitError, setSubmitError] = useState('');
  const [user, loading] = useAuthState(auth);

  // Resets input fields on success
  useEffect(() => {
    reset();
  }, [isSubmitSuccessful, reset]);

  useEffect(() => {
    if (submitError) {
      if (!toast.isActive(toastSubmitError.current)) {
        toastSubmitError.current = toast.error(submitError, {
          containerId: 'AutoCloseEnabled',
          autoClose: 5000,
          progress: undefined,
        });
      }
    }
  }, [submitError]);

  // Shows unique and one successful toast message if car is added successfully.
  const onSuccess = () => {
    if (!toast.isActive(toastAddCarSuccess.current)) {
      toastAddCarSuccess.current = toast.success('Car Added Successfully!', {
        containerId: 'AutoCloseEnabled',
        pauseOnFocusLoss: false,
        autoClose: 5000,
        progress: undefined,
      });
    }
  };

  // Shows unique and one error toast message if car is not added.
  const onError = (error) => {
    if (!toast.isActive(toastAddCarError.current)) {
      toastAddCarError.current = toast.error(error?.message, {
        containerId: 'AutoCloseEnabled',
        pauseOnFocusLoss: false,
        autoClose: 5000,
        progress: undefined,
      });
    }
  };

  const { mutateAsync, isLoading, isError, error } = useAddCar({
    onSuccess,
    onError,
  });

  // Prepares data to post after clicking add car button
  const onSubmit = async (data) => {
    const { carName, price, quantity, imageURL, description, isSlider } = data;

    if (
      carName &&
      price &&
      quantity &&
      imageURL &&
      description &&
      user.displayName &&
      user.uid
    ) {
      const carData = {
        carName,
        price,
        quantity,
        imageURL,
        description,
        isSlider,
        supplier: {
          name: user.displayName,
          uid: user.uid,
        },
      };

      await mutateAsync(carData);
    } else {
      setSubmitError(
        'Please make sure you are logged in and provide valid inputs.'
      );
    }
  };

  return loading || isLoading ? (
    <LoadingSpinner />
  ) : (
    <div className="w-full min-h-screen bg-gray-400 dark:bg-darkGray-500">
      {/* <Title title="Add Car" /> */}
      {/* Background Image */}
      <div className='flex justify-center items-center  min-h-screen object-cover bg-[url("https://i.ibb.co/L0FKXmS/bg-add-Car-transparent.png")] bg-cover bg-no-repeat'>
        {/* Add Car Box */}
        <div className="flex justify-center items-center bg-white dark:bg-black bg-opacity-70 dark:bg-opacity-80 w-11/12 max-w-[430px] py-10 my-20 rounded mx-auto lg:relative left-40 xl:left-72 2xl:left-96">
          <form
            className="relative"
            onSubmit={handleSubmit(onSubmit)}
            autoComplete="off"
          >
            <h1 className="text-2xl font-bold pb-6">Add Car Now!</h1>

            {/* Car Name Field */}
            <div className="relative mb-8">
              <input
                name="carName"
                type="text"
                placeholder="XXXXX"
                className="peer form-input-style-1"
                {...register('carName', {
                  required: 'Required.',
                  pattern: {
                    value: /^[a-zA-Z0-9_-\s]*$/,
                    message: 'Only numbers, alphabets, and ("-", "_")',
                  },
                  minLength: {
                    value: 4,
                    message: 'Atleast 4 characters.',
                  },
                  maxLength: {
                    value: 20,
                    message: 'At most 20 characters.',
                  },
                  validate: (val) => {
                    if (val.startsWith(' ') || val.endsWith(' ')) {
                      return 'Cannot start or end with spaces.';
                    }
                  },
                })}
              />

              <label htmlFor="carName" className="form-label-style-1">
                <p>Car Name</p>
              </label>

              {errors?.carName?.message && (
                <ErrorMessage error={errors.carName.message} />
              )}
            </div>

            {/* Group - Price, Quantity */}
            <div className="flex justify-between">
              {/* Price Field */}
              <div className="relative mb-8">
                <input
                  name="price"
                  type="number"
                  placeholder="XXXXX"
                  className="peer form-input-style-1 w-[120px] md:w-[145px]"
                  {...register('price', {
                    required: 'Required.',
                    pattern: {
                      value: /^[0-9]+$/,
                      message: 'Only numbers',
                    },

                    maxLength: {
                      value: 20,
                      message: 'At most 20 characters.',
                    },
                    validate: (val) => {
                      if (val.startsWith(' ') || val.endsWith(' ')) {
                        return 'Cannot start or end with spaces.';
                      }
                    },
                  })}
                />

                <label htmlFor="price" className="form-label-style-1">
                  <p>Price</p>
                </label>

                {errors?.price?.message && (
                  <ErrorMessage error={errors.price.message} />
                )}
              </div>

              {/* Quantity Field */}
              <div className="relative mb-8">
                <input
                  name="quantity"
                  type="number"
                  placeholder="XXXXX"
                  className="peer form-input-style-1 w-[120px] md:w-[145px]"
                  {...register('quantity', {
                    required: 'Required.',
                    pattern: {
                      value: /^[0-9]+$/,
                      message: 'Only numbers',
                    },

                    maxLength: {
                      value: 10,
                      message: 'At most 10 characters.',
                    },
                    validate: (val) => {
                      if (val.startsWith(' ') || val.endsWith(' ')) {
                        return 'Cannot start or end with spaces.';
                      }
                    },
                  })}
                />

                <label htmlFor="quantity" className="form-label-style-1">
                  <p>Quantity</p>
                </label>

                {errors?.quantity?.message && (
                  <ErrorMessage error={errors.quantity.message} />
                )}
              </div>
            </div>

            {/* Image Field */}
            <div className="relative mb-8">
              <input
                name="imageURL"
                type="text"
                placeholder="XXXXX"
                className="peer form-input-style-1"
                {...register('imageURL', {
                  required: 'Required.',
                  validate: (val) => {
                    if (val.startsWith(' ') || val.endsWith(' ')) {
                      return 'Cannot start or end with spaces.';
                    }
                  },
                })}
              />

              <label htmlFor="imageURL" className="form-label-style-1">
                <p>Image URL</p>
              </label>

              {errors?.imageURL?.message && (
                <ErrorMessage error={errors.imageURL.message} />
              )}
            </div>

            {/* Description Field */}
            <div className="relative mb-8">
              <div className="form-input-style-1">
                <textarea
                  name="description"
                  type="text"
                  rows={2}
                  placeholder=" "
                  className="peer bg-transparent w-[230px] md:w-[280px]  placeholder-transparent focus:border-none focus:outline-none"
                  {...register('description', {
                    required: 'Required.',
                    pattern: {
                      value: /^[a-zA-Z0-9-_.\s]*$/,
                      message: 'Only alphabets, numbers, space, and dot.',
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
                <label htmlFor="description" className="form-label-style-1">
                  <p>Description</p>
                </label>
              </div>

              {errors?.description?.message && (
                <ErrorMessage error={errors.description.message} />
              )}
            </div>

            {/* Name Field */}
            <div className="relative mb-8">
              <input
                name="name"
                type="name"
                placeholder="XXXXX"
                className="peer form-input-style-1 text-gray-400 font-bold"
                value={user?.displayName}
                readOnly
                disabled
              />

              <label htmlFor="name" className="form-label-style-1">
                <p>Supplier Name</p>
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
                className="peer form-input-style-1 text-gray-400 font-bold"
                value={user?.email}
                readOnly
                disabled
              />

              <label htmlFor="email" className="form-label-style-1">
                <p>Supplier Email</p>
              </label>

              {errors?.email?.message && (
                <ErrorMessage error={errors.email.message} />
              )}
            </div>

            {/* isSlider */}
            <div className="flex items-center gap-3 text-sm font-medium">
              <input
                type="checkbox"
                name="isSlider"
                {...register('isSlider')}
              />
              <label htmlFor="isSlider" className="flex items-center gap-1">
                <p>Add as homepage slider?</p>
                <div className="group pointer-events-auto relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-primaryBlue-500"
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
                  <div className="scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-opacity duration-300 ease-in-out bg-white dark:bg-black bg-opacity-70 dark:bg-opacity-70 rounded-lg p-4 w-[200px] absolute -top-32">
                    <p className="text-xs leading-relaxed">
                      Image will be scaled without stretching. Please try to
                      provide small image with good quality.
                    </p>
                  </div>
                </div>
              </label>
            </div>

            {/* Register Button */}
            <CustomSubmitButton>Add Car</CustomSubmitButton>

            {submitError && <ErrorMessage error={submitError} />}
            {isError && <ErrorMessage error={error.message} />}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCar;

import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useMutateData } from '../../Hooks/useMutateData';
import ErrorMessage from '../Shared/ErrorMessage/ErrorMessage';

const RestockCar = ({ refetch, id }) => {
  const [disabled, setDisabled] = useState();
  const toastRestockError = useRef(null);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const onSuccess = () => {
    refetch();
  };

  const onError = (error) => {
    setDisabled(false);
    if (!toast.isActive(toastRestockError.current)) {
      toastRestockError.current = toast.error(error?.message, {
        containerId: 'AutoCloseEnabled',
        pauseOnFocusLoss: false,
        autoClose: 5000,
        progress: undefined,
      });
    }
  };

  const { isLoading, mutateAsync } = useMutateData({
    onSuccess,
    onError,
  });

  useEffect(() => {
    if (isLoading) {
      setDisabled(true);
    }
  }, [isLoading]);

  useEffect(() => {
    reset();
  }, [isSubmitSuccessful, reset]);

  const onSubmit = async (data) => {
    console.log(data);
    setDisabled(true);
    await mutateAsync({
      url: '/api/updateStock',
      postData: { id, restockBy: data.stock },
    });
    setDisabled(false);
  };
  return (
    <div className="">
      <form
        className="flex"
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
      >
        <button
          className={`flex justify-center items-center gap-2 pr-2 bg-primaryBlue-500 rounded-l-lg text-white hover:bg-primaryBlue-600 hover:rounded-l-lg pl-4 py-3 
        transition-all duration-300 ${
          disabled
            ? 'bg-primaryBlue-700 bg-opacity-50 hover:bg-primaryBlue-700 hover:bg-opacity-50 pointer-events-none'
            : ''
        }`}
          disabled={disabled}
        >
          Restock by
          <FontAwesomeIcon
            className={`${
              disabled ? 'h-5 w-5 animate-spin duration-1000' : 'hidden'
            }`}
            icon={faSpinner}
          />
        </button>
        {/* Quantity Field */}
        <input
          name="stock"
          className="rounded-r-lg w-[120px] py-2 dark:bg-white placeholder-black border border-primaryBlue-500 dark:text-black pl-1 dark:focus:border-none focus:outline-none"
          placeholder="Type Here"
          type="number"
          {...register('stock', {
            required: 'Required.',
            pattern: {
              value: /^[0-9]+$/,
              message: 'Positive numbers only',
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
        <div className="group pointer-events-auto relative pl-2">
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
          <div className="scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-opacity duration-300 ease-in-out text-white bg-black bg-opacity-70 rounded-lg p-4 w-[200px] absolute -top-32 right-0">
            <p className="text-xs leading-relaxed">
              Enter a number in the text field and then click on the Restock by
              button to restock quantity.
            </p>
          </div>
        </div>
      </form>

      {errors?.stock?.message && <ErrorMessage error={errors.stock.message} />}
    </div>
  );
};

export default RestockCar;

import React, { useEffect, useRef, useState } from 'react';
import { useMutateData } from '../../Hooks/useMutateData';

import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast } from 'react-toastify';

const DeliverCar = ({ id, refetch }) => {
  const [disabled, setDisabled] = useState();
  const toastDeliveryError = useRef(null);

  const onSuccess = () => {
    refetch();
  };
  const onError = (error) => {
    setDisabled(false);
    if (!toast.isActive(toastDeliveryError.current)) {
      toastDeliveryError.current = toast.error(error?.message, {
        containerId: 'AutoCloseEnabled',
        pauseOnFocusLoss: false,
        autoClose: 5000,
        progress: undefined,
      });
    }
  };

  const { mutateAsync, isLoading } = useMutateData({
    method: 'PUT',
    onSuccess,
    onError,
  });

  useEffect(() => {
    if (isLoading) {
      setDisabled(true);
    }
  }, [isLoading]);

  return (
    <button
      disabled={disabled}
      onClick={async () => {
        setDisabled(true);
        await mutateAsync({
          url: '/api/updateDelivery',
          postData: id,
          method: 'PUT',
        });
        setDisabled(false);
      }}
      className={`flex justify-center items-center gap-2 py-3 px-6 bg-primaryBlue-500 rounded text-white font-medium hover:bg-primaryBlue-600 transition-all duration-150 ${
        disabled
          ? 'bg-primaryBlue-700 bg-opacity-50 hover:bg-primaryBlue-700 hover:bg-opacity-50 pointer-events-none'
          : ''
      }`}
    >
      Delivered
      <FontAwesomeIcon
        className={`${
          disabled ? 'h-5 w-5 animate-spin duration-1000' : 'hidden'
        }`}
        icon={faSpinner}
      />
    </button>
  );
};

export default DeliverCar;

import { faClose, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import auth from '../../../firebase.init';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import { useDeleteCarById } from '../../../Hooks/useDeleteCarById';
import { useNavigate } from 'react-router-dom';
const CarTuple = ({
  car: {
    _id,
    carName,
    imageURL,
    price,
    quantity,
    sold,
    description,
    supplier: { name },
  },
  refetch,
}) => {
  const navigate = useNavigate();
  const toastDeleteCarSuccess = useRef(null);
  const toastDeleteCarError = useRef(null);
  const toastUserError = useRef(null);

  const [disabled, setDisabled] = useState(false);
  const [user, userLoading, userError] = useAuthState(auth);

  // Shows unique and one successful toast message if car is deleted successfully.
  const onSuccess = () => {
    if (!toast.isActive(toastDeleteCarSuccess.current)) {
      toastDeleteCarSuccess.current = toast.success(
        'Car Deleted Successfully!',
        {
          containerId: 'AutoCloseEnabled',
          pauseOnFocusLoss: false,
          autoClose: 5000,
          progress: undefined,
        }
      );
    }
    refetch();
  };

  // Shows unique and one error toast message if car is not deleted.
  const onError = (error) => {
    if (!toast.isActive(toastDeleteCarError.current)) {
      toastDeleteCarError.current = toast.error(error?.message, {
        containerId: 'AutoCloseEnabled',
        pauseOnFocusLoss: false,
        autoClose: 5000,
        progress: undefined,
      });
    }
    refetch();
  };

  const { mutateAsync, isLoading } = useDeleteCarById({
    onSuccess,
    onError,
  });

  useEffect(() => {
    if (isLoading) setDisabled(true);
    else setDisabled(false);
  }, [isLoading]);

  if (userLoading) {
    return <LoadingSpinner />;
  }

  const handleDelete = async () => {
    let shouldDelete = window.confirm(
      'Are you sure you want to delete this item?'
    );
    if (shouldDelete) {
      if (!disabled) {
        setDisabled(true);
        await mutateAsync({ url: '/api/inventory', id: _id });
        setDisabled(false);
      }
    }
  };

  if (userError) {
    if (!toast.isActive(toastUserError.current)) {
      toastUserError.current = toast.error(userError?.message, {
        containerId: 'AutoCloseEnabled',
        pauseOnFocusLoss: false,
        autoClose: 5000,
        progress: undefined,
      });
    }
  }

  return (
    <tr className="border-b border-gray-100 dark:border-gray-700">
      <td
        onClick={() => navigate(`/inventory/${_id}`)}
        className="font-medium px-6 py-4 text-gray-900 dark:text-white whitespace-nowrap underline cursor-pointer pointer-events-auto"
      >
        {carName}
      </td>
      <td className="th-1">{quantity}</td>
      <td className="th-1">{price}</td>
      <td className="th-1">{sold}</td>
      <td className="th-1 flex gap-2">
        {name}
        <p
          className={`${
            name === user?.displayName
              ? 'text-primaryBlue-500 text-xs'
              : 'hidden'
          }`}
        >
          (You)
        </p>
      </td>
      <td className="th-1 pointer-events-auto">
        <span className="flex items-center gap-2">
          <FontAwesomeIcon
            disabled={disabled}
            onClick={handleDelete}
            className={`w-4 h-4 hover:text-gray-600 cursor-pointer ${
              disabled ? 'text-gray-600' : ''
            }`}
            icon={faClose}
          />
          <FontAwesomeIcon
            className={`${
              disabled ? 'h-5 w-5 animate-spin duration-1000' : 'hidden'
            }`}
            icon={faSpinner}
          />
        </span>
      </td>
    </tr>
  );
};

export default CarTuple;

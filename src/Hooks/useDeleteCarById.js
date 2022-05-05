import { useMutation } from 'react-query';
import axiosAuthBearer from '../api/axiosAuthBearer';

const deleteById = async ({ url, id }) => {
  if (url && id) {
    try {
      const response = await axiosAuthBearer.delete(url, {
        data: {
          id,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(
        `Delete failed. ${error?.response?.data?.message || error?.message}`
      );
    }
  } else {
    throw new Error('Insufficient data');
  }
};

export const useDeleteCarById = ({ onSuccess, onError }) => {
  return useMutation(deleteById, { onSuccess, onError });
};

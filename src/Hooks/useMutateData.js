import { useMutation } from 'react-query';
import axiosAuthBearer from '../api/axiosAuthBearer';

const mutateData = async ({ url, postData, method = 'POST' }) => {
  if (url) {
    try {
      const response = await axiosAuthBearer({
        method,
        url,
        data: { postData },
      });
      return response.data;
    } catch (error) {
      throw new Error(
        `Request Failed. ${error?.response?.data?.message || error?.message}`
      );
    }
  }
};

export const useMutateData = ({ onSuccess, onError }) => {
  return useMutation(mutateData, {
    onSuccess,
    onError,
  });
};

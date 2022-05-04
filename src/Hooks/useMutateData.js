import { useMutation } from 'react-query';
import axiosAuthBearer from '../api/axiosAuthBearer';

const mutateData = async ({ url, postData }) => {
  if (url) {
    try {
      const response = await axiosAuthBearer.post(url, { postData });
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

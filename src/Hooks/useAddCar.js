import { useMutation } from 'react-query';
import axiosAuthBearer from '../api/axiosAuthBearer';

const addCar = async (carData) => {
  try {
    const response = await axiosAuthBearer.post('/api/addCar', {
      carData,
    });
    return response.data;
  } catch (error) {
    console.log('ERROR IN ADDCAR: ', error?.message);
    throw new Error(
      `Submit unsuccessful. ${
        error?.response?.data?.message
          ? error.response.data.message
          : error?.message
      }`
    );
  }
};

export const useAddCar = ({ onSuccess, onError }) => {
  return useMutation(addCar, { onSuccess, onError });
};

import { useMutation } from 'react-query';
import axiosAuthBearer from '../api/axiosAuthBearer';

const addCar = async (carData) => {
  try {
    const response = await axiosAuthBearer.post('/api/addCar', {
      carData,
    });
    return response?.data;
  } catch (error) {
    throw new Error(
      `Submit unsuccessful. ${
        error?.response?.data?.message
          ? error.response.data.message
          : error.message
      }`
    );
  }
};

export const useAddCar = () => {
  return useMutation(addCar);
};

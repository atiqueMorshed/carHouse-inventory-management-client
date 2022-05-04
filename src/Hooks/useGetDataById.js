import { useQuery } from 'react-query';
import AxiosBaseUrl from '../api/AxiosBaseUrl';

const getDataById = async ({ queryKey }) => {
  const id = queryKey[1];
  const url = queryKey[2];

  if (id && url) {
    try {
      const { data } = await AxiosBaseUrl(`${url}/${id}`);
      return data;
    } catch (error) {
      throw new Error(
        `Couldn't get the car. ${
          error?.response?.data?.message || error?.message
        }`
      );
    }
  }
};

export const useGetDataById = ({ name, id, url, isEnabled = true }) => {
  return useQuery([name, id, url], getDataById, {
    enabled: isEnabled,
  });
};

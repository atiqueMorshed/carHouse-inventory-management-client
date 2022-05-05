import { useQuery } from 'react-query';
import axios from '../api/axiosAuthBearer'; // axios with JWT authorization

const getData = async ({ queryKey }) => {
  const url = queryKey[1];

  if (url) {
    try {
      const { data } = await axios.get(url);
      return data;
    } catch (error) {
      throw new Error(
        `Coundn't fetch inventory cars. ${
          error?.response?.data?.message
            ? error.response.data.message
            : error?.message
        }`
      );
    }
  }
};

export const useGetProtedtedData = ({ name, url, isEnabled = true }) => {
  return useQuery([name, url], getData, {
    enabled: isEnabled,
  });
};

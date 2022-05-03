import { useQuery } from 'react-query';
import axios from '../api/AxiosBaseUrl'; // axios with the baseURL

const getData = async ({ queryKey }) => {
  const url = queryKey[1];

  if (url) {
    try {
      const { data } = await axios.get(url);
      return data;
    } catch (error) {
      throw new Error(
        `Coundn't fetch sliders. ${
          error?.response?.data?.message
            ? error.response.data.message
            : error?.message
        }`
      );
    }
  }
};

export const useGetPublicData = ({ name, url, isEnabled = true }) => {
  return useQuery(['getSlider', url], getData, {
    enabled: isEnabled,
  });
};

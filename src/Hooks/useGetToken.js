import { useQuery } from 'react-query';
import axios from '../api/AxiosBaseUrl'; // axios with the baseURL

const getToken = async ({ queryKey }) => {
  console.log(queryKey);
  const email = queryKey[1]?.email;
  const uid = queryKey[1]?.uid;
  if (email && uid) {
    try {
      const { data } = await axios.post('/api/login', { email, uid });
      if (data?.accessToken) {
        localStorage.setItem('carstore-at', data.accessToken);
        return { accessToken: data.accessToken };
      }
    } catch (error) {
      throw new Error('Error Fetching Access Token');
    }
  }
};

export const useGetToken = ({ user, onSuccess, onError }) => {
  return useQuery(['token', user], getToken, {
    onSuccess,
    onError,
    enabled: false,
  });
};

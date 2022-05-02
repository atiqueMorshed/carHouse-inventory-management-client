import axios from '../api/AxiosBaseUrl';

export const getToken = async ({ queryKey }) => {
  const email = queryKey[1]?.user?.email;
  if (email) {
    try {
      const { data } = await axios.post('/api/login', { email });
      if (data?.accessToken) {
        localStorage.setItem('carstore-at', data.accessToken);
        return { accessToken: data.accessToken };
      }
    } catch (error) {
      throw new Error('Error Fetching Access Token');
    }
  }
};

import axios from './AxiosBaseUrl'; // axios with the baseURL

export const getToken = async ({ queryKey }) => {
  const email = queryKey[1]?.user?.email;
  const uid = queryKey[1]?.user?.uid;
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

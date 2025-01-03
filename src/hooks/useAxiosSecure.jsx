import { useEffect } from 'react';
import axios from 'axios';
import useAuthContext from './useAuthContext';
import { useNavigate } from 'react-router-dom';

const axiosInstance = axios.create({
  baseURL: 'https://whereisit-tau.vercel.app/',
  withCredentials: true,
});

const useAxiosSecure = () => {
  const { logOut } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        console.log('Error Captured in Interceptor', error);
        if (error.status === 401 || error.status === 403) {
          logOut()
            .then(() => navigate('/login'))
            .catch((error) => console.log(error));
        }
        return Promise.reject(error);
      }
    );
  }, []);
  return axiosInstance;
};

export default useAxiosSecure;

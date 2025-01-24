import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import useAuth from './useAuth';

const axiosSecure = axios.create({
  baseURL: `${import.meta.env.VITE_BASEURL}`,
  withCredentials: true,
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    axiosSecure.interceptors.response.use(
      response => response,
      async error => {
        console.log(' interceptor -->', error.response);

        if (error.response?.status === 401 || error.response?.status === 403) {
          logout();
          navigate('/login');
        }

        return Promise.reject(error);
      }
    );
  }, [logout, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;

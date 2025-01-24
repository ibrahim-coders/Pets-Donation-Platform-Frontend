import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useAdmin = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: isAdmin, isLoading } = useQuery({
    queryKey: [user?.email, 'isAdmin'],

    queryFn: async () => {
      const res = await axiosSecure.get(`/users/role/${user?.email}`);
      return res?.data?.admin;
    },
  });

  return [isAdmin, isLoading];
};

export default useAdmin;

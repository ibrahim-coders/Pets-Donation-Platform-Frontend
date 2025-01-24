import useAxiosSecure from '../../hooks/useAxiosSecure';
import Loaders from '../../Components/Loaders';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet-async';

const Users = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: allUser = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const res = await axiosSecure.get('/all_user');
      return res.data;
    },
  });
  const makeAdmin = async userId => {
    try {
      const data = await axiosSecure.patch(`/users/${userId}/make-admin`);
      console.log('Admin status updated:', data);
      refetch();
      toast.success('User promoted to admin successfully.');
    } catch (error) {
      console.log(error);
    }
  };
  if (isLoading) {
    return <Loaders />;
  }
  console.log(allUser);
  return (
    <div className="container mx-auto p-6">
      <Helmet>
        <title>Animels | Users </title>
      </Helmet>
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      <table className="table-auto w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-200 px-4 py-2">Name</th>
            <th className="border border-gray-200 px-4 py-2">Email</th>
            <th className="border border-gray-200 px-4 py-2">
              Profile Picture
            </th>
            <th className="border border-gray-200 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {allUser.map(user => (
            <tr key={user._id}>
              <td className="border border-gray-200 px-4 py-2">{user.name}</td>
              <td className="border border-gray-200 px-4 py-2">{user.email}</td>
              <td className="border border-gray-200 px-4 py-2">
                <img
                  src={user.image}
                  referrerPolicy="no-referrer"
                  alt="Profile"
                  className="w-12 h-12 rounded-full object-cover"
                />
              </td>
              <td className="border border-gray-200 px-4 py-2">
                {user.role !== 'Admin' ? (
                  <button
                    className="bg-green-500 text-white px-4 py-1 rounded"
                    onClick={() => makeAdmin(user._id)}
                  >
                    Make Admin
                  </button>
                ) : (
                  <span className="text-gray-500"> Admin</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;

import { useQuery } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Loaders from '../../Components/Loaders';

import MyDonationTable from './MyDonationTable';

const MyDonation = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: my_donation = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['donation', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/mydonation/${user?.email}`);
      return res.data;
    },
  });

  if (isLoading) return <Loaders />;

  return (
    <div className="overflow-x-auto w-full">
      <table className="table w-full">
        <thead>
          <tr>
            <th className="p-2 text-left">Serial</th>
            <th className="p-2 text-left">Pet Image</th>
            <th className="p-2 text-left">Pet Name</th>
            <th className="p-2 text-left">Donation Amount</th>
            <th className="p-2 text-left">Donation Status</th>
            <th className="p-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {my_donation.map((donations, index) => (
            <MyDonationTable
              key={donations._id}
              index={index}
              donations={donations}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyDonation;

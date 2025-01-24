import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Loaders from '../../Components/Loaders';

const Donation = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // Fetch donations
  const {
    data: donations = [],
    isLoading,

    refetch,
  } = useQuery({
    queryKey: ['donations', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donation_amounts/${user?.email}`);
      return res.data;
    },
  });

  // Handle refund
  const handleRefund = async id => {
    try {
      // Make sure the correct URL is being used
      const response = await axiosSecure.delete(`/donationsDelete/${id}`);
      toast.success('Your donation has been refunded successfully!');

      refetch();
    } catch (error) {
      console.error('Refund error:', error);
      toast.error('Failed to process refund.');
    }
  };

  // Confirmation modal
  const showDeleteConfirmation = id => {
    confirmAlert({
      customUI: ({ onClose }) => (
        <div className="custom-ui bg-white p-4 rounded shadow-md w-96 text-center">
          <h1 className="text-xl pb-1 font-bold">Are you sure?</h1>
          <p className="text-sm pb-1">You want to request a refund?</p>
          <div className="mt-3 flex justify-center gap-2 w-full">
            <button
              className="bg-green-700 px-4 text-white rounded w-full py-2"
              onClick={onClose}
            >
              No
            </button>
            <button
              className="w-full py-2 bg-red-500 text-white px-4 rounded"
              onClick={() => {
                handleRefund(id);
                onClose();
              }}
            >
              Yes, Refund!
            </button>
          </div>
        </div>
      ),
    });
  };

  // Render
  if (isLoading) {
    return <Loaders />;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">My Donations</h2>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-2 border text-start">Pet Image</th>
            <th className="px-4 py-2 border">Pet Name</th>
            <th className="px-4 py-2 border">Donated Amount</th>
            <th className="px-4 py-2 border">Ask for Refund</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {donations.length > 0 ? (
            donations.map(donation => (
              <tr key={donation._id} className="border-b">
                <td className="px-4 py-2">
                  <img
                    src={donation.petImage || '/default-pet-image.jpg'}
                    alt={`Image of ${donation.petName || 'Unknown pet'}`}
                    className="w-12 h-12 object-cover rounded-full"
                  />
                </td>
                <td className="px-4 py-2">
                  {donation.petName || 'Unknown Pet'}
                </td>
                <td className="px-4 py-2">${donation.amount || 0}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => showDeleteConfirmation(donation._id)}
                    className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition duration-300"
                    aria-label={`Request refund for ${donation.petName}`}
                  >
                    Refund
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="px-4 py-2 text-center">
                No donations found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Donation;

import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { MdEdit, MdDelete, MdPause, MdPlayArrow } from 'react-icons/md';
import useAxiosSecure from '../../hooks/useAxiosSecure'; // Axios hook for secure API requests
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import Loaders from '../../Components/Loaders';

const AllDonationTable = () => {
  const axiosSecure = useAxiosSecure(); // Hook to make secure requests
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDonationId, setSelectedDonationId] = useState(null);

  // Fetch all donations from the backend
  const {
    data: all_donation = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['allDonation'],
    queryFn: async () => {
      const res = await axiosSecure.get('/admin_all_donation');
      return res.data;
    },
  });

  if (isLoading) {
    return <Loaders />;
  }

  const openDeleteModal = id => {
    setSelectedDonationId(id);
    setIsModalOpen(true);
  };

  const closeDeleteModal = () => {
    setSelectedDonationId(null);
    setIsModalOpen(false);
  };

  const confirmDelete = async () => {
    try {
      await axiosSecure.delete(`/donation_delete/${selectedDonationId}`);
      refetch();
      toast.success('Donation deleted successfully');
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete donation');
    }
    closeDeleteModal();
  };

  // Toggle the paused status of the donation
  const handleStatus = async (id, currentPausedStatus) => {
    const newPausedStatus = !currentPausedStatus; // Toggle the paused status
    try {
      await axiosSecure.patch(`/donation_pased/${id}`, {
        paused: newPausedStatus, // Send updated status to backend
      });
      refetch();
      toast.success(newPausedStatus ? 'Donation paused' : 'Donation resumed');
    } catch (error) {
      console.log(error);
      toast.error('Failed to update donation status');
    }
  };

  return (
    <div className="p-4">
      <Helmet>
        <title>Animels | All Donation</title>
      </Helmet>
      <h2 className="text-2xl font-bold mb-4">Donation Campaigns</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="text-left px-4 py-2 border">No</th>
              <th className="text-left px-4 py-2 border">Campaign Name</th>
              <th className="text-left px-4 py-2 border">Last Date</th>
              <th className="text-left px-4 py-2 border">Amount ($)</th>
              <th className="text-center px-4 py-2 border">Status</th>
              <th className="text-center px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {all_donation.map((donation, index) => (
              <tr key={donation._id} className="hover:bg-gray-100">
                <td className="px-4 py-2 border">{index + 1}</td>
                <td className="px-4 py-2 border">{donation.name}</td>
                <td className="px-4 py-2 border">
                  {format(new Date(donation.lastDate), 'MMMM dd, yyyy hh:mm a')}
                </td>
                <td className="px-4 py-2 border text-right">
                  {donation.maxDonation}
                </td>
                <td
                  className={`px-4 py-2 border text-center ${
                    donation.paused ? 'text-red-600' : 'text-green-600'
                  }`}
                >
                  {donation.paused ? 'Paused' : 'Active'}
                </td>
                <td className="px-4 py-2 border text-center gap-4 flex">
                  <Link
                    to={`/dashboard/my-donations/${donation._id}`}
                    className="text-blue-500 hover:text-blue-700 mx-1"
                  >
                    <MdEdit size={20} />
                  </Link>
                  <button
                    className="text-red-500 hover:text-red-700 mx-1"
                    onClick={() => openDeleteModal(donation._id)}
                  >
                    <MdDelete size={20} />
                  </button>
                  <button
                    className={`mx-1 ${
                      donation.paused
                        ? 'text-green-500 hover:text-green-700'
                        : 'text-yellow-500 hover:text-yellow-700'
                    }`}
                    onClick={() => handleStatus(donation._id, donation.paused)}
                  >
                    {donation.paused ? (
                      <MdPlayArrow size={20} />
                    ) : (
                      <MdPause size={20} />
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-bold mb-2">Confirm Deletion</h2>
            <p className="text-gray-600 mb-4">
              Are you sure you want to delete this donation?
            </p>
            <div className="flex justify-center space-x-2">
              <button
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
                onClick={closeDeleteModal}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded"
                onClick={confirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllDonationTable;

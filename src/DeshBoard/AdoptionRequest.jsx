import { useState } from 'react';
import useAxiosSecure from '../hooks/useAxiosSecure';
import useAuth from '../hooks/useAuth';
import Loaders from '../Components/Loaders';
import toast from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';

const AdoptionRequest = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Fetch adoption requests
  const {
    data: adoptionRequests = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['adoption', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/adoption-request/${user?.email}`);
      return res.data;
    },
  });

  // Update request status (Accept/Reject)
  const updateRequestStatus = async (id, status) => {
    try {
      const response = await axiosSecure.patch(`/adoption-request/${id}`, {
        status,
      });
      if (response.status === 200) {
        toast.success(`Request ${status} successfully.`);
        refetch(); // Refresh data after updating status
      }
    } catch (error) {
      console.error(`Error updating request status to ${status}:`, error);
      toast.error('Failed to update request status.');
    }
  };

  // Delete an adoption request
  const handleDelete = async id => {
    try {
      await axiosSecure.delete(`/adoption/${id}`);
      refetch(); // Refresh data after deletion
      toast.success('Request rejected successfully.');
    } catch (error) {
      console.error('Error deleting request:', error);
      toast.error('Failed to reject request.');
    }
  };

  if (isLoading) {
    return <Loaders />;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Adoption Requests</h1>
      {adoptionRequests.length > 0 ? (
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-200 px-4 py-2">Name</th>
              <th className="border border-gray-200 px-4 py-2">Email</th>
              <th className="border border-gray-200 px-4 py-2">Phone</th>
              <th className="border border-gray-200 px-4 py-2">Location</th>
              <th className="border border-gray-200 px-4 py-2">Status</th>
              <th className="border border-gray-200 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {adoptionRequests.map(request => (
              <tr key={request._id}>
                <td className="border border-gray-200 px-4 py-2">
                  {request.userName}
                </td>
                <td className="border border-gray-200 px-4 py-2">
                  {request.email}
                </td>
                <td className="border border-gray-200 px-4 py-2">
                  {request.phone}
                </td>
                <td className="border border-gray-200 px-4 py-2">
                  {request.address}
                </td>
                <td className="border border-gray-200 px-4 py-2">
                  {request.status ? (
                    <span className="text-green-600 font-bold">Approved</span>
                  ) : (
                    <span className="text-yellow-500 font-bold">Pending</span>
                  )}
                </td>
                <td className="border border-gray-200 px-4 py-2">
                  {!request.status && (
                    <>
                      <button
                        className="bg-green-500 text-white px-4 py-1 rounded mr-2"
                        onClick={() =>
                          updateRequestStatus(request._id, 'accepted')
                        }
                      >
                        Accept
                      </button>
                      <button
                        className="bg-red-500 text-white px-4 py-1 rounded"
                        onClick={() => handleDelete(request._id)}
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-gray-600">No adoption requests found.</p>
      )}
    </div>
  );
};

export default AdoptionRequest;

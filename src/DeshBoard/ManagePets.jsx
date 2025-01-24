import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import useAxiosSecure from '../hooks/useAxiosSecure';
import useAdmin from '../hooks/useAdmin';
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import { MdDownloadDone } from 'react-icons/md';
import { Link } from 'react-router-dom';

const ManagePets = () => {
  const axiosSecure = useAxiosSecure();
  const [isAdmin] = useAdmin();
  const {
    data: pets = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['pets'],
    queryFn: async () => {
      const res = await axiosSecure.get('/managepets');
      return res.data;
    },
  });

  // Update pet adoption status
  const updatePet = async (id, currentStatus) => {
    try {
      const newStatus = !currentStatus;
      await axiosSecure.patch(`/manage-pets/${id}`, { adopted: newStatus });
      toast.success('Pet updated successfully!');
      refetch();
    } catch (error) {
      console.error(error);
      toast.error('Failed to update pet.');
    }
  };

  // Delete pet
  const deletePet = async id => {
    try {
      await axiosSecure.delete(`/managepetss/${id}`);
      toast.success('Pet deleted successfully!');
      refetch();
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete pet.');
    }
  };

  // Render pets
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Pets</h1>
      <table className="table-auto w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-200 px-4 py-2">Image</th>
            <th className="border border-gray-200 px-4 py-2">Name</th>
            <th className="border border-gray-200 px-4 py-2">Owner</th>
            <th className="border border-gray-200 px-4 py-2">Status</th>
            <th className="border border-gray-200 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {pets.map(pet => (
            <tr key={pet._id}>
              <td className="border border-gray-200 px-4 py-2">
                <img
                  src={pet.petImage}
                  className="w-12 h-12 rounded-full"
                  alt="Pet"
                />
              </td>
              <td className="border border-gray-200 px-4 py-2">
                {pet.petName}
              </td>
              <td className="border border-gray-200 px-4 py-2">{pet.name}</td>
              <td className="border border-gray-200 px-4 py-2">
                {pet.adopted ? 'Adopted' : 'Not Adopted'}
              </td>
              <td className="border border-gray-200 px-4 py-2 text-center flex">
                <button
                  className={`text-blue-500 px-4 py-1 rounded mr-2 ${
                    isLoading ? 'opacity-50 ' : 'cursor-not-allowed '
                  }`}
                  onClick={() => updatePet(pet._id)}
                  disabled={isLoading}
                >
                  <MdDownloadDone size={20} />
                </button>

                <Link
                  to={`/dashboard/pets_update/${pet._id}`}
                  className="text-sky-500  px-4 py-1 rounded mr-2"
                >
                  <FaRegEdit size={20} />
                </Link>
                <button
                  className="text-red-500  px-4 py-1 rounded mr-2"
                  onClick={() => deletePet(pet._id)}
                >
                  <FaRegTrashAlt size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManagePets;

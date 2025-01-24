import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import toast from 'react-hot-toast';
import MyPatesTable from './MyPatesTable';

import useAuth from '../hooks/useAuth';
import Loaders from '../Components/Loaders';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { Helmet } from 'react-helmet-async';
const MyPets = () => {
  const petsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const [sortConfig, setSortConfig] = useState({
    key: 'petName',
    direction: 'ascending',
  });

  // Fetch pets data from API
  const {
    data: my_pets = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['my-pets', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-pets/${user?.email}`);
      return res.data;
    },
  });

  const handleDelete = async id => {
    try {
      await axiosSecure.delete(`/mypets/${id}`);
      refetch();
      toast.success('Pet deleted successfully!');
    } catch (err) {
      console.log(err);
      toast.error('Failed to delete pet!');
    }
  };

  const handleAdopt = async id => {
    try {
      const updatedStatus = true;
      await axiosSecure.patch(`/mypets_status/${id}`, {
        status: updatedStatus,
      });
      refetch();
      toast.success('Status changed successfully!');
    } catch (err) {
      console.log(err);
      toast.error('Failed to change status!');
    }
  };

  // const handleUpdate = id => {
  //   navigate(`/dashboard/pets_update/${id}`);
  // };

  const sortedPets = [...my_pets].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  const requestSort = key => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  if (isLoading) return <Loaders />;

  // Calculate pagination details
  const totalPages = Math.ceil(my_pets.length / petsPerPage);
  const indexOfLastPet = currentPage * petsPerPage;
  const indexOfFirstPet = indexOfLastPet - petsPerPage;
  const currentPets = sortedPets.slice(indexOfFirstPet, indexOfLastPet);

  // Handle page change
  const handlePageChange = pageNumber => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="p-4">
      <Helmet>
        <title>Animals | My Pets</title>
      </Helmet>
      <h1 className="text-2xl font-bold mb-4">My Pets</h1>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th onClick={() => requestSort('index')}>Serial </th>
              <th onClick={() => requestSort('petImage')}>Pet Image</th>
              <th onClick={() => requestSort('petName')}>Pet Name</th>
              <th onClick={() => requestSort('category')}>Pet Category</th>
              <th onClick={() => requestSort('status')}>Adoption Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentPets.map((pets, index) => (
              <MyPatesTable
                key={pets._id}
                pets={pets}
                index={indexOfFirstPet + index + 1}
                handleDelete={handleDelete}
                handleAdopt={handleAdopt}
                requestSort={requestSort}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 mx-2 bg-gray-200 disabled:bg-gray-400 rounded"
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => handlePageChange(i + 1)}
              className={`px-4 py-2 mx-1 rounded ${
                currentPage === i + 1
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-black'
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 mx-2 bg-gray-200 disabled:bg-gray-400 rounded"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default MyPets;

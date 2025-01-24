import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import DonatorsModal from './DonatorsModal';

const MyDonationTable = ({ donations, index, onPause }) => {
  const axiosSecure = useAxiosSecure();
  const { petImage, name, maxDonation, currentDonation, isPaused, _id } =
    donations;
  const [paused, setPaused] = useState(isPaused);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [donators, setDonators] = useState([]);
  const navigate = useNavigate();

  const handlePause = async () => {
    try {
      // Sending the correct "paused" state to the backend
      const response = await axiosSecure.patch(`/mydonation_pause/${_id}`, {
        paused: !paused,
      });
      console.log(response.data);

      setPaused(!paused);
    } catch (error) {
      console.error('Error updating donation status:', error);
    }
  };

  const fetchDonators = async () => {
    try {
      console.log(`Fetching donators for donation ID: ${_id}`);
      const response = await axiosSecure.get(`/donation/count/${_id}`);
      if (response.data && Array.isArray(response.data.donations)) {
        setDonators(response.data.donations);
      } else {
        console.error('Unexpected response format:', response.data);
        setDonators([]);
      }
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error fetching donators:', error);
      setDonators([]);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <tr>
      <td className="p-2 px-6">{index + 1}</td>
      <td className="p-2">
        <img
          src={petImage}
          alt={name}
          className="w-16 h-16 object-cover rounded-full"
        />
      </td>
      <td className="p-2">{name}</td>
      <td className="p-2">৳{maxDonation}</td>
      {/* <td className="p-2">৳{currentDonation}</td> */}
      {/* <td className="p-2">
        <div className="relative w-full h-4 bg-gray-200 rounded">
          <div
            className="absolute top-0 left-0 h-full bg-green-500 rounded"
            style={{
              width: `${(currentDonation / maxDonation) * 100}%`,
            }}
          ></div>
        </div>
      </td> */}
      <td className="p-2">
        <span
          className={`${
            paused ? 'text-gray-400' : 'text-red-600'
          } font-semibold`}
        >
          {paused ? 'Paused' : 'Active'}
        </span>
      </td>
      <td className="p-2">
        <div className="flex gap-4">
          <button
            className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
            onClick={() => navigate(`/dashboard/my-donations/${_id}`)}
          >
            Edit
          </button>
          <button
            className={`${
              paused ? 'bg-gray-500 cursor-not-allowed' : 'bg-red-500'
            } text-white px-3 py-1 rounded hover:bg-opacity-80`}
            onClick={handlePause}
            disabled={paused}
          >
            {paused ? 'Unpause' : 'Pause'}
          </button>
          <button
            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
            onClick={fetchDonators}
          >
            View Donators
          </button>
        </div>
      </td>
      <DonatorsModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        donators={donators}
      />
    </tr>
  );
};

export default MyDonationTable;

import { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

import toast from 'react-hot-toast';

import { Helmet } from 'react-helmet-async';
import Loaders from '../../Components/Loaders';

const PetDetails = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { details } = useParams();
  const axiosSecure = useAxiosSecure();
  const [pets, setPets] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [adoptionData, setAdoptionData] = useState({
    userName: user?.displayName,
    email: user?.email,
    phone: '',
    address: '',
    status: false,
  });

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await axiosSecure.get(`/pets/${details}`);
        setPets(response.data);
      } catch (error) {
        toast.error('Failed to load pet details. Please try again.');
        console.error('Error fetching pets data:', error);
      }
    };

    fetchPets();
  }, [details, navigate]);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setAdoptionData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const adoptionRequest = {
      petId: pets._id,
      petName: pets.petName,
      petImage: pets.petImage,
      ...adoptionData,
    };

    try {
      await axiosSecure.post('/adoptions', adoptionRequest);
      toast.success('Adoption request submitted successfully!');
      setShowModal(false);
      navigate('/dashboard/adoption-requests');
    } catch (error) {
      toast.error('Failed to submit adoption request. Please try again.');
      console.error('Error submitting adoption request:', error);
    }
  };

  if (!pets._id) return <Loaders />;

  return (
    <div className="mx-auto flex flex-col lg:flex-row justify-between w-full gap-12 my-10 px-10">
      <Helmet>
        <title>Animals | PetDetails </title>
      </Helmet>
      <div className="w-full overflow-hidden rounded-xl h-[400px]">
        <img
          src={pets.petImage}
          alt={pets.petName}
          className="object-cover object-center w-full h-full mt-3"
        />
      </div>
      <div className="w-full">
        <h2 className="text-2xl font-bold pt-2">{pets.petName}</h2>
        <div className="mt-4">
          <h3 className="font-semibold ">Details:</h3>
          <p className="t">Location: {pets.location}</p>
          <p className="">Age: {pets.age}</p>
        </div>
        <p className="pt-1 text-lg ">{pets.shortDescription}</p>
        <p className="text-lg  font-bold">Description</p>
        <div
          className="m-0 p-0"
          dangerouslySetInnerHTML={{ __html: pets.longDescription }}
        ></div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-orange-600 text-white text-sm py-3 px-4 rounded-md inline-block hover:bg-gray-600 transition duration-300 mt-4"
        >
          Adopt
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center  bg-opacity-50 mt-20">
          <div className="bg-sky-500 rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-xl font-bold mb-4">{`Adopt ${pets.petName}`}</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="userName"
                value={adoptionData.userName}
                disabled
                className="w-full mb-3 p-2 border rounded bg-gray-100"
              />
              <input
                type="email"
                name="email"
                value={adoptionData.email}
                disabled
                className="w-full mb-3 p-2 border rounded bg-gray-100"
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone number"
                value={adoptionData.phone}
                onChange={handleInputChange}
                className="w-full mb-3 p-2 border rounded"
                required
              />
              <textarea
                name="address"
                placeholder="Your address"
                value={adoptionData.address}
                onChange={handleInputChange}
                className="w-full mb-3 p-2 border rounded"
                required
              ></textarea>
              <button
                type="submit"
                className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-500"
                disabled={!adoptionData.address || !adoptionData.phone}
              >
                Submit
              </button>

              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="ml-4 "
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PetDetails;

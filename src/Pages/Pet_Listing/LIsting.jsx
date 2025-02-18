import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import useAxiosePublic from '../../hooks/useAxiosePublic';
import All_pets from '../../Components/All_pets';
import { Link } from 'react-router-dom';

const LIsting = () => {
  const axiosPublic = useAxiosePublic();

  const [pets, setPets] = useState([]);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await axiosPublic.get('/all_pets');
        setPets(response.data);
      } catch (error) {
        console.log('Error fetching pets data:', error);
      }
    };

    fetchPets();
  }, []);
  return (
    <>
      <div className="w-full px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:justify-center items-center gap-6 my-10">
        <Helmet>
          <title>Animals | Pet_Listing </title>
        </Helmet>
        {/* Search Input and Button */}
      </div>
      <div className="w-96 mx-auto space-y-2 pb-4">
        <h2 className="text-center mt-4 text-xl md:text-3xl font-bold">
          Adopt a Pet
        </h2>
        <p className="text-xl text-center">
          we offer a full range of services to keep your pets happy.
        </p>
      </div>
      {/* Display Pets */}
      <div className="w-full mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-6">
        {pets && pets.length > 0 ? (
          pets.slice(0, 4).map(pet => <All_pets key={pet._id} pet={pet} />)
        ) : (
          <p className="text-center text-2xl text-red-400">No Data available</p>
        )}
      </div>
      <div className="flex justify-center itrms-center my-4">
        <Link
          to="/pet-listing"
          className="bg-blue-600 transition duration-300 ease-in-out hover:bg-gray-700 text-white px-6 py-3 rounded-lg shadow-lg"
        >
          {' '}
          SEE MORE
        </Link>
      </div>
    </>
  );
};

export default LIsting;

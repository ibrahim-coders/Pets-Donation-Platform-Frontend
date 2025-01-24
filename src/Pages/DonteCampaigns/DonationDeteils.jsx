import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Loaders from '../../Components/Loaders';
import { Elements } from '@stripe/react-stripe-js';
import useAuth from '../../hooks/useAuth';

import { loadStripe } from '@stripe/stripe-js';
import DonationForm from './DonationForm';
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
const DonationDeteils = () => {
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const [donation, setDonation] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const [isModalOpen, setModalOpen] = useState(false);
  const [amount, setAmount] = useState('');
  useEffect(() => {
    const fetchDonation = async () => {
      try {
        const response = await axiosSecure.get(`/donation/${id}`);
        if (response && response.data) {
          setDonation(response.data);
        } else {
          console.error('No data found in response');
        }
      } catch (error) {
        console.error('Error fetching donation data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDonation();
  }, [id, axiosSecure]);

  if (loading) {
    return <Loaders />;
  }

  if (!donation) {
    return <p>No donation details found.</p>;
  }

  const handleDonateNowClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setAmount('');
  };

  return (
    <div className="mx-auto flex flex-col lg:flex-row justify-between w-full gap-12 my-10 px-6">
      <Helmet>
        <title>Animals | Donations Details</title>
      </Helmet>
      <div className="w-full overflow-hidden rounded-xl h-[400px]">
        <img
          src={donation?.petImage}
          alt={donation?.petName}
          className="object-cover object-center w-full h-full"
        />
      </div>

      <div className="w-full">
        {' '}
        <h2 className="text-2xl font-bold text-gray-800 pt-2">
          {donation?.name}
        </h2>
        <div className="mt-4">
          <h3 className="font-semibold text-gray-800">Details:</h3>
          <p className="text-gray-600">
            {' '}
            <strong>Max-Donation:</strong> {donation?.maxDonation}
          </p>
          <p>
            <strong>Donation lastDate:</strong>{' '}
            {new Date(donation?.lastDate).toLocaleDateString()}
          </p>
        </div>
        <p className="pt-1 text-lg text-gray-600">
          {donation?.shortDescription}
        </p>
        <p className="text-lg text-gray-600 font-bold">Description</p>
        <div
          className="m-0 p-0"
          dangerouslySetInnerHTML={{ __html: donation?.longDescription }}
        ></div>
        <button
          onClick={handleDonateNowClick}
          className="bg-gray-700 text-white text-sm py-3 px-4 rounded-md inline-block hover:bg-gray-600 transition duration-300 mt-4"
        >
          Donation Now
        </button>
      </div>

      {/* Modal for Donation */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md w-96">
            <h3 className="text-xl font-bold mb-4">
              Donate to {donation?.name}
            </h3>
            <Elements stripe={stripePromise}>
              <DonationForm
                amount={amount}
                setAmount={setAmount}
                closeModal={handleCloseModal}
                user={user}
                donation={
                  donation
                    ? {
                        petImage: donation.petImage,
                        name: donation.name,
                        lastDate: donation.lastDate,
                        maxDonation: donation.maxDonation,
                        _id: donation._id,
                      }
                    : null
                }
              />
            </Elements>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonationDeteils;

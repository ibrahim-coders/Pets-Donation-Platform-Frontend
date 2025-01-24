import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import useAxiosSecure from '../../hooks/useAxiosSecure';

import { imgaeUploade } from '../../ImageUplode/utils';

const EditDonation = () => {
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { my_donation } = useParams();
  const [startDate, setStartDate] = useState(new Date());
  const [updateDonation, setUpdateDonation] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  const handleFileChange = async event => {
    const file = event.target.files[0];
    try {
      const fileImage = await imgaeUploade(file);
      if (fileImage) {
        setSelectedImage(fileImage);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image. Please try again.');
    }
  };

  useEffect(() => {
    const fetchDonation = async () => {
      try {
        const response = await axiosSecure.get(
          `/mydonation_update/${my_donation}`
        );
        setUpdateDonation(response.data);

        // Set image URL for display
        setImageUrl(response.data?.imageUrl);

        // Ensure the last date is valid
        const lastDate = new Date(response.data?.lastDateDonation);
        if (!isNaN(lastDate.getTime())) {
          setStartDate(lastDate);
        } else {
          setStartDate(new Date());
        }
      } catch (error) {
        console.error('Error fetching donation:', error);
        toast.error('Failed to load donation data.');
      }
    };

    fetchDonation();
  }, [my_donation, axiosSecure]);

  const handleChange = date => {
    setStartDate(date);
  };

  const handleSubmit = async event => {
    event.preventDefault();

    const donationData = {
      name: event.target.name.value,
      maxDonation: event.target.maxDonation.value,
      lastDateDonation: startDate.toISOString(),
      shortDescription: event.target.shortDescription.value,
      longDescription: event.target.longDescription.value,
      imageUrl: selectedImage || imageUrl,
    };

    try {
      await axiosSecure.patch(
        `/mydonation_update/${my_donation}`,
        donationData
      );
      navigate('/donation-campaigns');
      toast.success('Donation campaign updated successfully!');
    } catch (error) {
      console.error('Error updating donation:', error);
      toast.error('Error updating donation campaign.');
    }
  };

  return (
    <div className="w-96 mx-auto py-6">
      <h1 className="text-3xl font-semibold mb-6 text-center">
        Update Donation Campaign
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row gap-4 py-3">
          <div className="space-y-2 flex-1 w-full">
            <label
              htmlFor="petImage"
              className="block text-sm font-medium text-gray-700"
            >
              Pet Picture
            </label>

            {/* Display current image */}
            {imageUrl && !selectedImage && (
              <div className="mb-4">
                <img
                  src={imageUrl}
                  alt="Current Pet"
                  className="w-16 h-16 object-cover rounded-full"
                />
              </div>
            )}

            <input
              type="file"
              name="petImage"
              accept="image/*"
              onChange={handleFileChange}
              className="block mb-2 text-sm font-medium text-gray-900"
            />
          </div>
          <div className="space-y-2 flex-1 w-full">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Pet Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              defaultValue={updateDonation?.name}
              required
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-md p-2"
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="space-y-2 flex-1">
            <label
              htmlFor="maxDonation"
              className="block text-sm font-medium text-gray-700"
            >
              Maximum Donation Amount
            </label>
            <input
              type="number"
              name="maxDonation"
              defaultValue={updateDonation?.maxDonation}
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-md p-2"
            />
          </div>

          <div className="space-y-2 flex-1">
            <label
              htmlFor="lastDate"
              className="block text-sm font-medium text-gray-700"
            >
              Last Date of Donation
            </label>
            <DatePicker
              selected={startDate}
              onChange={handleChange}
              dateFormat="yyyy/MM/dd"
              minDate={new Date()}
              required
              className="w-full text-sm text-gray-900 border border-gray-300 rounded-md p-2"
            />
          </div>
        </div>

        <div className="space-y-2 flex-1">
          <label
            htmlFor="shortDescription"
            className="block text-sm font-medium text-gray-700"
          >
            Short Description
          </label>
          <input
            type="text"
            id="shortDescription"
            name="shortDescription"
            defaultValue={updateDonation?.shortDescription}
            required
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-md p-2"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="longDescription"
            className="block text-sm font-medium text-gray-700"
          >
            Long Description
          </label>
          <textarea
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-md p-2"
            rows="4"
            id="longDescription"
            defaultValue={updateDonation?.longDescription}
            required
          />
        </div>

        <div className="mt-4">
          <button
            className="w-full bg-blue-500 text-white p-3 rounded-lg mx-auto block"
            type="submit"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditDonation;

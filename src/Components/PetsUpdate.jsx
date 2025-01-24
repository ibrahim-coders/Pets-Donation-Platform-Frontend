import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useAxiosSecure from '../hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet-async';
import { imgaeUploade } from '../ImageUplode/utils';

const PetsUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [petData, setPetData] = useState(null);

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const { data } = await axiosSecure.get(`/updatePets/${id}`);
        setPetData(data);
      } catch (error) {
        console.error('Error fetching pet data:', error);
        toast.error('Failed to fetch pet details.');
      }
    };

    fetchPet();
  }, [id, axiosSecure]);

  const handleChange = async e => {
    const { name, value } = e.target;

    if (name === 'image') {
      const image = e.target.files[0];
      if (image) {
        try {
          const url = await imgaeUploade(image);
          setPetData(prevData => ({
            ...prevData,
            image: url,
          }));
        } catch (error) {
          console.error('Image upload failed:', error);
          toast.error('Image upload failed.');
        }
      }
    } else {
      setPetData(prevData => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      await axiosSecure.patch(`/update-allpets/${id}`, petData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      toast.success('Pet details updated successfully!');
      navigate('/dashboard/my-added-pets');
    } catch (error) {
      console.error('Error updating pet:', error);
      toast.error('Failed to update pet details.');
    }
  };

  return (
    <div className="container mx-auto">
      <Helmet>
        <title>Pet Update | Update Pet Details</title>
      </Helmet>
      <h1 className="text-2xl font-semibold mb-6 text-center">
        Update Pet Details
      </h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-6 max-w-md mx-auto gap-4"
      >
        {/* Pet Name */}
        <div>
          <label className="block mb-2 text-sm font-medium">Pet Name</label>
          <input
            type="text"
            name="petName"
            defaultValue={petData?.petName}
            onChange={handleChange}
            className="block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        {/* Pet Image */}
        <div>
          <label className="block mb-2 text-sm font-medium">Pet Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        {/* Pet Age */}
        <div>
          <label className="block mb-2 text-sm font-medium">Age</label>
          <input
            type="number"
            name="age"
            defaultValue={petData?.age}
            onChange={handleChange}
            className="block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        {/* Category */}
        <div>
          <label className="block mb-2 text-sm font-medium">Category</label>
          <input
            type="text"
            name="category"
            defaultValue={petData?.category?.label}
            onChange={e =>
              setPetData(prevData => ({
                ...prevData,
                category: { ...prevData.category, label: e.target.value },
              }))
            }
            className="block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        {/* Pet Location */}
        <div>
          <label className="block mb-2 text-sm font-medium">Location</label>
          <input
            type="text"
            name="location"
            defaultValue={petData?.location}
            onChange={handleChange}
            className="block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        {/* Short Description */}
        <div>
          <label className="block mb-2 text-sm font-medium">
            Short Description
          </label>
          <input
            type="text"
            name="shortDescription"
            defaultValue={petData?.shortDescription}
            onChange={handleChange}
            className="block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <button
            type="submit"
            className="bg-blue-500 text-white p-3 rounded-md w-full"
          >
            Update Pet
          </button>
        </div>
      </form>
    </div>
  );
};

export default PetsUpdate;

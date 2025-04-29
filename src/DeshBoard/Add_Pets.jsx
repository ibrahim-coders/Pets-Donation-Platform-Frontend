import { Helmet } from 'react-helmet';
import { useForm, Controller } from 'react-hook-form';
import ReactSelect from 'react-select';
import { useState } from 'react';
import ReactQuill, { displayName } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { imgaeUploade } from '../ImageUplode/utils';
import useAxiosePublic from '../hooks/useAxiosePublic';
import toast from 'react-hot-toast';
import useAuth from '../hooks/useAuth';

const Add_Pets = () => {
  const { user } = useAuth();
  const [description, setDescription] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const axiosPublic = useAxiosePublic();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();

  // Pet categories for the dropdown
  const petCategories = [
    { value: 'dog', label: 'Dog' },
    { value: 'cat', label: 'Cat' },
    { value: 'bird', label: 'Bird' },
    { value: 'other', label: 'Other' },
  ];

  // Image upload handler
  const handleImageUpload = async event => {
    const image = event.target.files[0];
    if (image) {
      const url = await imgaeUploade(image);
      setPhotoURL(url);
    }
  };

  // Form submission handler
  const onSubmit = async data => {
    const petData = {
      ...data,
      petImage: photoURL,
      longDescription: description,

      name: user?.displayName,
      email: user?.email,
      date: new Date(),
      status: false,
    };
    console.log('Submitted Data:', petData.shortDescription);
    try {
      await axiosPublic.post('/pets', petData);
      toast.success('Add_pets Successfuly');
      // Reset the form
      reset();
      setDescription('');
      setPhotoURL('');
    } catch (error) {
      console.error('Error submitting pet data:', error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <Helmet>
        <title>Animals | Add Pets</title>
      </Helmet>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Pet Image */}
          <div className="flex-1">
            <label className="block mb-2 text-sm font-medium ">Pet Image</label>
            <input
              type="file"
              accept="image/*"
              name="image"
              className="block w-full text-sm border border-gray-300 rounded-md"
              onChange={handleImageUpload}
            />
            {photoURL && (
              <p className="text-green-500 text-sm mt-2 hidden">
                Image uploaded successfully!
              </p>
            )}
          </div>

          {/* Pet Name */}
          <div className="flex-1">
            <label className="block mb-2 text-sm font-medium ">Pet Name</label>
            <input
              type="text"
              {...register('petName', { required: 'Pet name is required' })}
              className="block w-full text-sm  border border-gray-300 rounded-md p-2"
            />
            {errors.petName && (
              <p className="text-red-500">{errors.petName.message}</p>
            )}
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          {/* Pet Age */}
          <div className="flex-1">
            <label className="block mb-2 text-sm font-medium ">Pet Age</label>
            <input
              type="number"
              {...register('age', { required: 'Pet age is required' })}
              className="block w-full text-sm  border border-gray-300 rounded-md p-2"
            />
            {errors.age && <p className="text-red-500">{errors.age.message}</p>}
          </div>

          {/* Pet Category */}
          <div className="flex-1">
            <label className="block mb-2 text-sm font-medium ">
              Pet Category
            </label>
            <Controller
              name="category"
              control={control}
              defaultValue=""
              rules={{ required: 'Please select a category' }}
              render={({ field }) => (
                <ReactSelect
                  {...field}
                  options={petCategories}
                  placeholder="Select Category"
                  className="text-sm"
                />
              )}
            />
            {errors.category && (
              <p className="text-red-500">{errors.category.message}</p>
            )}
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          {/* Pet Location */}
          <div className="flex-1">
            <label className="block mb-2 text-sm font-medium ">
              Pet Location
            </label>
            <input
              type="text"
              {...register('location', {
                required: 'Pet location is required',
              })}
              className="block w-full text-sm  border border-gray-300 rounded-md p-2"
            />
            {errors.location && (
              <p className="text-red-500">{errors.location.message}</p>
            )}
          </div>

          {/* Short Description */}
          <div className="flex-1">
            <label className="block mb-2 text-sm font-medium ">
              Short Description
            </label>
            <input
              type="text"
              {...register('shortDescription', {
                required: 'Short description is required',
              })}
              className="block w-full text-sm  border  rounded-md p-2"
            />
            {errors.shortDescription && (
              <p className="text-red-500">{errors.shortDescription.message}</p>
            )}
          </div>
        </div>

        {/* Long Description */}
        <div>
          <label className="block mb-2 text-sm font-medium ">
            Long Description
          </label>
          <ReactQuill
            theme="snow"
            value={description}
            onChange={setDescription}
            placeholder="Write detailed information about the pet..."
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-500  p-3 rounded-lg w-full md:w-1/4"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Add_Pets;

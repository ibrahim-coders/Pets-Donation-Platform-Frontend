import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { imgaeUploade } from '../ImageUplode/utils';
import toast from 'react-hot-toast';
import useAxiosSecure from '../hooks/useAxiosSecure';
import useAuth from '../hooks/useAuth';

const CreateCampaign = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [imageUrl, setImageUrl] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageUpload = async event => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const url = await imgaeUploade(file);
      setImageUrl(url);
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image.');
    }
  };

  // Handle form submission
  const formik = useFormik({
    initialValues: {
      name: '',
      petImage: '',
      maxDonation: '',
      lastDate: '',
      shortDescription: '',
      longDescription: '',
      name: user?.name,
      email: user.email,
      paused: false,
    },
    validationSchema: Yup.object({
      maxDonation: Yup.number()
        .min(1, 'Donation must be at least 1')
        .max(10000, 'Donation cannot exceed 10,000')
        .required('Required'),
    }),
    onSubmit: async values => {
      try {
        setIsSubmitting(true);

        // Upload image to Cloudinary
        if (imageUrl) {
          values.petImage = imageUrl;
        }

        // Prepare campaign data
        const campaignData = {
          ...values,
          createdAt: new Date().toISOString(),
        };
        console.log(campaignData);
        // Send campaign data to the server
        await axiosSecure.post('/donation-campaign', campaignData);

        toast.success('Donation campaign created successfully!');
        formik.resetForm();
      } catch (error) {
        console.error('Error creating campaign:', error);
        toast.error('Failed to create the donation campaign.');
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <div className="w-96 mx-auto py-6">
      <h1 className="text-3xl font-semibold mb-6 text-center">
        Create Donation Campaign
      </h1>
      <form onSubmit={formik.handleSubmit} className="space-y-6">
        {/* Pet Picture */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="space-y-2 flex-1 w-full">
            <label htmlFor="petImage" className="block text-sm font-medium ">
              Pet Picture
            </label>
            <input
              type="file"
              name="petImage"
              onChange={handleImageUpload}
              accept="image/*"
              className="block mb-2 text-sm font-medium "
            />
            {imageUrl && (
              <img src={imageUrl} alt="Pet" className="mt-2" width="100" />
            )}
          </div>

          <div className="space-y-2 flex-1 w-full">
            <label
              htmlFor="shortDescription"
              className="block text-sm font-medium "
            >
              Donation Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-md p-2"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          {/* Maximum Donation Amount */}
          <div className="space-y-2 flex-1">
            <label htmlFor="maxDonation" className="block text-sm font-medium ">
              Maximum Donation Amount
            </label>
            <input
              type="number"
              name="maxDonation"
              value={formik.values.maxDonation}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`block w-full text-sm text-gray-900 border ${
                formik.touched.maxDonation && formik.errors.maxDonation
                  ? 'border-red-500'
                  : 'border-gray-300'
              } rounded-md p-2`}
            />
            {formik.touched.maxDonation && formik.errors.maxDonation ? (
              <div className="text-red-500 text-sm">
                {formik.errors.maxDonation}
              </div>
            ) : null}
          </div>

          {/* Last Date of Donation */}

          <div className="space-y-2 flex-1">
            <label htmlFor="lastDate" className="block text-sm font-medium ">
              Last Date of Donation
            </label>
            <DatePicker
              selected={formik.values.lastDate}
              onChange={date => formik.setFieldValue('lastDate', date)}
              dateFormat="yyyy/MM/dd"
              minDate={new Date()}
              required
              className=" w-full text-sm text-gray-900 border border-gray-300 rounded-md p-2"
            />
          </div>
        </div>

        {/* Short Description */}
        <div className="space-y-2 flex-1">
          <label
            htmlFor="shortDescription"
            className="block text-sm font-medium "
          >
            Short Description
          </label>
          <input
            type="text"
            id="shortDescription"
            name="shortDescription"
            value={formik.values.shortDescription}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
            className="block w-full text-sm  border border-gray-300 rounded-md p-2"
          />
        </div>

        {/* Long Description */}
        <div className="space-y-2">
          <label
            htmlFor="longDescription"
            className="block text-sm font-medium "
          >
            Long Description
          </label>
          <textarea
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-md p-2"
            rows="4"
            id="longDescription"
            name="longDescription"
            value={formik.values.longDescription}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            className=" w-full bg-blue-500 text-white p-3 rounded-lg  mx-auto block"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Create Campaign'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCampaign;

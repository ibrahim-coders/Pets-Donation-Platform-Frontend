import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import useAxiosePublic from '../../hooks/useAxiosePublic';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const DonationForm = ({ amount, setAmount, closeModal, user, donation }) => {
  const navigate = useNavigate();
  const axiosPublic = useAxiosePublic();
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async e => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.error(error.message);
    } else {
      // Create payment intent on the server
      const response = await axiosPublic.post('/create-payment-intent', {
        amount,
      });
      const clientSecret = response.data.clientSecret;

      // Confirm the payment
      const { error: confirmError, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: user.name,
            },
          },
        });

      if (confirmError) {
        console.error('Payment failed:', confirmError);
      } else if (paymentIntent.status === 'succeeded') {
        // Post donation details to the database
        await axiosPublic.post('/donations', {
          amount,
          donationId: donation._id,
          paymentIntentId: paymentIntent.id,
          petImage: donation.petImage,
          petName: donation.name,
          userName: user?.displayName,
          userEmail: user?.email,
          date: new Date(),
        });
        toast.success('Donation successful!');

        closeModal();
        navigate('/dashboard/my-donation-campaigns');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label className="block mb-2">
        Donation Amount ($):
        <input
          type="number"
          value={amount}
          name="many"
          onChange={e => setAmount(e.target.value)}
          className="border rounded w-full p-2 mt-1"
          required
        />
      </label>
      <label className="block mb-4">
        Card Details:
        <CardElement className="border rounded p-2 mt-1" />
      </label>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        disabled={!stripe}
      >
        Submit Donation
      </button>
      <button
        type="button"
        onClick={closeModal}
        className="bg-red-500 text-white px-4 py-2 rounded ml-2 hover:bg-red-600"
      >
        Close
      </button>
    </form>
  );
};

export default DonationForm;

const DonatorsModal = ({ isOpen, onClose, donators }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 relative">
        <h2 className="text-2xl font-bold mb-4">Donators List</h2>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600"
        >
          &times;
        </button>
        <ul>
          {donators.map(donator => (
            <li key={donator._id} className="mb-2">
              <p>
                <strong>Name:</strong> {donator.userName}
              </p>
              <p>
                <strong>Amount:</strong> ৳{donator.amount}
              </p>
              <p>
                <strong>Email:</strong> {donator.userEmail}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DonatorsModal;

import { format } from 'date-fns';

import { Link } from 'react-router-dom';

const AllDonations = ({ donation }) => {
  const { petImage, name, lastDate, maxDonation, _id } = donation;

  const formattedLastDate = format(new Date(lastDate), 'MMMM dd, yyyy');

  return (
    <div>
      {/* Donation Card */}
      <div className="w-full rounded overflow-hidden shadow-lg">
        <img className="w-full h-48 object-cover" src={petImage} alt={name} />
        <div className="p-4">
          <p className="text-xl font-semibold  pl-2">{name}</p>
          <h2 className="text-xl font-semibold  pl-2">
            Last Date:
            <span className=" px-2 text-sm">{formattedLastDate}</span>
          </h2>
          <p className="text-xl font-semibold  pl-2">
            Max-Donation:
            <span className=" px-2 text-sm">{maxDonation}</span>
          </p>

          <Link
            to={`/donation/${_id}`}
            className="bg-green-600 text-white text-sm py-3 px-4 rounded-md mt-4 inline-block hover:bg-gray-600 transition duration-300"
          >
            view details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AllDonations;

import { IoLocationSharp } from 'react-icons/io5';
import { Link } from 'react-router-dom';

const All_pets = ({ pet }) => {
  const { petImage, petName, age, location, _id } = pet || {};

  return (
    <div className="w-full rounded  shadow-lg p">
      <div className="w-full  rounded-xl ">
        <img
          className=" w-full h-48 overflow-hidden"
          src={petImage}
          alt={petName}
        />
      </div>
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800">{petName}</h2>
        <p className="text-gray-600 pt-1">Age: {age} years</p>
        <p className="text-gray-600 flex pt-1">
          <IoLocationSharp className="text-2xl" /> {location}
        </p>
        <Link
          to={`/pet-details/${_id}`}
          className="bg-gray-700 text-white text-sm py-3 px-4 rounded-md mt-4 inline-block hover:bg-gray-600 transition duration-300"
        >
          Viewing Details
        </Link>
      </div>
    </div>
  );
};

export default All_pets;

import React from 'react';
import { AiOutlineHeart } from 'react-icons/ai';
import { FiEdit } from 'react-icons/fi';
import { MdDelete } from 'react-icons/md';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Link } from 'react-router-dom';

const MyPatesTable = ({
  pets,
  index,
  handleDelete,
  handleAdopt,

  requestSort,
}) => {
  const { category, petImage, petName, status = false, _id } = pets;

  const showDeleteConfirmation = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui bg-white p-4 rounded shadow-md w-96 text-center">
            <h1 className="text-xl pb-1 font-bold">Are you sure?</h1>
            <p className="text-sm pb-1">You want to delete this pet?</p>
            <div className="mt-3 flex justify-center gap-2 w-full">
              <button
                className=" bg-green-700 px-4 text-white rounded w-full py-4"
                onClick={onClose}
              >
                No
              </button>
              <button
                className="w-full py-4 bg-red-500 text-white px-4 rounded"
                onClick={() => {
                  handleDelete(_id);
                  onClose();
                }}
              >
                Yes, Delete it!
              </button>
            </div>
          </div>
        );
      },
    });
  };

  return (
    <tr>
      <th>
        <label>{index}</label>
      </th>
      <td>
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="mask mask-squircle h-12 w-12">
              <img src={petImage} alt="Pet" />
            </div>
          </div>
          <div></div>
        </div>
      </td>
      <td>
        <div onClick={() => requestSort('petName')} className="font-bold">
          {petName}
        </div>
      </td>
      <td>{category.label}</td>{' '}
      {/* Ensure category is a string or valid React element */}
      <td className="text-red-600">{status ? 'Adopted' : 'Available'}</td>
      <td className="flex gap-4">
        <Link
          to={`/dashboard/pets_update/${_id}`}
          className="bg-yellow-500 text-white p-2 rounded-full hover:bg-yellow-600"
        >
          <FiEdit size={18} />
        </Link>
        <button
          className={`bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 ${
            status ? 'cursor-not-allowed opacity-50' : ''
          }`}
          onClick={() => handleAdopt(_id)}
        >
          <AiOutlineHeart size={18} />
        </button>
        <button
          className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
          onClick={showDeleteConfirmation}
          title="Delete"
        >
          <MdDelete size={18} />
        </button>
      </td>
    </tr>
  );
};

export default MyPatesTable;

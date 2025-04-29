import useAxiosePublic from '../../hooks/useAxiosePublic';
import All_pets from '../../Components/All_pets';
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Loaders from '../../Components/Loaders';

const Pet_Listing = () => {
  const axiosPublic = useAxiosePublic();
  const [loading, setLoading] = useState(false);
  const [pets, setPets] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('');

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await axiosPublic.get(
          `/all_pets?category=${filter}&search=${search}&sortOrder=${sortOrder}`
        );
        setPets(response.data);
        setLoading(false);
      } catch (error) {
        console.log('Error fetching pets data:', error);
      }
    };

    fetchPets();
  }, [search, filter, sortOrder]);
  const handleSortByDate = () => {
    setSortOrder('age_desc');
  };

  if (loading) {
    return <Loaders />;
  }
  return (
    <>
      <div className="w-full px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:justify-center items-center gap-6 my-10">
        <Helmet>
          <title>Animals | Pet_Listing </title>
        </Helmet>
        {/* Search Input and Button */}
        <div className="w-full max-w-sm min-w-[200px] relative mt-4">
          <div className="relative">
            <input
              type="text"
              className="w-full bg-transparent placeholder:text-slate-500 text-slate-500 text-sm border border-slate-200 rounded-md pl-3 pr-20 py-3 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
              placeholder="Search pets"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <button
              className="absolute right-1 top-1 rounded bg-slate-600 py-2 px-3 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
            >
              Search
            </button>
          </div>
        </div>

        {/* Category Selector */}
        <div className="mt-4">
          <select
            name="category"
            onChange={e => setFilter(e.target.value)}
            className="select select-bordered w-full max-w-xs bg-gray-600"
          >
            <option value="">Please select category</option>
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
            <option value="bird">Bird</option>
          </select>
        </div>

        {/* Sort Button */}
        <div className="mt-4">
          <button
            onClick={() => handleSortByDate(pets.age)}
            className="w-full sm:w-auto bg-gray-600 text-white py-3 px-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
          >
            Sorted by Date
          </button>
        </div>
      </div>

      {/* Display Pets */}
      <div className="w-full mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-6">
        {pets && pets.length > 0 ? (
          pets.map(pet => <All_pets key={pet._id} pet={pet} />)
        ) : (
          <p className="text-center text-2xl text-red-400">No Data available</p>
        )}
      </div>
    </>
  );
};

export default Pet_Listing;

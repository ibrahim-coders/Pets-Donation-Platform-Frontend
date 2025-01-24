import { useEffect, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import useAxiosePublic from '../../hooks/useAxiosePublic';
import Loaders from '../../Components/Loaders';
import AllDonations from './AllDonations';

const DonetCampaign = () => {
  const axiosPublic = useAxiosePublic();
  const [sortOrder, setSortOrder] = useState('desc');

  const fetchDonations = async ({ pageParam = 1 }) => {
    const response = await axiosPublic.get(
      `/donation-campaigns?page=${pageParam}&sortOrder=${sortOrder}`
    );
    return response.data;
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery(['donations', sortOrder], fetchDonations, {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.hasNextPage) {
          return pages.length + 1;
        } else {
          return undefined;
        }
      },
    });

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const toggleSortOrder = () => {
    setSortOrder(prevOrder => (prevOrder === 'desc' ? 'age_desc' : 'desc'));
  };

  if (status === 'loading') {
    return <Loaders />;
  }

  if (status === 'error') {
    return <div className="text-red-500">Error loading donations</div>;
  }

  return (
    <div className="container mx-auto p-4">
      {/* Sort Button */}
      <button
        onClick={toggleSortOrder}
        className="bg-green-600 text-white text-sm py-3 px-4 rounded-md mt-4 hover:bg-gray-600 transition duration-300 mb-6"
      >
        {sortOrder === 'desc' ? 'Sort by Max Donation' : 'Sort by Date'}
      </button>

      {/* Donations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.pages.map(page =>
          page.donations.map(donation => (
            <AllDonations key={donation._id} donation={donation} />
          ))
        )}
      </div>

      {/* Infinite Scroll Loader */}
      <div ref={ref} className="text-center mt-4">
        {isFetchingNextPage
          ? 'Loading more...'
          : hasNextPage
          ? 'Scroll down to load more'
          : 'No more donations'}
      </div>
    </div>
  );
};

export default DonetCampaign;

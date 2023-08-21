import { usePost } from '../../context/postContext';
import { FaFilter } from '../../utils/icons';
import { useState } from 'react';
import { FilterModal } from '../filterModal/FilterModal';

export const SortPost = () => {
  const { postState: { filterType, allPosts } } = usePost();
  const [filterModal, setFilterModal] = useState(false);
  const [filter, setFilter] = useState('latest');

  const filterHandler = (e) => {
    setFilterModal(true);
  };

  const closeModal = () => {
    setFilterModal(false);
  };

  return (
    <div className="p-3">
      <div className="flex flex-row justify-between items-center border border-gray-500 rounded-md shadow-md bg-white p-2 ml-10 mr-2 h-10">
        <p className="text-gray-700 text-lg font-medium mx-3 flex-grow-1">{filter.toUpperCase()}</p>
        {filterModal ? (
        <div className="mt-2 -mr-1 z-10" >
          <FilterModal onClose={closeModal} filter={filter} setFilter={setFilter} />
        </div>
      ):<FaFilter  onClick={filterHandler} className="w-6 h-6 mx-3 text-gray-600 cursor-pointer " />}
      </div>
    </div>
  );
};

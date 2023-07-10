import { usePost } from '../../context/postContext';
import { FaFilter } from '../../utils/icons';
import { useState } from 'react';
import { FilterModal } from '../../components/filterModal/FilterModal';

export const SortPost = () => {
  const { postState: { filterType, allPosts } } = usePost();
  const [filter, setFilter] = useState();
  const [filterModal, setFilterModal] = useState(false);

  const filterHandler = () => {
    setFilterModal(true);
  };

  const closeModal = () => {
    setFilterModal(false);
  };

  return (
    <div className="relative p-3">
      <div className="flex flex-row justify-between items-center border border-gray-500 rounded-md shadow-md bg-white p-2">
        <p className="text-gray-700 text-lg font-medium">{filterType.toUpperCase()}</p>
        <FaFilter onClick={filterHandler} className="w-6 h-6 text-gray-600 cursor-pointer" />
      </div>

      {filterModal && (
        <div className="absolute top-10 left-0">
          <FilterModal onClose={closeModal} filterType={filterType} />
        </div>
      )}
    </div>
  );
};

import { usePost } from '../../context/postContext';
import { FaFilter } from '../../utils/icons';
import { useState } from 'react';
import { FilterModal } from '../../components/filterModal/FilterModal';

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
    <div className=" p-3 relative">
      <div className="flex flex-row  justify-between items-center border border-gray-500 rounded-md shadow-md bg-white p-2 ml-10 mr-2 ">
        <p className="text-gray-700 text-lg font-medium mx-3">{filter.toUpperCase()}</p>
        <FaFilter  onClick={filterHandler} className="w-6 h-6 mx-3 text-gray-600 cursor-pointer " />
      </div>

      {filterModal && (
        <div className="absolute right-0 mt-2 z-10" >
          <FilterModal onClose={closeModal} filter={filter} setFilter={setFilter} />
        </div>
      )}
    </div>
  );
};

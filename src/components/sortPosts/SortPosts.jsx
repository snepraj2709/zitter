import { usePost } from '../../context/postContext'
import {FaFilter} from '../../utils/icons'
import {useState} from 'react';
import {FilterModal} from '../../components/filterModal/FilterModal';

export const SortPost=()=>{
    const {postState:{filterType,allPosts}} =usePost()
    const [filter,setFilter]=useState();
    const [filterModal,setFilterModal]=useState(false);

    const filterHandler =()=>{
        setFilterModal(true)
    }

    const closeModal=()=>{
        setFilterModal(false)
    }

    
    return(
        <div>
            <div className='flex flex-row justify-between border border-gray-500  m-3 p-1'>
                <p className='decoration-double'>{filterType.toUpperCase()}</p>
                <FaFilter onClick={filterHandler} className='w-6 h-6 justify-center'/>
            </div>
            
            {filterModal && 
            <div>
                <FilterModal onClose={closeModal} filterType={filterType} /> 
            </div>}
        </div>
    )
}
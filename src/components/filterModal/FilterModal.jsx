import { usePost } from '../../context/postContext';
import {MdCancel,FaArrowDown,FaArrowUp,
  FaFire} from '../../utils/icons'

export const FilterModal=({onClose,filterType})=>{

    const {postState:{allPosts},filterPostHandler} =usePost();


    const filteredPosts=allPosts
    return(
        <div>
           

<div className="absolute right-2 w-max text-sm flex flex-col gap-0.5 items-start py-1 px-1 shadow-lg border rounded border-darkGrey dark:border-lightGrey z-10 bg-lighterPrimary dark:bg-darkGrey dark:text-lightGrey">
     <MdCancel onClick={onClose} className='w-5 h-5 justify-center'/>
     <hr/>
            <button
              style={{
                backgroundColor:
                  filterType === "trending" ? "#33333" : "#fffff",
                fontWeight: filterType === "trending" && "bold",
              }}
              className="flex justify-center py-1 px-3 rounded-md w-full dark:text-darkGrey"
              onClick={() => {
                filterPostHandler(filteredPosts,filterType);
              }}
            >
              <FaFire className="pr-2 text-xl " />
              trending
            </button>
            <button
              style={{
                backgroundColor:
                  filterType === "Latest" ? "#33333" : "#fffff",
                fontWeight: filterType === "Latest" && "bold",
              }}
              className="flex justify-center py-1 px-3 rounded-md w-full dark:text-darkGrey"
              onClick={() => {
                filterPostHandler(filteredPosts,filterType);
              }}
            >
              <FaArrowUp className="pr-2 text-xl" />
              Latest
            </button>
            <button
              style={{
                backgroundColor:
                  filterType === "Oldest" ? "#33333" : "#fffff",
                fontWeight: filterType === "Oldest" && "bold",
              }}
              className="flex justify-center py-1 px-3 rounded-md w-full dark:text-darkGrey"
              onClick={() => {
                filterPostHandler(filteredPosts,filterType);
              }}
            >
              <FaArrowDown className="pr-2 text-xl" />
              Oldest
            </button>
          </div>


        </div>
    )
}
import { usePost } from '../../context/postContext';
import {MdCancel,FaArrowDown,FaArrowUp,
  FaFire} from '../../utils/icons';

export const FilterModal=({onClose,filter, setFilter})=>{
    const {filterPostHandler} =usePost();

    function clickHandler(e){ 
      setFilter(e.target.value);
      filterPostHandler(e.target.value)
      onClose()
    }
    
    return(
        <div>
          <div className="text-sm flex flex-col gap-0.5 items-start py-1 px-1 shadow-lg border rounded border-gray-300 bg-slate-50">
              <MdCancel onClick={onClose} className='w-5 h-5 justify-center'/>
              <hr/>
                  <button
                    style={{
                      backgroundColor:
                        filter === "trending" ? "#33333" : "#fffff",
                      fontWeight: filter === "trending" && "bold",
                    }}
                    value='trending'
                    className="flex justify-center py-1 px-3 rounded-md w-full dark:text-darkGrey"
                    onClick={(e) => {
                      clickHandler(e);
                    }}
                  >
                    <FaFire className="pr-2 text-xl " />
                    Trending
                  </button>
                  <button
                    style={{
                      backgroundColor:
                        filter === "latest" ? "#33333" : "#fffff",
                      fontWeight: filter === "latest" && "bold",
                    }}
                    value='latest'
                    className="flex justify-center py-1 px-3 rounded-md w-full dark:text-darkGrey"
                    onClick={(e) => {
                      clickHandler(e)
                    }}
                  >
                    <FaArrowUp className="pr-2 text-xl" />
                    Latest
                  </button>
                  <button
                    style={{
                      backgroundColor:
                        filter === "oldest" ? "#33333" : "#fffff",
                      fontWeight: filter === "oldest" && "bold",
                    }}
                    className="flex justify-center py-1 px-3 rounded-md w-full dark:text-darkGrey"
                    value='oldest'
                    onClick={(e) => {
                      clickHandler(e)
                    }}
                  >
                    <FaArrowDown className="pr-2 text-xl" />
                    Oldest
                  </button>
            </div>
        </div>
    )
}
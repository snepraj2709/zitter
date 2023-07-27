import { usePost } from '../../context/postContext';
import {useUser} from '../../context/userContext'
import {useState} from 'react';
import {MdCancel,FaArrowDown,FaArrowUp,
  FaFire} from '../../utils/icons'
  import { timeInSeconds } from '../../utils/timeAgo';

export const FilterModal=({onClose,filter, setFilter})=>{
    const {postState:{allPosts},filterPostHandler} =usePost();
    const {handleBtnsClick}=useUser();
    const [posts,setPosts]=useState(allPosts);

    function clickHandler(e){ 
      setTimeout(() =>{
          setFilter(e.target.value)
          const filteredPosts=allPosts.sort((a,b)=>
          timeInSeconds(a.createdAt)-timeInSeconds(b.createdAt)
          )
          const mostLiked=allPosts.sort((a,b)=>b.likes.likeCount-a.likes.likeCount)

        switch(e.target.value){
          case 'latest': setPosts(filteredPosts);
          break;
          case 'oldest': setPosts(filteredPosts.reverse());
          break;
          case 'trending': setPosts(mostLiked);
          break;
          default:
          setPosts(allPosts);
          filterPostHandler(posts,e.target.value)
        }
      },200)
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